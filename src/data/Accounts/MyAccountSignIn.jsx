import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";  // Import Link for routing
import AuthServices from "./AuthServices";
import { setTokenInCookie } from "../../utils/handleToken";

// Styled components for enhanced aesthetics
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  boxShadow: theme.shadows[4],
  maxWidth: 450,
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.01)",
  },
}));

const MyAccountSignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthServices.login(formData);
      setTokenInCookie(response.data.token);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : "Error occurred");
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        backgroundColor: "#f0f2f5", // Light background color
        backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Container maxWidth="xs">
        <StyledPaper elevation={4}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: "bold",
              textAlign: "center",
              color: "#333",
            }}
          >
            Sign in to Basavamart
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Sign In
            </Button>

            {/* Sign Up Link */}
            <Typography variant="body2" align="center">
              Don't have an account?{" "}
              <Link to="/signup" style={{ textDecoration: "none", fontWeight: "bold" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default MyAccountSignIn;
