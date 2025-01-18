import axios from "axios";

const API_URL = "http://localhost:3003";

// Login function
const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

// Signup function
const signup = (userData) => {
  return axios.post(`${API_URL}/api/auth/signup`, userData);
};

const AuthServices = {
  login,
  signup,  // Added the signup function here
};

export default AuthServices;
