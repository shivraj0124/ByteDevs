import React, { useState } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import loginAnimation from "../assets/lottie.json";

const Login = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId",data?.user?._id)
        switch (data?.user?.role) {
          case "manager":
            navigate("/DashBoard_Lay");
            break;
          case "comedian":
            navigate("/ComedianDashBoard_Lay");
            break;
          case "customer":
            navigate("/");
            break;
          case "admin":
            navigate("/AdminDashBoard_Lay");
            break;
        }
      } else {
        alert(data.message || "Login failed! Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-wrap min-h-screen w-full bg-[#0D021F]">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-r from-[#3F2463] to-[#5E3A8A]">
        <div className="w-3/4">
          <Lottie animationData={loginAnimation} loop />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-[#1A0826]">
        <div className="bg-[#251132] px-10 pb-5 pt-2 rounded-lg shadow-lg w-full max-w-lg">
          <p className="text-xl text-white mb-5 text-center">
            Welcome back to <br />
            <span className="text-[#6b6080] text-3xl font-bold">Comedy!</span>
          </p>

          <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
            <div className="text-left">
              <label className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(
                    e.target.value,
                    );
                }}
                className="block w-full px-4 py-2 mt-1 border border-[#5E3A8A] bg-[#1A0826] text-white rounded-lg shadow-sm placeholder-gray-400"
                placeholder="Your Email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white text-left">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value
                    );
                }}
                className="block w-full px-4 py-2 mt-1 border border-[#5E3A8A] bg-[#1A0826] text-white rounded-lg shadow-sm placeholder-gray-400"
                placeholder="Your Password"
                required
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full px-4 py-2 text-white bg-gradient-to-r from-[#3F2463] to-[#5E3A8A] rounded-lg shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-white">
            Don't have an account?{" "}
            <span
              className="text-[#A67EF8] cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
