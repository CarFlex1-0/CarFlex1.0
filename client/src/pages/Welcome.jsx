import React from "react";
import { Link } from "react-router-dom";
import Hero from "@components/Dashboard/Hero";
import About from "@components/Dashboard/About";
import HowItWorks from "@components/Dashboard/HowItWorks";
import { Pricing } from "@components/Dashboard/Pricing";
import { motion } from "motion/react";
import { useTheme } from "@contexts/ThemeContext";

const Welcome = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const currentTheme = {
    background: isDarkMode 
      ? "bg-gradient-to-br from-[#2b4e7e] to-black" 
      : "bg-gradient-to-br from-gray-200 to-white",
    text: isDarkMode ? "text-gray-300" : "text-gray-600",
    divider: isDarkMode ? "text-gray-500" : "text-gray-400",
    button: isDarkMode ? "hover:bg-blue-900/30 text-gray-300" : "hover:bg-blue-100/30 text-gray-600",
  };

  return (
    <div className={`${currentTheme.background} min-h-screen transition-colors duration-300`}>
      {/* Theme Toggle Button */}
      <motion.button
        className={`fixed top-4 right-4 p-2 rounded-full z-50 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
      >
        {isDarkMode ? (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
            />
          </motion.svg>
        ) : (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </motion.svg>
        )}
      </motion.button>

      <Hero />
      <div className="flex flex-col items-center gap-6">
        <div className={`divider w-3/4 mx-auto flex justify-center items-center ${currentTheme.divider}`}>
          OR
        </div>
        <Link
          to="/sign-in-admin"
          className={`btn btn-ghost btn-sm gap-2 ${currentTheme.button} hover:text-white group transition-all duration-300 ease-in-out`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          >
            <path 
              fillRule="evenodd" 
              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="font-medium">Administrator Portal</span>
          <div className="badge badge-primary badge-sm">Secure Access</div>
        </Link>
      </div>

      <About />
      <HowItWorks />
      <Pricing />
    </div>
  );
};

export default Welcome;