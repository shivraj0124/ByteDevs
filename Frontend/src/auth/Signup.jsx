import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import loginAnimation from "../assets/lottie.json";

const Signup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false); // To manage submission state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/api/auth/signup", formData);
      
      console.log("Signup Success:", response.data);
      alert("Signup Successful! Redirecting to home...");

      // Redirect after 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap min-h-screen w-full bg-[#0D021F]">
      {/* Left Side - Animation */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-r from-[#3F2463] to-[#5E3A8A]">
        <div className="w-3/4">
          <Lottie animationData={loginAnimation} loop />
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#1A0826]">
        <div className="bg-[#251132] p-10 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-[#A67EF8] mb-5">Sign Up</h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-white text-left">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-1 border border-[#5E3A8A] bg-[#1A0826] text-white rounded-lg shadow-sm placeholder-gray-400"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-white text-left">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-1 border border-[#5E3A8A] bg-[#1A0826] text-white rounded-lg shadow-sm placeholder-gray-400"
                placeholder="Your Email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-white text-left">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-1 border border-[#5E3A8A] bg-[#1A0826] text-white rounded-lg shadow-sm placeholder-gray-400"
                placeholder="Your Password"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-white text-left">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-1 border border-[#5E3A8A] bg-[#1A0826] text-white rounded-lg shadow-sm"
                required
              >
                <option value="">Select Role</option>
                <option value="customer">Customer</option>
                <option value="manager">Manager</option>
                <option value="comedian">Artist</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-gradient-to-r from-[#3F2463] to-[#5E3A8A] rounded-lg shadow-md hover:shadow-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Login Redirect */}
          <p className="mt-5 text-white">
            Already have an account?{" "}
            <span
              className="text-[#A67EF8] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
