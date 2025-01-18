// import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getTokenFromCookie } from "../../utils/handleToken";
// const API_URL = "https://basavamart.in/api/address";

// const MyAccountAddress = () => {
//   const [show, setShowModal] = useState(false);
//   const [showModal1, setShowModal1] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     zipCode: 0,
//     country: "",
//     isDefault: false,
//   });
//   const [addresses, setAddresses] = useState([]);
//   const [editingAddressId, setEditingAddressId] = useState(null); // Track address being edited

//   const handleShow = (address) => {
//     setEditingAddressId(address._id);
//     setShowModal(true);
//   };
//   const handleShow1 = () => setShowModal1(true);
//   const handleClose = () => setShowModal(false);
//   const handleClose1 = () => setShowModal1(false);
//   const navigate = useNavigate();

//   const handleShowEdit = (address) => {
//     setFormData({
//       firstName: address.firstName,
//       lastName: address.lastName,
//       addressLine1: address.addressLine1,
//       addressLine2: address.addressLine2,
//       city: address.city,
//       state: address.state,
//       zipCode: address.zipCode,
//       country: address.country,
//       isDefault: address.isDefault,
//     });
//     setEditingAddressId(address._id);
//     setShowEditModal(true);
//   };
//   const handleCloseEdit = () => {
//     setShowEditModal(false);
//     setEditingAddressId(null); // Clear editing state
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSaveAddress = async (e) => {
//     e.preventDefault();
//     const token = getTokenFromCookie();
//     if (!token) {
//       alert("login first");
//       navigate("/MyAccountSignIn");
//     }
//     try {
//       const response = await fetch(`${API_URL}/addAddress`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         console.log("Address added successfully");
//         handleClose1();
//         fetchAddress();
//       } else {
//         console.error("Failed to add address");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleUpdateAddress = async (e) => {
//     e.preventDefault();
//     const token = getTokenFromCookie();
//     if (!token) {
//       alert("login first");
//       navigate("/MyAccountSignIn");
//     }
//     try {
//       const response = await fetch(
//         `${API_URL}/updateAddress/${editingAddressId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       if (response.ok) {
//         console.log("Address updated successfully");
//         handleCloseEdit();
//         fetchAddress();
//       } else {
//         console.error("Failed to update address");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   const handlDeleteAddress = async () => {
//     const token = getTokenFromCookie();
//     if (!token) {
//       alert("login first");
//       navigate("/MyAccountSignIn");
//     }
//     try {
//       const response = await fetch(
//         `${API_URL}/deleteAddress/${editingAddressId}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (response.ok) {
//         console.log("Address deleted successfully");
//         handleClose();
//         fetchAddress();
//       } else {
//         console.error("Failed to delete address");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const fetchAddress = async () => {
//     const token = getTokenFromCookie();
//     if (!token) {
//       alert("login first");
//       navigate("/MyAccountSignIn");
//     }
//     try {
//       console.log(token);
//       const response = await fetch(`${API_URL}/getAddress`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const addresses = await response.json();
//         setAddresses(addresses);
//         console.log(addresses);
//       } else {
//         console.error("Failed to fetch addresses");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   return (
//     <div>
//       <section>
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-9 col-md-8 col-12">
//               <div className="p-6 p-lg-10">
//                 <div className="d-flex justify-content-between mb-6">
//                   <h2 className="mb-0">Address</h2>
//                   <button
//                     className="btn btn-outline-primary"
//                     style={{}}
//                     onClick={handleShow1}
//                   >
//                     Add a new address{" "}
//                   </button>
//                 </div>
//                 <div className="row">
//                   {addresses.map((item) => (
//                     <div
//                       className="col-lg-5 col-xxl-4 col-12 mb-4"
//                       key={item._id}
//                     >
//                       <div className="border p-6 rounded-3">
//                         <p className="mb-6">
//                           {item.firstName}
//                           <br />
//                           {item.addressLine1}, {item.addressLine2}
//                           <br />
//                           {item.state}, {item.country},
//                           <br />
//                           {item.zipCode}
//                         </p>
//                         <h6 style={{ color: "orange" }}>
//                           {item.isDefault ? "Default address" : ""}
//                         </h6>
//                         <div className="mt-4">
//                           <Link
//                             to="#"
//                             className="text-inherit"
//                             onClick={() => handleShowEdit(item)} // Open edit modal with item data
//                           >
//                             Edit
//                           </Link>
//                           <Link
//                             className="text-danger ms-3"
//                             onClick={() => handleShow(item)}
//                           >
//                             Delete
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Delete Modal */}
//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete address</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h6>Are you sure you want to delete this address?</h6>
//           <p className="mb-6">This action cannot be undone.</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handlDeleteAddress}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Add Address Modal */}
//       <Modal show={showModal1} onHide={handleClose1} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Address</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSaveAddress}>
//             <Row>
//               <Col md={6} className="mb-3">
//                 <Form.Label>First Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="First Name"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Last Name"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Col>
//             </Row>
//             <Form.Label>Address Line 1</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Address Line 1"
//               name="addressLine1"
//               value={formData.addressLine1}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Label>Address Line 2</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Address Line 2"
//               name="addressLine2"
//               value={formData.addressLine2}
//               onChange={handleInputChange}
//             />
//             <Row>
//               <Col md={6} className="mb-3">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label>State</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="State"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Col>
//             </Row>
//             <Row>
//               <Col md={6} className="mb-3">
//                 <Form.Label>Zip Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Zip Code"
//                   name="zipCode"
//                   value={formData.zipCode}
//                   onChange={handleInputChange}
//                   maxLength={6} // Limits input to 6 characters
//                   pattern="\d{6}" // Ensures the input matches 6 digits
//                   title="Zip Code must be exactly 6 digits"
//                   required
//                 />
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label>Country</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Col>
//             </Row>
//             <Form.Check
//               type="checkbox"
//               label="Set as default address"
//               name="isDefault"
//               checked={formData.isDefault}
//               onChange={handleInputChange}
//             />
//             <Button variant="primary" type="submit" className="mt-3">
//               Save Address
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Edit Address Modal */}
//       <Modal show={showEditModal} onHide={handleCloseEdit} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Address</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleUpdateAddress}>
//             <Row>
//               <Col md={6} className="mb-3">
//                 <Form.Label>First Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="First Name"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Last Name"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Col>
//             </Row>
//             <Form.Label>Address Line 1</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Address Line 1"
//               name="addressLine1"
//               value={formData.addressLine1}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Label>Address Line 2</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Address Line 2"
//               name="addressLine2"
//               value={formData.addressLine2}
//               onChange={handleInputChange}
//             />
//             <Row>
//               <Col md={6} className="mb-3">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label>State</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="State"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Col>
//             </Row>
//             <Row>
//               <Col md={6} className="mb-3">
//                 <Form.Label>Zip Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Zip Code"
//                   name="zipCode"
//                   value={formData.zipCode}
//                   onChange={handleInputChange}
//                   maxLength={6} // Limits input to 6 characters
//                   pattern="\d{6}" // Ensures the input matches 6 digits
//                   title="Zip Code must be exactly 6 digits"
//                   required
//                 />
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Label>Country</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Col>
//             </Row>
//             <Form.Check
//               type="checkbox"
//               label="Set as default address"
//               name="isDefault"
//               checked={formData.isDefault}
//               onChange={handleInputChange}
//             />
//             <Button variant="primary" type="submit" className="mt-3">
//               Update Address
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default MyAccountAddress;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../../utils/handleToken";

