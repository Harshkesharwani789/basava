// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { deleteTokenCookie, getTokenFromCookie } from "../../utils/handleToken";
// import { message } from "antd";

// const MyAcconutSetting = () => {
//   const navigate = useNavigate();

//   const handleUserUpdate = async (e) => {
//     e.preventDefault();
//     const token = getTokenFromCookie();
//     if (!token) {
//       alert("Please log in first.");
//       navigate("/MyAccountSignIn");
//       return;
//     }

//     const formData = new FormData(e.target);
//     const newData = {
//       firstname: formData.get("firstname"),
//       lastname: formData.get("lastname"),
//       email: formData.get("email"),
//       password: formData.get("password"),
//       // confirmPassword: formData.get("confirmPassword"),
//     };

//     try {
//       const response = await axios.put(
//         "https://basavamart.in/api/auth/userupdate",
//         newData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         message.success("Account updated successfully!");
//       }
//     } catch (error) {
//       if (error.response) {
//         // Backend responded with an error
//         const status = error.response.status;
//         if (status === 400) {
//           message.warning(
//             "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long."
//           );
//         } else {
//           message.error(error.response.data.message || "An error occurred!");
//         }
//       } else {
//         // Network or other errors
//         message.error("Network error. Please try again later.");
//       }
//     }
//   };

//   const handleDeleteUser = async () => {
//     const token = getTokenFromCookie();
//     if (!token) {
//       alert("login first");
//       navigate("/MyAccountSignIn");
//     }
//     const response = await axios.delete(
//       "https://basavamart.in/api/auth/userdelete",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (response.status === 200) {
//       alert("Account deleted successfully");
//       deleteTokenCookie();
//       navigate("/MyAccountSignIn");
//     } else {
//       alert("Server error");
//     }
//   };

//   return (
//     <div>
//       <>
//         <div>
//           <section>
//             <div className="container">
//               <div className="row">
//                 <div className="col-lg-9 col-md-8 col-12">
//                   <div>
//                     <div className="p-6 p-lg-10">
//                       <div className="mb-6">
//                         <h2 className="mb-0">Account Setting</h2>
//                       </div>
//                       <div>
//                         <h5 className="mb-4">Account details</h5>
//                         <div className="row">
//                           <div className="col-lg-5">
//                             {/* form */}
//                             <form onSubmit={handleUserUpdate}>
//                               {/* input */}
//                               <div className="mb-3">
//                                 <label className="form-label">First Name</label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   name="firstname"
//                                 />
//                               </div>
//                               <div className="mb-3">
//                                 <label className="form-label">Last Name</label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   name="lastname"
//                                 />
//                               </div>
//                               {/* input */}
//                               <div className="mb-3">
//                                 <label className="form-label">Email</label>
//                                 <input
//                                   type="email"
//                                   className="form-control"
//                                   placeholder="example@gmail.com"
//                                   name="email"
//                                 />
//                               </div>
//                               <div className="mb-3">
//                                 <label className="form-label">Password</label>
//                                 <input
//                                   type="password"
//                                   className="form-control"
//                                   name="password"
//                                   required
//                                 />
//                               </div>
//                               <div className="mb-3">
//                                 <label className="form-label">
//                                   Confirm Password
//                                 </label>
//                                 <input
//                                   type="password"
//                                   className="form-control"
//                                   name="confirmPassword"
//                                   required
//                                 />
//                               </div>
//                               {/* button */}
//                               <div className="mb-3">
//                                 <button
//                                   className="btn"
//                                   type="submit"
//                                   style={{
//                                     backgroundColor: "#C95E18",
//                                     color: "white",
//                                   }}
//                                 >
//                                   Save Details
//                                 </button>
//                               </div>
//                             </form>
//                           </div>
//                         </div>
//                       </div>
//                       <hr className="my-10" />
//                       <div>
//                         {/* heading */}
//                         <h5 className="mb-4">Delete Account</h5>
//                         <p className="mb-2">
//                           Would you like to delete your account?
//                         </p>
//                         <p className="mb-5">
//                           This account contain 12 orders, Deleting your account
//                           will remove all the order details associated with it.
//                         </p>
//                         {/* btn */}
//                         <button
//                           onClick={handleDeleteUser}
//                           className="btn btn-outline-danger"
//                         >
//                           I want to delete my account
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </>
//     </div>
//   );
// };

// export default MyAcconutSetting;

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CreditCard as GstIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { deleteTokenCookie, getTokenFromCookie } from "../../utils/handleToken";

const MyAccountSetting = () => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gst: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getUser = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      toast.error("Please log in first");
      navigate("/MyAccountSignIn");
      return;
    }

    try {
      const response = await axios.get(
        "https://basavamart.in/api/auth/getUserById",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setUser(response.data);
        // Populate form with existing user data
        setFormData({
          firstname: response.data.firstname || "",
          lastname: response.data.lastname || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          gst: response.data.gst || "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const token = getTokenFromCookie();
    if (!token) {
      toast.error("Please log in first");
      navigate("/MyAccountSignIn");
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const updateData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      gst: formData.gst,
      password: formData.password,
    };

    try {
      const response = await axios.put(
        "https://basavamart.in/api/auth/userupdate",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Account updated successfully!");
        // Refresh user data after update
        getUser();
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.warning(
            "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long."
          );
        } else {
          toast.error(error.response.data.message || "An error occurred!");
        }
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  const handleDeleteUser = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      toast.error("Please log in first");
      navigate("/MyAccountSignIn");
      return;
    }

    try {
      const response = await axios.delete(
        "https://basavamart.in/api/auth/userdelete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Account deleted successfully");
        deleteTokenCookie();
        navigate("/MyAccountSignIn");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <Box sx={{minHeight:'100vh'}}>
      <ToastContainer />
      <Grid container spacing={3}>
        {/* Account Settings Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" gutterBottom>
              Account Settings
            </Typography>

            <Box component="form" onSubmit={handleUserUpdate} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    type="text"
                    name="gst"
                    value={formData.gst}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: "#C95E18",
                      "&:hover": { backgroundColor: "#A64E11" },
                    }}
                  >
                    Save Details
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Delete Account
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Would you like to delete your account?
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                I want to delete my account
              </Button>
            </Box>
          </Paper>
        </Grid>
        {/* User Details Card */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={3}
            sx={{
              // height: '100%',
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f5f5f5",
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#C95E18",
                }}
              >
                <PersonIcon sx={{ mr: 2 }} /> User Profile
              </Typography>
              <Divider sx={{ my: 2 }} />
              {user ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <PersonIcon sx={{ mr: 2, color: "text.secondary" }} />
                    <Typography variant="body1">
                      {user.firstname} {user.lastname}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <EmailIcon sx={{ mr: 2, color: "text.secondary" }} />
                    <Typography variant="body1">{user.email}</Typography>
                  </Box>
                  {user.phone && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PhoneIcon sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">{user.phone}</Typography>
                    </Box>
                  )}
                  {user.gst && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <GstIcon sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">{user.gst}</Typography>
                    </Box>
                  )}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Loading user details...
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyAccountSetting;
