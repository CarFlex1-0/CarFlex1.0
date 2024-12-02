import React, { useState, useRef, useEffect } from "react";
import {
  FiBell,
  FiUser,
  FiLogOut,
  FiSettings,
  FiSun,
  FiMoon,
  FiHelpCircle,
} from "react-icons/fi";
import { useTheme } from "@contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New order received", time: "5 mins ago" },
    { id: 2, text: "Product stock low", time: "1 hour ago" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, buttonRef, notificationRef]);

  return (
    <header
      className={`${
        isDarkMode
          ? "bg-gray-900/80 backdrop-blur-sm"
          : "bg-white/80 backdrop-blur-sm"
      } shadow-sm border-b ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      } relative z-40`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Brand */}
          <div className="flex items-center gap-4">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? "bg-white/10 ring-1 ring-white/20"
                  : "bg-white ring-1 ring-gray-200"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/assets/images/tempLogo.png"
                  alt="CarFlex"
                  className="h-8 w-8 object-contain"
                  style={{
                    filter: isDarkMode ? "invert(1)" : "none",
                    transform: "scale(1.8)",
                  }}
                />
              </div>
            </div>
            <h1
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Seller Dashboard
            </h1>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg relative ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FiBell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } border ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    } z-50`}
                  >
                    <div className="p-4">
                      <h3
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-900"
                        }`}
                      >
                        Notifications
                      </h3>
                      <div className="mt-2 space-y-2">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-2 rounded-lg ${
                              isDarkMode
                                ? "hover:bg-gray-700"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <p
                              className={`text-sm ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {notification.text}
                            </p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              {notification.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                ref={buttonRef}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  className={`h-9 w-9 rounded-lg object-cover ${
                    isDarkMode ? "ring-2 ring-gray-700" : "ring-2 ring-gray-200"
                  }`}
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                />
                <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  <FiUser className="w-5 h-5" />
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } border ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    } z-50`}
                  >
                    <div className="p-2 space-y-1">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <FiUser className="w-4 h-4" />
                        Profile
                      </button>
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <FiSettings className="w-4 h-4" />
                        Settings
                      </button>
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <FiHelpCircle className="w-4 h-4" />
                        Help
                      </button>
                      <div
                        className={`my-1 border-t ${
                          isDarkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      />
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                          isDarkMode
                            ? "text-red-400 hover:bg-gray-700"
                            : "text-red-600 hover:bg-gray-100"
                        }`}
                      >
                        <FiLogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
