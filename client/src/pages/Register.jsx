import React, { useState } from "react";
import axios from "axios";
import api from "../api"; // add at top
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Sun, Moon } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const toggleTheme = () => setDarkMode(!darkMode);

// ✅ No setUser import needed here

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "https://virtual-study-room-gwjx.onrender.com/api/auth/register",
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert(
      "Registration failed: " + (err.response?.data?.msg || err.message)
    );
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
            Create Account
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already registered?{" "}
            <Link
              to="/login"
              className={`font-medium hover:underline ${
                darkMode ? "text-teal-400" : "text-teal-600"
              }`}
            >
              Sign in
            </Link>
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <User
              className={`absolute left-3 top-3 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              size={20}
            />
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className={`pl-10 pr-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 text-sm ${
                darkMode
                  ? "bg-gray-700/80 border-gray-600 focus:ring-teal-500 text-white"
                  : "bg-gray-100 border-gray-300 focus:ring-teal-400 text-gray-900"
              }`}
            />
          </div>

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

          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              id="terms"
              required
              className={`h-4 w-4 rounded focus:ring-2 ${
                darkMode
                  ? "text-teal-500 bg-gray-700 border-gray-600 focus:ring-teal-500"
                  : "text-teal-500 bg-gray-200 border-gray-300 focus:ring-teal-400"
              }`}
            />
            <label
              htmlFor="terms"
              className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              I agree to the{" "}
              <a
                href="#"
                className={`hover:underline ${
                  darkMode ? "text-teal-400" : "text-teal-600"
                }`}
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg ${
              darkMode
                ? "bg-teal-600 hover:bg-teal-500 text-white"
                : "bg-teal-500 hover:bg-teal-400 text-white"
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
