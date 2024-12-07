import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { useTheme } from "@contexts/ThemeContext";
import { useAuth } from "@contexts/auth_context";
import { motion } from "framer-motion";
import { toast, Slide } from "react-toastify";

export default function Sidebar() {
  const { isDarkMode } = useTheme();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "dashboard", icon: FiHome },
    { name: "Products", path: "products", icon: FiShoppingBag },
    { name: "Orders", path: "orders", icon: FiShoppingCart },
    { name: "Profile Settings", path: "profile", icon: FiSettings },
  ];

  const isActive = (path) => location.pathname.includes(path);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!", {
      position: "top-left",
      autoClose: 5000,
      theme: "dark",
      transition: Slide,
    });
    navigate("/", { replace: true });
  };

  return (
    <div
      className={`w-64 min-h-screen flex flex-col ${
        isDarkMode
          ? "bg-gray-900 border-r border-gray-800"
          : "bg-gray-50 border-r border-gray-200"
      }`}
    >
      {/* Logo Section */}
      <div className="p-6">
        <h1
          className={`text-2xl font-bold text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Car
          <motion.span
            className="text-red-600 text-[1.9rem]"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            F
          </motion.span>
          lex
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? isDarkMode
                      ? "bg-blue-600/20 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                    : isDarkMode
                    ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive(item.path) ? "animate-pulse" : ""
                  }`}
                />
                <span className="font-medium">{item.name}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute left-0 w-1 h-8 rounded-r-full ${
                      isDarkMode ? "bg-blue-400" : "bg-blue-600"
                    }`}
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Updated Logout Section */}
      <div
        className={`mt-auto p-4 ${
          isDarkMode ? "border-t border-gray-800" : "border-t border-gray-200"
        }`}
      >
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            isDarkMode
              ? "bg-red-500/10 text-red-300 hover:bg-red-500/20"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-red-500/20" : "bg-red-100"
            }`}
          >
            <FiLogOut className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium">Logout</span>
            <span
              className={`text-xs ${
                isDarkMode ? "text-red-300/70" : "text-red-500/70"
              }`}
            >
              Sign out of your account
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