const API_URL = "https://basavamart.in/api/address";

const MyAccountAddress = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  const allowAlphabets = (event) => {
    const charCode = event.charCode;
    if (!/^[a-zA-Z\s]*$/.test(String.fromCharCode(charCode))) {
      event.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchAddress = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      alert("Please login first");
      navigate("/MyAccountSignIn");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/getAddress`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const addressData = await response.json();
        setAddresses(addressData);
      } else {
        console.error("Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    const token = getTokenFromCookie();
    if (!token) {
      alert("Please login first");
      navigate("/MyAccountSignIn");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/addAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchAddress();
        setOpenAddModal(false);
        setFormData({
          firstName: "",
          lastName: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          isDefault: false,
        });
        fetchAddress();
      } else {
        console.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    const token = getTokenFromCookie();
    if (!token) {
      alert("Please login first");
      navigate("/MyAccountSignIn");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/updateAddress/${editingAddressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        fetchAddress();
        setOpenEditModal(false);
      } else {
        console.error("Failed to update address");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteAddress = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      alert("Please login first");
      navigate("/MyAccountSignIn");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/deleteAddress/${editingAddressId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        fetchAddress();
        setOpenDeleteModal(false);
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderAddressForm = (isEdit = false) => (
    <Box
      component="form"
      onSubmit={isEdit ? handleUpdateAddress : handleSaveAddress}
      sx={{ p: 2 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onKeyPress={allowAlphabets}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onKeyPress={allowAlphabets}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
            variant="outlined"
            type="number" // Restricts the input to numbers
            inputProps={{
              maxLength: 6, // Limit the number of characters
              pattern: "\\d{6}", // Regex pattern to ensure exactly 6 digits
              min: 100000, // Ensure the number is at least 6 digits long
              max: 999999, // Ensure the number is at most 6 digits long
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={formData.country}
            onKeyPress={allowAlphabets}
            onChange={handleInputChange}
            required
            variant="outlined"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isDefault}
                onChange={handleInputChange}
                name="isDefault"
              />
            }
            label="Set as default address"
          />
        </Grid> */}
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {isEdit ? "Update Address" : "Save Address"}
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        p: 2,
        // maxWidth: 1200,
        margin: "auto",
        // width: "100%",
        minHeight:'100vh'
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: isMobile ? 2 : 0,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Address
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenAddModal(true)}
          color="primary"
          fullWidth={isMobile}
          sx={{
            maxWidth: isMobile ? "100%" : 250,
          }}
        >
          Add New Address
        </Button>
      </Box>

      <Grid container spacing={2}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} md={4} key={address._id}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="h5">
                  {address.firstName} {address.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "24px" }}
                >
                  {address.addressLine1}
                  {address.addressLine2 && <>, {address.addressLine2}</>}
                  <br />
                  {address.city}, {address.state}
                  <br />
                  {address.country}, {address.zipCode}
                </Typography>
                {/* {address.isDefault && (
                  <Typography
                    variant="caption"
                    color="warning.main"
                    sx={{ mt: 1, display: "block" }}
                  >
                    Default Address
                  </Typography>
                )} */}
              </CardContent>
              <Box
                sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
              >
                <IconButton
                  color="primary"
                  onClick={() => {
                    setFormData({
                      firstName: address.firstName,
                      lastName: address.lastName,
                      addressLine1: address.addressLine1,
                      addressLine2: address.addressLine2,
                      city: address.city,
                      state: address.state,
                      zipCode: address.zipCode,
                      country: address.country,
                      isDefault: address.isDefault,
                    });
                    setEditingAddressId(address._id);
                    setOpenEditModal(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    setEditingAddressId(address._id);
                    setOpenDeleteModal(true);
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Address Dialog */}
      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>{renderAddressForm()}</DialogContent>
      </Dialog>

      {/* Edit Address Dialog */}
      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Address</DialogTitle>
        <DialogContent>{renderAddressForm(true)}</DialogContent>
      </Dialog>

      {/* Delete Address Dialog */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Delete Address</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this address?</Typography>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteAddress}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyAccountAddress;
