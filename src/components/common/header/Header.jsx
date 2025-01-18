// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaPhoneVolume, FaMapLocationDot } from "react-icons/fa6";
// import { MdMarkEmailUnread } from "react-icons/md";
// import { FaSearch } from "react-icons/fa";
// import { CartContext } from "../../../CartContext";
// import {
//   deleteTokenCookie,
//   getTokenFromCookie,
// } from "../../../utils/handleToken";
// import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const token = getTokenFromCookie();

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLogin, setisLogin] = useState(false);
//   const [userEnquiryModal, setUserEnquiryModal] = useState(false);
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     phone: "",
//     gst: "",
//   });

//   const { cartTotal } = useContext(CartContext);
//   const navigate = useNavigate();

//   const handleSignIn = () => {
//     navigate("/MyAccountSignIn");
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmitEnquiry = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://basavamart.in/api/enquiry/adduserenquiry",
//         formData
//       );
//       if (response.status === 200) {
//         toast.success("Enquiry submitted successfully");
//         setFormData({
//           firstname: "",
//           lastname: "",
//           email: "",
//           phone: "",
//           gst: "",
//         });
//         handleCloseUserEnquiryModal();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCloseUserEnquiryModal = () => {
//     setUserEnquiryModal(false);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const searchQuery = e.target.search.value; // Get search value from input
//     navigate(`/shop?query=${encodeURIComponent(searchQuery)}`);
//   };
//   const handleLogout = () => {
//     if (token) {
//       deleteTokenCookie();
//       window.location.href = "/MyAccountSignIn";
//     }
//   };
//   useEffect(() => {
//     if (token) {
//       setisLogin(true);
//     } else {
//       navigate("/MyAccountSignIn");
//     }
//   }, []);

//   return (
//     <header className="bg-white shadow-md flex flex-column">
//       <div className="flex justify-end items-center pr-3">
//         <div className="flex items-center gap-6 pt-2">
//           <div className="flex items-center hover:text-orange-600 hover:cursor-pointer">
//             <FaPhoneVolume
//               style={{ marginRight: "3px", width: "21px", height: "15px" }}
//             />
//             <h6 className="p-0 m-0 hover:text-orange-600">+91-12345-67890</h6>
//           </div>
//           <div className="flex items-center hover:text-orange-600 hover:cursor-pointer">
//             <MdMarkEmailUnread
//               style={{ marginRight: "3px", width: "24px", height: "18px" }}
//             />
//             <h6 className="p-0 m-0 hover:text-orange-600">
//               basavamart@gmail.com
//             </h6>
//           </div>
//           <div className="flex items-center hover:text-orange-600 hover:cursor-pointer ">
//             <FaMapLocationDot
//               style={{ marginRight: "3px", width: "24px", height: "18px" }}
//             />
//             <h6 className="p-0 m-0 hover:text-orange-600">Singapura</h6>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-between items-center pr-3">
//         <div className="flex items-center">
//           <Link to="/">
//             <img
//               src="../img/basavamart-logo1.jpg"
//               alt="img here"
//               style={{ width: "150px", height: "90px", padding: "6px 12px" }}
//             />
//           </Link>
//         </div>
//         <div
//           className="flex items-center"
//           style={{ width: "450px", color: "black" }}
//         >
//           <form className="flex w-100" onSubmit={handleSearch}>
//             <input
//               type="text"
//               name="search"
//               placeholder="Search..."
//               className="border  px-4 py-2 w-100 focus:outline-none "
//             />
//             <button className="border px-3 py-2" type="submit">
//               <FaSearch style={{ width: "24px", height: "21px" }} />
//             </button>
//           </form>
//         </div>
//         <Link to="/cart" className="mr-4 relative">
//           <svg
//             className="w-6 h-6 text-gray-700"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//             ></path>
//           </svg>
//           <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//             {cartTotal}
//           </span>
//         </Link>
//         <div className="flex items-center">
//           {isLogin ? (
//             <div className="relative">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
//               >
//                 <svg
//                   className="w-6 h-6 mr-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   ></path>
//                 </svg>
//                 <span>My Account</span>
//                 <svg
//                   className="w-4 h-4 ml-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 9l-7 7-7-7"
//                   ></path>
//                 </svg>
//               </button>
//               {isMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
//                   <Link
//                     to="/MyAccountOrder"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Settings
//                   </Link>
//                   <Link
//                     onClick={handleLogout}
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Logout
//                   </Link>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div style={{display:'flex' ,alignItems:'center'}}>
//               <button
//                 style={{
//                   backgroundColor: "#F17D04",
//                   padding: "5px 12px",
//                   color: "#fff",
//                   display: "flex",
//                   alignItems: "center",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   marginRight:'6px'
//                 }}
//                 onClick={() => setUserEnquiryModal(true)}
//               >
//                 <PersonAddOutlinedIcon sx={{ marginRight: "6px" }} />
//                 Become a Member
//               </button>

