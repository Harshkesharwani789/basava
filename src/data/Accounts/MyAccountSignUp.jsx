import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthServices from "./AuthServices";
import { useNavigate } from "react-router-dom";

const MyAccountSignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted
    try {
      const response = await AuthServices.signup(formData);
      console.log(response); // Log the response to verify structure
      setLoading(false); // Stop loading

      // Assuming response contains an OTP token or a verification requirement
      if (response.status === 200) {
        // Navigate to OTP page
        navigate("/verify-otp");
      } else {
        // Handle any non-success responses
        setError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error("Error during signup:", error);
  
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      {/* section */}
      <section className="my-lg-14 my-8">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
              {/* img */}
              <img
                src="/img/signup-g.svg"
                alt="basavacart"
                className="img-fluid"
              />
            </div>
            {/* col */}
            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
              <div className="mb-lg-9 mb-5">
                <h1 className="mb-1 h2 fw-bold">Get Start Shopping</h1>
                <p>Welcome to Basavamart! Enter your email to get started.</p>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {/* form */}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* col */}
                  <div className="col">
                    {/* input */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      aria-label="First name"
                      name="firstname"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col">
                    {/* input */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      aria-label="Last name"
                      name="lastname"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    {/* input */}
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    {/* input */}
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* btn */}
                  <div className="col-12 d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? "Signing up..." : "Register"}
                    </button>
                    <span className="navbar-text">
                      Already have an account?{" "}
                      <Link to="/MyAccountSignIn">Sign in</Link>
                    </span>
                  </div>
                  {/* text */}
                  <p>
                    <small>
                      By continuing, you agree to our{" "}
                      <Link to="#!"> Terms of Service</Link> &amp;{" "}
                      <Link to="#!">Privacy Policy</Link>
                    </small>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAccountSignUp;
