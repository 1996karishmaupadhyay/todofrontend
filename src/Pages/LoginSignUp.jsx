import React, { useState } from 'react';
import { login, signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginSignUp = () => {
  const [loginMode, setLoginMode] = useState(false);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ LOGIN FUNCTION
  const handleLogin = async () => {
    try {
      const res = await login({
        email: formData.email,
        password: formData.password
      });

      console.log("Login Success:", res);
      toast.success("✅ Login successful");
        navigate("/todo");
    } catch (err) {
      console.log("FULL ERROR:", err);

  const msg =
    err?.response?.data?.message || err.message || "Login failed";

  toast.error("❌ " + msg);
    }
  };

  // ✅ SIGNUP FUNCTION
  const handleSignup = async () => {
    try {
      const res = await signup(formData);

      console.log("Signup Success:", res);
   toast.success("Sign successful");
      setFormData({
      name: "",
      email: "",
      password: "",
    });
      setLoginMode(true)
    } catch (err) {
      console.log(err);
      toast.error("❌ Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
        
        <h1 className="text-2xl font-bold text-center mb-4">
          {loginMode ? "Login" : "Sign Up"}
        </h1>

      <ToastContainer />

        <div className="flex flex-col gap-4">

          {!loginMode && (
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              type="text"
              placeholder="Username"
            />
          )}

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="email"
            placeholder="Email"
          />

          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="password"
            placeholder="Password"
          />

          {/* ✅ BUTTON CALLS DIFFERENT FUNCTIONS */}
          <button
            onClick={loginMode ? handleLogin : handleSignup}
            className="bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
          >
            {loginMode ? "Login" : "Sign Up"}
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          {loginMode ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setLoginMode(!loginMode);
             
            }}
            className="text-teal-500 cursor-pointer ml-1"
          >
            {loginMode ? "Sign Up" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default LoginSignUp;