//               <button
//                 onClick={handleSignIn}
//                 style={{
//                   color: "white",
//                   backgroundColor: "#F17D04",
//                   padding: "6px 12px",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Sign In
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <Dialog open={userEnquiryModal}>
//         <DialogTitle>Become a Member</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="firstname"
//             label="First Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={formData.firstname}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             name="lastname"
//             label="Last Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={formData.lastname}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             name="email"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="outlined"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             name="phone"
//             label="Phone Number"
//             type="tel"
//             fullWidth
//             variant="outlined"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             name="gst"
//             label="GST Number"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={formData.gst}
//             onChange={handleChange}
//             required
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseUserEnquiryModal} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmitEnquiry} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  DialogContentText,
  Badge
} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  KeyboardArrowDown as DropdownIcon,
} from "@mui/icons-material";
import {
  deleteTokenCookie,
  getTokenFromCookie,
} from "../../../utils/handleToken";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import {CartContext} from "../../../CartContext"

const Header = () => {
  const { cartTotal } = useContext(CartContext);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElBrand, setAnchorElBrand] = useState(null);
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [logoutModal, setLogoutModal] = useState(false);

  const [userEnquiryModal, setUserEnquiryModal] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gst: "",
  });

  // const { cartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const token = getTokenFromCookie();

  const handleLogoutModalClose = () => {
    setLogoutModal(false);
  };

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      // navigate("/MyAccountSignIn");
    }
  }, [token, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    navigate(`/shop?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleBrandMenuOpen = (event) => {
    setAnchorElBrand(event.currentTarget);
  };

  const handleBrandMenuClose = (brandName) => {
    setAnchorElBrand(null);
    if (brandName) {
      // Navigate to the shop page with the brand query parameter
      navigate(`/shop?brand=${encodeURIComponent(brandName)}`);
    }
  };

  const handleCategoryMenuClose = (categoryName) => {
    setAnchorElCategory(null);
    if (categoryName) {
      // Navigate to the shop page with the category query parameter
      navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
    }
  };

  const handleCategoryMenuOpen = (event) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleAccountMenuOpen = (event) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorElAccount(null);
  };

  const handleLogout = () => {
    if (token) {
      deleteTokenCookie();
      window.location.href = "/MyAccountSignIn";
    }
  };

  const fetchBrand = async () => {
    try {
      const response = await axios.get(
        `https://basavamart.in/api/product/getbrand`
      );
      setBrands(response.data);
    } catch {
      console.error("Failed to fetch brands");
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `https://basavamart.in/api/product/getcategory`
      );
      setCategories(response.data);
    } catch {
      console.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchBrand();
    fetchCategory();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://basavamart.in/api/enquiry/adduserenquiry",
        formData
      );
      if (response.status === 200) {
        toast.success(
          "Enquiry submitted successfully, We will get back to you Soon"
        );
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          gst: "",
        });
        handleCloseUserEnquiryModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseUserEnquiryModal = () => {
    setUserEnquiryModal(false);
  };

  const renderDesktopMenu = () => (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        gap: 2,
        color: "black",
      }}
    >
      {/* Brand Dropdown */}
      <Button
        onClick={handleBrandMenuOpen}
        endIcon={<DropdownIcon />}
        sx={{ color: "#ED8019" }}
      >
        Brands
      </Button>
      <Menu
        anchorEl={anchorElBrand}
        open={Boolean(anchorElBrand)}
        onClose={() => handleBrandMenuClose()}
      >
        {brands.map((brand) => (
          <MenuItem
            key={brand._id}
            onClick={() => handleBrandMenuClose(brand.name)} // Pass the brand name
            sx={{ color: "#ED8019" }}
          >
            {brand.name}
          </MenuItem>
        ))}
      </Menu>

      {/* Category Dropdown */}
      <Button
        onClick={handleCategoryMenuOpen}
        endIcon={<DropdownIcon />}
        sx={{ color: "#ED8019" }}
      >
        Categories
      </Button>
      <Menu
        anchorEl={anchorElCategory}
        open={Boolean(anchorElCategory)}
        onClose={() => handleCategoryMenuClose()}
      >
        {categories.map((category) => (
          <MenuItem
            key={category._id}
            onClick={() => handleCategoryMenuClose(category.name)} // Pass the category name
            sx={{ color: "#ED8019" }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>

      <Button sx={{ color: "#ED8019" }} onClick={() => navigate("/shop")}>
        Shop
      </Button>
      <Button
        sx={{ color: "#ED8019" }}
        startIcon={
          <Badge badgeContent={cartTotal} color="primary">
            <ShoppingCartIcon />
          </Badge>
        }
        onClick={() => navigate("/cart")}
      >
        Cart {cartTotal > 0 && `(${cartTotal})`}
      </Button>

      {/* Account Menu */}
      {isLogin ? (
        <Button
          onClick={handleAccountMenuOpen}
          endIcon={<DropdownIcon />}
          sx={{ color: "#ED8019" }}
        >
          My Account
        </Button>
      ) : (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setUserEnquiryModal(true)}
            sx={{ backgroundColor: "#ED8019" }}
          >
            Become Member
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/MyAccountSignIn")}
            sx={{ backgroundColor: "#ED8019" }}
          >
            Sign In
          </Button>
        </Box>
      )}

      <Menu
        anchorEl={anchorElAccount}
        open={Boolean(anchorElAccount)}
        onClose={handleAccountMenuClose}
      >
        <MenuItem
          onClick={() => navigate("/MyAccountOrder")}
          sx={{ color: "#ED8019" }}
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => setLogoutModal(true)}
          sx={{ color: "#ED8019" }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={handleMobileMenuToggle}
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {/* Brands */}
        <ListItem>
          <ListItemText primary="Brands" />
        </ListItem>
        {brands.map((brand) => (
          <ListItem key={brand._id}>
            <ListItemText primary={brand.name} sx={{ color: "#ED8019" }} />
          </ListItem>
        ))}

        {/* Categories */}
        <ListItem>
          <ListItemText primary="Categories" />
        </ListItem>
        {categories.map((category) => (
          <ListItem key={category._id}>
            <ListItemText primary={category.name} sx={{ color: "#ED8019" }} />
          </ListItem>
        ))}

        {/* Shop and Cart */}
        <ListItem onClick={() => navigate("/shop")}>
          <ListItemText primary="Shop" sx={{ color: "#ED8019" }} />
        </ListItem>
        <ListItem onClick={() => navigate("/cart")}>
          <ListItemText primary={`Cart`} sx={{ color: "#ED8019" }} />
        </ListItem>

        {/* Account Options */}
        {isLogin ? (
          <>
            <ListItem onClick={() => navigate("/MyAccountOrder")}>
              <ListItemText primary="My Account" sx={{ color: "#ED8019" }} />
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem onClick={() => navigate("/MyAccountSignIn")}>
            <ListItemText primary="Sign In" sx={{ color: "#ED8019" }} />
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            width: "100%",
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                marginLeft: "36px",
              }}
            >
              <Tooltip title="Call Us">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 21, color: "#ED8019" }} />
                  <Typography variant="body2" color="textSecondary">
                    +91 98441 92551
                  </Typography>
                </Box>
              </Tooltip>
              <Tooltip title="Email Us">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <EmailIcon sx={{ fontSize: 21, color: "#ED8019" }} />
                  <Typography variant="body2" color="textSecondary">
                    basavamart@gmail.com
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <ul
              className="flex justify-end align-items-center mt-3"
              style={{ marginRight: "30px" }}
            >
              <li className="mx-1">
                <a
                  href="https://www.facebook.com/Basavamart"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fab fa-facebook-f"
                    style={{
                      fontSize: "21px",
                      color: "#ED8019",
                      marginRight: "9px",
                    }}
                  ></i>
                </a>
              </li>
              <li className="mx-1">
                <a
                  href="https://www.youtube.com/channel/UCNdeNpKMe22G2nyd51N3LaA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fab fa-youtube"
                    style={{
                      fontSize: "21px",
                      color: "#ED8019",
                      marginRight: "9px",
                    }}
                  ></i>
                </a>
              </li>
              <li className="mx-1">
                <a
                  href="https://www.linkedin.com/in/prashanth-kumar-b4324b3b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fab fa-linkedin-in"
                    style={{
                      fontSize: "21px",
                      color: "#ED8019",
                      marginRight: "9px",
                    }}
                  ></i>
                </a>
              </li>
              <li className="mx-1">
                <a
                  href="https://www.instagram.com/basava_mart/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fab fa-instagram"
                    style={{
                      fontSize: "21px",
                      color: "#ED8019",
                      marginRight: "9px",
                    }}
                  ></i>
                </a>
              </li>
            </ul>
          </Box>
        </Box>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* Mobile Menu Toggle */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileMenuToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Link to="/">
            <img
              src="../img/logo1.png"
              alt="Basavamart Logo"
              style={{ height: 75, width: "auto" }}
            />
          </Link>

          {/* Search Bar */}
          {/* <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              maxWidth: 400,
              mx: 2,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="search"
              placeholder="Search Product Here..."
              InputProps={{
                endAdornment: (
                  <IconButton type="submit">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box> */}

          {/* Desktop Menu */}
          {renderDesktopMenu()}

          {/* Mobile Menu */}
          {renderMobileMenu()}
        </Toolbar>
      </Container>
      <Dialog open={userEnquiryModal}>
        <DialogTitle>Become a Member</DialogTitle>
        <form onSubmit={handleSubmitEnquiry}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              name="lastname"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              name="phone"
              label="Phone Number"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              name="gst"
              label="GST Number"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.gst}
              onChange={handleChange}
              // required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUserEnquiryModal} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={logoutModal} onClose={handleLogoutModalClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
