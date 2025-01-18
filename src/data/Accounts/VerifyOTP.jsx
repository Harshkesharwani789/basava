import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "./AuthServices";

const VerifyOTP = () => {
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthServices.verifyOTP({ email, otp });
      navigate("/"); // Redirect to home page or a specific page after successful verification
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Verify OTP</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="d-flex justify-content-evenly" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            border: "1px solid #ccc",
            padding: "10px 12px",
            borderRadius: "5px",
            width: "210px",
          }}
        />
        <input
          type="text"
          name="otp"
          placeholder="OTP"
          onChange={(e) => setOTP(e.target.value)}
          required
          style={{
            border: "1px solid #ccc",
            padding: "10px 12px",
            borderRadius: "5px",
            width: "210px",
          }}
        />
        <button type="submit" className="btn btn-primary">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
