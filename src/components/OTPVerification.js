import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../data/Accounts/AuthServices'; // Correct path if the file is in src/data/Accounts/
 // assuming you have a service for API calls

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call the backend API to verify the OTP
      const response = await AuthServices.verifyOtp(otp);
      console.log('OTP Verified:', response);
      
      // Handle success - navigate to the next page
      if (response.status === 200) {
        navigate('/dashboard'); // Change this to the next page after successful OTP verification
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error verifying OTP:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Verify OTP</h2>
        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
