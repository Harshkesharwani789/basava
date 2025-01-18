// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   TextField,
//   DialogActions,
//   Box,
//   Chip,
// } from "@mui/material";
// import { ShoppingBag, ArrowRight, Image as ImageIcon } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getTokenFromCookie } from "../../utils/handleToken";
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = "https://basavamart.in/api/product";

// const ProductImagePlaceholder = ({ alt }) => (
//   <Box
//     sx={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: 200,
//       backgroundColor: "grey.200",
//       color: "grey.500",
//     }}
//   >
//     <Box sx={{ textAlign: "center" }}>
//       <ImageIcon size={48} />
//       <Typography variant="body2" sx={{ mt: 1 }}>
//         {alt || "No Image Available"}
//       </Typography>
//     </Box>
//   </Box>
// );

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [enquiryModal, setEnquiryModal] = useState(false);
//   const [selectedItem,setSelectedItem] = useState("")
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     details: "",
//   });

//   const handleEnquiryModal = (item)=>{
//     setSelectedItem(item);
//     setEnquiryModal(true);
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleClick = (id) => {
//     navigate(`/shop-detail/${id}`);
//   };

//   const handleSubmitEnquiry = async (e) => {
//     e.preventDefault();

//     try {
//       // Append selectedItem to formData
//       const updatedFormData = {
//         ...formData,
//         productName: selectedItem, // Adding selectedItem as productName
//       };

//       const response = await axios.post(
//         "https://basavamart.in/api/order/addenquiry",
//         updatedFormData
//       );

//       if (response.status === 200) {
//         toast.success("Enquiry submitted successfully");
//         setFormData({ name: "", email: "", details: "" });
//         setSelectedItem("");
//         setEnquiryModal(false);
//       }
//     } catch (error) {
//       console.error("Enquiry submission error:", error);
//       alert("Failed to submit enquiry");
//     }
//   };

//   const fetchProducts = async () => {
//     const token = getTokenFromCookie();
//     try {
//       const response = await axios.get(`${API_URL}/getproduct`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (Array.isArray(response.data)) {
//         setProducts(response.data.slice(0, 12));
//       } else {
//         console.error("Invalid data format received from API.");
//       }
//     } catch (error) {
//       console.error(
//         `Error fetching ${token ? "private" : "public"} products:`,
//         error
//       );
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography variant="h5" color="text.secondary">
//           Hot Deals
//         </Typography>
//         <Button
//           component={Link}
//           to="/shop"
//           variant="contained"
//           color="warning"
//           endIcon={<ArrowRight />}
//         >
//           View more
//         </Button>
//       </Box>

//       <Grid container spacing={3}>
//         {products.map((item) => (
//           <Grid item xs={12} sm={6} md={3} lg={2.4} key={item._id}>
//             <Card
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 transition: "transform 0.3s",
//                 "&:hover": { transform: "scale(1.05)" },
//               }}
//             >
//               <Box sx={{ position: "relative", height: 200 }}>
//                 {item.variants[0]?.discount && (
//                   <Chip
//                     label={`${item.variants[0].discount}%`}
//                     color="warning"
//                     sx={{
//                       position: "absolute",
//                       top: 10,
//                       right: 10,
//                       zIndex: 1,
//                     }}
//                   />
//                 )}
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={`https://basavamart.in${item.images[0]}`}
//                   alt={`Image Not Found`}
//                   sx={{
//                     objectFit: "cover",
//                     height: "100%",
//                     width: "100%",
//                   }}
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                     e.target.parentNode.innerHTML = `
//                         <div style="display: flex; justify-content: center; align-items: center; height: 200px; background-color: #f0f0f0; color: #888;">
//                           Image Not Found
//                         </div>
//                       `;
//                   }}
//                 />
//               </Box>

//               <CardContent
//                 sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     mb: 1,
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {item.productName}
//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{
//                     display: "-webkit-box",
//                     WebkitLineClamp: 2,
//                     WebkitBoxOrient: "vertical",
//                     overflow: "hidden",
//                     mb: 2,
//                   }}
//                   dangerouslySetInnerHTML={{ __html: item.productDescription }}
//                 />

//                 <Box
//                   sx={{
//                     mt: "auto",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   {item.available === "No" ? (
//                     <Button
//                       variant="contained"
//                       color="info"
//                       startIcon={<ShoppingBag />}
//                       onClick={() => handleEnquiryModal(item.productName)}
//                     >
//                       Enquiry
//                     </Button>
//                   ) : (
//                     <>
//                       <Typography variant="h6">
//                         ₹{item.variants[0].finalPrice.toFixed(2)}
//                       </Typography>
//                       <Button
//                         variant="contained"
//                         color="warning"
//                         startIcon={<ShoppingBag />}
//                         onClick={() => handleClick(item._id)}
//                       >
//                         Add
//                       </Button>
//                     </>
//                   )}
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog
//         open={enquiryModal}
//         onClose={() => setEnquiryModal(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Submit an Enquiry</DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ mb: 2 }}>
//             Please fill out the form below to submit your enquiry. We will get
//             back to you soon.
//           </DialogContentText>
//           <Box component="form" onSubmit={handleSubmitEnquiry}>
//             <TextField
//               autoFocus
//               margin="dense"
//               name="name"
//               label="Name"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               margin="dense"
//               name="email"
//               label="Email"
//               type="email"
//               fullWidth
//               variant="outlined"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               margin="dense"
//               name="productName"
//               label="Product Name"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={selectedItem}
//               // onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               margin="dense"
//               name="details"
//               label="Details"
//               type="text"
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={4}
//               value={formData.details}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//             />
//             <DialogActions>
//               <Button onClick={() => setEnquiryModal(false)} color="secondary">
//                 Cancel
//               </Button>
//               <Button type="submit" color="primary" variant="contained">
//                 Submit
//               </Button>
//             </DialogActions>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default Product;

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Box,
  Chip,
  Skeleton,
} from "@mui/material";
import { ShoppingBag, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getTokenFromCookie } from "../../utils/handleToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://basavamart.in/api/product";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
  });

  const handleEnquiryModal = (item) => {
    setSelectedItem(item);
    setEnquiryModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = (id) => {
    navigate(`/shop-detail/${id}`);
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        ...formData,
        productName: selectedItem,
      };

      const response = await axios.post(
        "https://basavamart.in/api/order/addenquiry",
        updatedFormData
      );

      if (response.status === 200) {
        toast.success("Enquiry submitted successfully");
        setFormData({ name: "", email: "", details: "" });
        setSelectedItem("");
        setEnquiryModal(false);
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error("Failed to submit enquiry");
    }
  };

  const fetchProducts = async () => {
    const token = getTokenFromCookie();
    try {
      const response = await axios.get(`${API_URL}/getproduct`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setProducts(response.data.slice(0, 12));
      } else {
        console.error("Invalid data format received from API.");
      }
    } catch (error) {
      console.error(
        `Error fetching ${token ? "private" : "public"} products:`,
        error
      );
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Hot Deals
        </Typography>
        <Button
          component={Link}
          to="/shop"
          variant="contained"
          color="warning"
          endIcon={<ArrowRight />}
        >
          View more
        </Button>
      </Box>

      <Grid container spacing={3}>
        {isLoading
          ? Array.from(new Array(12)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="40%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : products?.map((item) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={item._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <Box sx={{ position: "relative", height: 200 }}>
                    {item?.variants[0]?.discount && (
                      <Chip
                        label={`${item?.variants[0]?.discount}%`}
                        color="warning"
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          zIndex: 1,
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      height="200"
                      image={`https://basavamart.in${item.images[0]}`}
                      alt={`Image Not Found`}
                      sx={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `
                          <div style="display: flex; justify-content: center; align-items: center; height: 200px; background-color: #f0f0f0; color: #888;">
                            Image Not Found
                          </div>
                        `;
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item?.productName}
                    </Typography>

                    {/* <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 2,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: item.productDescription,
                      }}
                    /> */}

                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {item?.available === "No" ? (
                        <Button
                          variant="contained"
                          color="info"
                          startIcon={<ShoppingBag />}
                          onClick={() => handleEnquiryModal(item?.productName)}
                        >
                          Enquiry
                        </Button>
                      ) : (
                        <>
                          <Typography variant="h6">
                            ₹{item?.variants[0]?.finalPrice.toFixed(2)}
                          </Typography>
                          <Button
                            variant="contained"
                            color="warning"
                            startIcon={<ShoppingBag />}
                            onClick={() => handleClick(item._id)}
                          >
                            Add
                          </Button>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Product;
