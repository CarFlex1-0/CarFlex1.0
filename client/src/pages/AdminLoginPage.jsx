import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@contexts/ThemeContext";
import { useAuth } from "@contexts/auth_context";
import axios from "@services/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Slide } from "react-toastify";

const AdminLoginPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const carImages = [
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("user/admin-login", formData);
      if (response.data.success) {
        // Save token and user data in cookies
        Cookies.set("token", response.data.data.token, {
          expires: formData.rememberMe ? 30 : 1,
        });
        Cookies.set("user", JSON.stringify(response.data.data), {
          expires: formData.rememberMe ? 30 : 1,
        });

        // Update auth context
        await setUser(response.data.data);

        toast.success("Welcome back, Administrator!", {
          position: "top-left",
          autoClose: 5000,
          theme: isDarkMode ? "dark" : "light",
          transition: Slide,
        });

        navigate("/admin/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Admin login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";

      toast.error(errorMessage, {
        position: "top-left",
        autoClose: 5000,
        theme: isDarkMode ? "dark" : "light",
        transition: Slide,
      });
    }
  };

  return (
    <div
      className={`flex min-h-screen relative ${
        isDarkMode
          ? "bg-gradient-to-br from-[#2b4e7e] to-black"
          : "bg-gradient-to-br from-blue-100 to-white"
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 rounded-full z-50 transition-all duration-300 ${
          isDarkMode
            ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Heading */}
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-500 bg-clip-text text-transparent drop-shadow-lg transform hover:scale-105 transition-transform duration-200">
              Car<span className="text-red-600 animate-pulse">F</span>lex
            </h1>
            <h2
              className={`mt-6 text-3xl font-bold tracking-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Administrator Access
            </h2>
            <p
              className={`mt-2 text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Secure portal for CarFlex system administrators
            </p>
          </div>

          {/* Login Form */}
          <div className="glass backdrop-blur-sm bg-white/10 rounded-xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label">
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  className={`input input-bordered w-full backdrop-blur-sm ${
                    isDarkMode
                      ? "bg-gray-800/50 text-white placeholder-gray-400 border-gray-600"
                      : "bg-white/70 text-gray-900 placeholder-gray-500 border-gray-300"
                  }`}
                  placeholder="admin@carflex.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  className={`input input-bordered w-full backdrop-blur-sm ${
                    isDarkMode
                      ? "bg-gray-800/50 text-white placeholder-gray-400 border-gray-600"
                      : "bg-white/70 text-gray-900 placeholder-gray-500 border-gray-300"
                  }`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary mr-2"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      setFormData({ ...formData, rememberMe: e.target.checked })
                    }
                  />
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Remember me
                  </span>
                </label>
              </div>

              <div>
                <button type="submit" className="btn btn-primary w-full">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Section - Image Carousel */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8">
        <div className="carousel w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl">
          {carImages.map((image, index) => (
            <div
              key={index}
              id={`slide${index + 1}`}
              className="carousel-item relative w-full"
            >
              <img
                src={image}
                className="w-full object-cover h-[600px]"
                alt={`Luxury car ${index + 1}`}
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a
                  href={`#slide${index === 0 ? carImages.length : index}`}
                  className="btn btn-circle btn-ghost bg-black/30 text-white hover:bg-black/50"
                >
                  ❮
                </a>
                <a
                  href={`#slide${
                    index === carImages.length - 1 ? 1 : index + 2
                  }`}
                  className="btn btn-circle btn-ghost bg-black/30 text-white hover:bg-black/50"
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
