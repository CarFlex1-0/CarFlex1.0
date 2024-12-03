import React, { useState } from "react";
import axios from "@services/axios";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiMail, FiLock, FiSun, FiMoon } from "react-icons/fi";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../contexts/auth_context";
import { useTheme } from "@contexts/ThemeContext";
import { motion } from "motion/react";

const SignIn = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.post("user/login", data);
      console.log("User (Cookie) signed in:", response.data);

      Cookies.set("token", response.data.token, { expires: 30 }); // Adjust expiration as needed
      Cookies.set("user", JSON.stringify(response.data), { expires: 30 });
      // TODO: AHMAD SE CHECKK KRWANA
      await setUser(response.data);
      console.log("User (Auth) signed in:", user); // Giving Null
      toast.success("Signed in successfully!", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
      navigate("/user/dashboard", { replace: true });
    } catch (error) {
      const errorMessage =
        "Sign In failed. Please check your credentials and try again.";
      setErrorMessage(errorMessage);
      toast.error(errorMessage, {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
      console.error("Sign In error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode
          ? "bg-gradient-to-br from-[#2b4e7e] to-black"
          : "bg-gradient-to-br from-blue-100 to-white"
      }`}
    >
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 rounded-full z-50 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
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

      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-md p-8 rounded-2xl ${
            isDarkMode
              ? "bg-white/10 backdrop-blur-md"
              : "bg-white/80 backdrop-blur-md"
          } shadow-xl`}
        >
          <div className="text-center mb-8">
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Welcome Back
            </h1>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Sign in to continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Account Type Selection */}
            <div className="mb-5">
              <label
                className={`block mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Account Type
              </label>
              <div className="flex gap-4 justify-center">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    {...register("role", { required: "Please select a role" })}
                    value="enthusiast"
                    className="radio radio-secondary"
                    defaultChecked
                  />
                  <span
                    className={`label-text ml-2 ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Enthusiast
                  </span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    {...register("role", { required: "Please select a role" })}
                    value="seller"
                    className="radio radio-secondary"
                  />
                  <span
                    className={`label-text ml-2 ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Seller
                  </span>
                </label>
              </div>
              {errors.role && (
                <p className="text-red-500 mt-1 text-center">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <label
                className={`block mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail
                    className={`h-5 w-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-blue-500 transition-colors`}
                  placeholder="example@domain.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                className={`block mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock
                    className={`h-5 w-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-blue-500 transition-colors`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className={`mr-2 rounded ${
                    isDarkMode ? "text-blue-500" : "text-blue-600"
                  }`}
                />
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-500"
                }`}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg flex items-center justify-center bg-purple-500 opacity-75 hover:bg-purple-400 text-white font-medium transition-colors"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p
            className={`mt-8 text-center text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-purple-500 hover:text-purple-400"
            >
              Sign up now
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-cover bg-center items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center z-10 p-8"
        >
          <div
            className={`text-5xl font-bold mb-12 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Car<span className="text-red-500 animate-pulse">F</span>lex
          </div>

          <div className="w-[500px] h-[300px] relative">
            <motion.img
              src="https://images.unsplash.com/photo-1494905998402-395d579af36f"
              alt="Luxury car"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>

          <p
            className={`mt-8 text-xl ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Your journey to automotive excellence starts here
          </p>
        </motion.div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
      </div>
    </div>
  );
};

export default SignIn;
