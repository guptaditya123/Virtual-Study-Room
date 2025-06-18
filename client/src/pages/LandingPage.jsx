import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Users, Clock, MessageSquare, BookOpen } from "lucide-react";

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
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
          {darkMode ? <Sun size={20} /> : <Moon size={20} className="text-gray-800" />}
        </button>
      </div>

      {/* Header */}
      <div className="text-center max-w-4xl mx-auto pt-12">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500"
        >
          Virtual Study Room
        </motion.h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Your ultimate virtual study environment with real-time collaboration tools
        </p>
        <div className="flex justify-center gap-4 flex-wrap mb-16">
          <Link
            to="/login"
            className={`px-8 py-3 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg ${
              darkMode
                ? "bg-teal-600 hover:bg-teal-500 text-white"
                : "bg-teal-500 hover:bg-teal-400 text-white"
            }`}
          >
            Get Started
          </Link>
          <Link
            to="/register"
            className={`px-8 py-3 rounded-xl font-medium text-lg transition-all duration-300 border ${
              darkMode
                ? "border-teal-400 text-teal-400 hover:bg-teal-400/10"
                : "border-teal-500 text-teal-600 hover:bg-teal-500/10"
            }`}
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Hero Illustration */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className={`rounded-2xl p-1 shadow-2xl ${
          darkMode 
            ? "bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-purple-500/20" 
            : "bg-gradient-to-r from-teal-100 via-blue-100 to-purple-100"
        }`}>
          <div className={`rounded-xl overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <p className="text-lg text-gray-400">Study Room Preview</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for <span className="text-teal-400">Focused Learning</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users size={32} className="text-teal-400" />,
              title: "Collaborative Spaces",
              text: "Study together in real-time with shared whiteboards and group chat"
            },
            {
              icon: <Clock size={32} className="text-blue-400" />,
              title: "Focus Timer",
              text: "Built-in Pomodoro timer to maximize your productivity"
            },
            {
              icon: <BookOpen size={32} className="text-purple-400" />,
              title: "Resource Sharing",
              text: "Easily share notes, files and study materials with your group"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-2xl transition-all duration-300 ${
                darkMode ? "bg-gray-800/50 hover:bg-gray-800/70" : "bg-white hover:bg-gray-50"
              } shadow-lg`}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our <span className="text-teal-400">Users Say</span>
        </h2>
        <div className={`p-8 rounded-2xl ${
          darkMode ? "bg-gray-800/50" : "bg-white"
        } shadow-lg`}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mr-4">
                  <span className="text-xl">👩‍🎓</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah K.</h4>
                  <p className="text-sm text-gray-400">Computer Science Student</p>
                </div>
              </div>
              <p className="italic">
                "StudySphere completely transformed how my study group collaborates. The shared whiteboard is a game-changer!"
              </p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <span className="text-xl">👨‍💻</span>
                </div>
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-gray-400">Bootcamp Participant</p>
                </div>
              </div>
              <p className="italic">
                "The focus timer keeps me accountable and the clean interface helps me stay distraction-free."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-24 text-center">
        <div className={`p-10 rounded-2xl ${
          darkMode 
            ? "bg-gradient-to-r from-teal-600/20 to-blue-600/20" 
            : "bg-gradient-to-r from-teal-100 to-blue-100"
        }`}>
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students already improving their study sessions
          </p>
          <Link
            to="/register"
            className={`inline-block px-10 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg ${
              darkMode
                ? "bg-teal-600 hover:bg-teal-500 text-white"
                : "bg-teal-500 hover:bg-teal-400 text-white"
            }`}
          >
            Start For Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center">
        <div className="flex justify-center gap-6 mb-6">
          <Link to="/about" className="hover:text-teal-400 transition">About</Link>
          <Link to="/contact" className="hover:text-teal-400 transition">Contact</Link>
          <Link to="/privacy" className="hover:text-teal-400 transition">Privacy</Link>
          <Link to="/terms" className="hover:text-teal-400 transition">Terms</Link>
        </div>
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} StudySphere. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;