import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  LockOutlined as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokenInCookie } from "../../utils/handleToken";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials)
    try {
      const response = await axios.post(
        "https://basavamart.in/api/auth/adminLogin",
        credentials
      );
      if (response.status === 200) {
        setTokenInCookie(response.data.token);
        localStorage.setItem("token",response.data.token)
        navigate("/admin");
      } else {
        toast.error(response.data.message);
        alert("ytgyh");
      }
    } catch (error) {
      console.error("Failed to login:", error);
      toast.error("Invalid credentials");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <CssBaseline />
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <LockIcon
            sx={{
              fontSize: 48,
              color: "primary.main",
              marginBottom: 2,
            }}
          />
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              mt: 3,
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
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
                borderRadius: 2,
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
