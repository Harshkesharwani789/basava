import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Home from "../Home";
import Shop from "../Shop";
import ShopDetail from "../ShopDetail";
import TestimonialMain from "../testimonial/TestimonialMain";
import Contact from "../Contact";
import Cart from "../Cart";
import Checkout from "../Checkout";
import Error from "../Error";
import MyAccountSignIn from "../../data/Accounts/MyAccountSignIn";
import MyAccountSignUp from "../../data/Accounts/MyAccountSignUp"; // add this import
import MyAccountOrder from "../../data/Accounts/MyAccountOrder";
import OrderDetailsView from "../../data/Accounts/OrderDetailsView";
import Main from "../admin/Main";
import AdminLogin from "../admin/AdminLogin";
import FloatingActions from "../FloatingActions";
import AboutUs from "../AboutUs";
import Terms from "../Terms";
import Return from "../Return";

// Import the OTPVerification component
import OTPVerification from "../OTPVerification"; // Add the correct import path

// Layout component to avoid repetition of Header and Footer
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const Pages = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<Main />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* MyAccount Routes */}
        <Route
          path="/MyAccountSignin"
          element={<Layout><MyAccountSignIn /></Layout>}
        />
        <Route
          path="/signup"
          element={<Layout><MyAccountSignUp /></Layout>} // Added sign up route
        />

        {/* Static Pages */}
        <Route
          path="/about"
          element={<Layout><AboutUs /></Layout>}
        />
        <Route
          path="/terms"
          element={<Layout><Terms /></Layout>}
        />
        <Route
          path="/return"
          element={<Layout><Return /></Layout>}
        />

        {/* Home and Shop Pages */}
        <Route
          path="/"
          element={<Layout><Home /></Layout>}
        />
        <Route
          path="/shop"
          element={<Layout><Shop /></Layout>}
        />
        <Route
          path="/shop-detail/:id"
          element={<Layout><ShopDetail /></Layout>}
        />

        {/* Testimonial Page */}
        <Route
          path="/testimonial"
          element={<Layout><TestimonialMain /></Layout>}
        />

        {/* Cart and Checkout Pages */}
        <Route
          path="/cart"
          element={<Layout><Cart /></Layout>}
        />
        <Route
          path="/checkout"
          element={<Layout><Checkout /></Layout>}
        />

        {/* Error and Contact Pages */}
        <Route
          path="/error"
          element={<Layout><Error /></Layout>}
        />
        <Route
          path="/contact"
          element={<Layout><Contact /></Layout>}
        />

        {/* Order Details Routes */}
        <Route
          path="/OrderDetailsView/:id"
          element={<Layout><OrderDetailsView /></Layout>}
        />
        <Route
          path="/MyAccountOrder"
          element={<Layout><MyAccountOrder /></Layout>}
        />

        {/* OTP Verification Route */}
        <Route
          path="/verify-otp"
          element={<Layout><OTPVerification /></Layout>}
        />
      </Routes>

      {/* Floating actions button */}
      <FloatingActions />
    </Router>
  );
};

export default Pages;
