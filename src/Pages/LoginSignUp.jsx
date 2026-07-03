import React, { useState } from 'react';
import { login, signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignUp = () => {
  const [loginMode, setLoginMode] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.warning("⚠️ Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await login({
        email: formData.email,
        password: formData.password
      });
      toast.success("✅ Login successful!");
      navigate("/todo");
    } catch (err) {
      console.log("FULL ERROR:", err);
      const msg = err?.message || err || "Login failed";
      toast.error("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.warning("⚠️ All fields are required");
      return;
    }
    setLoading(true);
    try {
      await signup(formData);
      toast.success("🎉 Signup successful! Please log in.");
      setFormData({
        username: "",
        email: "",
        password: ""
      });
      setLoginMode(true);
    } catch (err) {
      console.log(err);
      const msg = err?.message || err || "Signup failed";
      toast.error("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-955 text-slate-100 p-4 relative overflow-hidden font-sans">
      {/* Decorative single-color gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <ToastContainer theme="dark" position="top-right" autoClose={3000} />

      <div className="bg-slate-900/80 border border-slate-800/80 p-8 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-md relative z-10">
        
        {/* App Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-3">
            <span className="font-bold text-white text-xl">T</span>
          </div>
          <h1 className="text-2xl font-bold text-indigo-400 font-sans tracking-wide">
            TaskSphere
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            {loginMode ? "Welcome back! Please login to your account" : "Join us and organize your workspace"}
          </p>
        </div>

        <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-3 font-sans">
          {loginMode ? "Login" : "Sign Up"}
        </h2>

        <div className="flex flex-col gap-5">
          {!loginMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-sans">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-slate-850 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 text-sm font-sans"
                type="text"
                placeholder="Your username"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-sans">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-850 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 text-sm font-sans"
              type="email"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-sans">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-850 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition duration-200 text-sm font-sans"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={loginMode ? handleLogin : handleSignup}
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 text-sm mt-3 disabled:opacity-50 disabled:pointer-events-none font-sans"
          >
            {loading ? "Please wait..." : (loginMode ? "Login" : "Sign Up")}
          </button>
        </div>

        <p className="text-sm text-center text-slate-400 mt-6 font-sans">
          {loginMode ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setLoginMode(!loginMode);
            }}
            className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer ml-1 transition-colors"
          >
            {loginMode ? "Sign Up" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default LoginSignUp;