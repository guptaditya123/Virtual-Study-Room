import React, { useContext, useState } from "react";
import axios from "axios";
import api from "../api"; // add at top
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Sun, Moon } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext); // ← get setUser from context

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/api/auth/login`, {
        email,
        password,
      });
      // Save token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user); // ← update context ✅   
      navigate('/dashboard');
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
      }`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-4 right-6">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition ${
            darkMode
              ? "bg-white/20 hover:bg-white/30"
              : "bg-black/10 hover:bg-black/20"
          }`}
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} className="text-gray-800" />
          )}
        </button>
      </div>

      <div
        className={`rounded-2xl p-8 max-w-md w-full shadow-2xl transition-all duration-300 ${
          darkMode
            ? "bg-gray-800/70 backdrop-blur-sm border border-gray-700/50"
            : "bg-white/90 backdrop-blur-sm border border-gray-200"
        }`}
      >
        <div className="text-center mb-8">
          <h2
            className={`text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${
              darkMode
                ? "from-teal-400 to-blue-500"
                : "from-teal-500 to-blue-600"
            }`}
          >
            Welcome Back
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className={`font-medium hover:underline ${
                darkMode ? "text-teal-400" : "text-teal-600"
              }`}
            >
              Register here
            </Link>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail
              className={`absolute left-3 top-3 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              size={20}
            />
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className={`pl-10 pr-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 text-sm ${
                darkMode
                  ? "bg-gray-700/80 border-gray-600 focus:ring-teal-500 text-white"
                  : "bg-gray-100 border-gray-300 focus:ring-teal-400 text-gray-900"
              }`}
            />
          </div>

          <div className="relative">
            <Lock
              className={`absolute left-3 top-3 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              size={20}
            />
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`pl-10 pr-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 text-sm ${
                darkMode
                  ? "bg-gray-700/80 border-gray-600 focus:ring-teal-500 text-white"
                  : "bg-gray-100 border-gray-300 focus:ring-teal-400 text-gray-900"
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg ${
              darkMode
                ? "bg-teal-600 hover:bg-teal-500 text-white"
                : "bg-teal-500 hover:bg-teal-400 text-white"
            }`}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
