import React, { useState } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import loginAnimation from "../assets/lottie.json";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

 
    console.log("Signup Data:", formData);

   
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex flex-wrap min-h-screen w-full bg-[#0D021F]">
  
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-r from-[#3F2463] to-[#5E3A8A]">
        <div className="w-3/4">
          <Lottie animationData={loginAnimation} loop />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#1A0826]">
        <div className="bg-[#251132] p-10 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-[#A67EF8] mb-5">Sign Up</h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
          
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

   
            <div>
              <label className="block text-sm font-medium text-white text-left">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-1 border border-[#5E3A8A] bg-[#1A0826] text-white rounded-lg shadow-sm placeholder-gray-400"
                placeholder="Confirm Password"
                required
              />
            </div>


            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-gradient-to-r from-[#3F2463] to-[#5E3A8A] rounded-lg shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
          </form>

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
