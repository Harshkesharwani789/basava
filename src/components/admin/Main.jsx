import { Box } from "@mui/material";
import React, { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import "./CustomStyles.css";
import { getTokenFromCookie } from "../../utils/handleToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const Main = () => {
  const navigate = useNavigate();

  const isAdmin = async () => {
    try {
      const token = getTokenFromCookie();
      console.log(token);
      const response = await axios.get(
        "https://basavamart.in/api/auth/isAdmin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        if (response.data === "admin") {
          return true; // User is admin
        } else {
          navigate("/admin-login"); // Non-admin redirected
        }
      }
    } catch (error) {
      console.error(
        "Authorization error:",
        error.response?.data || error.message
      );
      navigate("/admin-login"); // Redirect on error
    }
  };

  useEffect(() => {
    isAdmin();
  }, []);

  return (
    <Box>
      <Helmet>
        <title>Admin - BasavaMart</title>
      </Helmet>
      <AdminHeader />
    </Box>
  );
};

export default Main;
