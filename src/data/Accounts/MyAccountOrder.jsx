// import { Card, CardContent } from "@mui/material";
// import { Button } from "antd";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import MyAcconutSetting from "./MyAcconutSetting";
// import MyAccountAddress from "./MyAccountAddress";
// import axios from "axios";
// import { deleteTokenCookie, getTokenFromCookie } from "../../utils/handleToken";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

// const token = getTokenFromCookie()

// const MyAccountOrder = () => {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("orders");
//   const [orders, setOrders] = useState([]);

//   const handleLogout = () => {
//     // localStorage.removeItem("token");
//     deleteTokenCookie()
//     navigate("/MyAccountSignIn");
//   };

//   const handleDetailClick = (id) => {
//     navigate(`/OrderDetailsView/${id}`);
//   };

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get(
//         "https://basavamart.in/api/order/getOrderByUser",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.data;
//       setOrders(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const renderContent = () => {
//     switch (activeSection) {
//       case "orders":
//         return (
//           <div className="flex flex-col space-y-6">
//             {orders.length === 0 ? (
//               <p className="text-center" style={{color:'black'}}>No orders found</p>
//             ) : (
//               <>
//                 {orders.map((order) => {
//                   const dateOnly = new Date(order.orderDate)
//                     .toISOString()
//                     .split("T")[0];
//                   return (
//                     <Card
//                       className="w-full border border-gray-600   rounded-lg transition duration-300 transform hover:shadow-lg hover:scale-15"
//                       key={order._id}
//                     >
//                       <CardContent className="p-6">
//                         <div className="flex flex-col space-y-4">
//                           <div
//                             className="flex justify-between items-start flex-wrap gap-4 border-b pb-3"
//                             style={{ borderColor: "black" }}
//                           >
//                             <div className="space-y-1">
//                               <div className="text-sm text-gray-500">
//                                 ORDER ID:
//                               </div>
//                               <div className="font-semibold">{order._id}</div>
//                               <div className="text-sm text-gray-500">
//                                 Placed on {dateOnly}
//                               </div>
//                             </div>
//                             <div className="space-y-1 text-right">
//                               <div className="text-sm text-gray-500">
//                                 TOTAL AMOUNT:
//                               </div>
//                               <div className="font-semibold">
//                                 ₹{order.price}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 Total Items: {order.items.length}
//                               </div>
//                             </div>
//                             <div className="space-y-1">
//                               <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                                 {order.status}
//                               </div>
//                             </div>
//                             <Button
//                               variant="outline"
//                               style={{ color: "#C95E18" }}
//                               size="sm"
//                               onClick={() => handleDetailClick(order._id)}
//                             >
//                               Details
//                             </Button>
//                           </div>
//                           <div className="flex items-start flex-wrap gap-3 py-3">
//                             {order.items.map((item) => {
//                               return (
//                                 <div
//                                   className="flex items-center space-x-4 mx-3"
//                                   key={item._id}
//                                 >
//                                   <LazyLoadImage
//                                     src={`https://basavamart.in${item.productImg}`}
//                                     alt={item.productName}
//                                     useEffect='blur'
//                                     className="w-36 h-32 object-cover rounded border border-gray-200 shadow-sm"
//                                   />
//                                   <div className="flex-1">
//                                     <h5 className="font-semibold">
//                                       {item.productName}
//                                     </h5>
//                                     <p className="text-sm text-gray-500">
//                                       Size: {item.variant.name} <br />
//                                       Quantity: {item.variant.qty} <br />₹
//                                       {item.totalPrice}
//                                     </p>
//                                   </div>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   );
//                 })}
//               </>
//             )}
//           </div>
//         );
//       case "settings":
//         return (
//           <div className="settings-content">
//             <MyAcconutSetting />
//           </div>
//         );
//       case "address":
//         return (
//           <div className="address-content">
//             <MyAccountAddress />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <section>
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className="p-6 d-flex justify-content-between align-items-center d-md-none">
//                 <h3 className="fs-5 mb-0">Account Setting</h3>
//               </div>
//             </div>
//             <div className="col-lg-3 col-md-4 col-12 border-end d-none d-md-block">
//               <div className="pt-10 pe-lg-10">
//                 <ul className="nav flex-column nav-pills nav-pills-dark">
//                   <li className="nav-item">
//                     <button
//                       className={`nav-link ${
//                         activeSection === "orders" ? "bg-black text-white" : ""
//                       }`}
//                       onClick={() => setActiveSection("orders")}
//                     >
//                       <i className="fas fa-shopping-bag me-2" />
//                       Your Orders
//                     </button>
//                   </li>
//                   <li className="nav-item">
//                     <button
//                       className={`nav-link ${
//                         activeSection === "settings"
//                           ? "bg-black text-white"
//                           : ""
//                       }`}
//                       onClick={() => setActiveSection("settings")}
//                     >
//                       <i className="fas fa-cog me-2" />
//                       Settings
//                     </button>
//                   </li>
//                   <li className="nav-item">
//                     <button
//                       className={`nav-link ${
//                         activeSection === "address" ? "bg-black text-white" : ""
//                       }`}
//                       onClick={() => setActiveSection("address")}
//                     >
//                       <i className="fas fa-map-marker-alt me-2" />
//                       Address
//                     </button>
//                   </li>
//                   <li className="nav-item">
//                     <hr />
//                   </li>
//                   <li className="nav-item">
//                     <button className="nav-link" onClick={handleLogout}>
//                       Log out
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="col-lg-9 col-md-8 col-12">
//               <div className="flex justify-between items-center">
//                 <h1 className="text-2xl font-semibold">My Account</h1>
//               </div>
//               {renderContent()}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MyAccountOrder;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  ShoppingBag as ShoppingBagIcon,
  Settings as SettingsIcon,
  LocationOn as LocationOnIcon,
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import MyAcconutSetting from "./MyAcconutSetting";
import MyAccountAddress from "./MyAccountAddress";
import { deleteTokenCookie, getTokenFromCookie } from "../../utils/handleToken";

// Styled components for enhanced look
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[4],
  },
}));

const OrderStatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  textTransform: "uppercase",
}));

const MyAccountOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(
    location.state?.activeSection || "orders"
  );
  const [orders, setOrders] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const token = getTokenFromCookie();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    deleteTokenCookie();
    navigate("/MyAccountSignIn");
    window.location.reload();
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutClose = () => {
    setOpenLogoutDialog(false);
  };

  const handleDetailClick = (id) => {
    navigate(`/OrderDetailsView/${id}`);
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://basavamart.in/api/order/getOrderByUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrders = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2,minHeight:'100vh' }}>
      {orders.length === 0 ? (
        <Typography variant="body1" align="center">
          No orders found
        </Typography>
      ) : (
        orders.map((order) => (
          <StyledCard key={order._id} variant="outlined">
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    ORDER ID: {order._id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} textAlign="center">
                  <OrderStatusChip
                    label={order.status}
                    color={order.status === "Delivered" ? "success" : "warning"}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4} textAlign="right">
                  <Typography variant="subtitle1" fontWeight="bold">
                    ₹{order.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.items.length} Items
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleDetailClick(order._id)}
                  >
                    View Details
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        ))
      )}
    </Box>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return renderOrders();
      case "settings":
        return <MyAcconutSetting />;
      case "address":
        return <MyAccountAddress />;
      default:
        return null;
    }
  };

  const sidebarContent = (
    <List sx={{ mr: 3 }}>
      {[
        { label: "Orders", icon: <ShoppingBagIcon />, value: "orders" },
        { label: "Settings", icon: <SettingsIcon />, value: "settings" },
        { label: "Address", icon: <LocationOnIcon />, value: "address" },
      ].map((item) => (
        <ListItem
          key={item.value}
          button
          selected={activeSection === item.value}
          onClick={() => {
            setActiveSection(item.value);
            handleDrawerToggle();
          }}
          sx={{
            backgroundColor:
              activeSection === item.value ? "lightgray" : "transparent",
            "&:hover": {
              backgroundColor:
                activeSection === item.value
                  ? "lightgray"
                  : "rgba(0, 0, 0, 0.08)",
            },
            borderRadius: "45px",
            my: 1,
          }}
        >
          <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
      <ListItem button onClick={handleLogoutClick}>
        <ListItemIcon sx={{ color: "black" }}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column"}}>
      <AppBar position='static' color="default" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Account
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              display: { xs: "none", sm: "block" },
              borderRight: "3px solid black",
              color: "black",
            }}
          >
            {sidebarContent}
          </Grid>

          <Grid item xs={12} sm={9}>
            {renderContent()}
          </Grid>
        </Grid>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {sidebarContent}
      </Drawer>

      <Dialog open={openLogoutDialog} onClose={handleLogoutClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyAccountOrder;
