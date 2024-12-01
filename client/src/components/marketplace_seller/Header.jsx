import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiSearch, FiUser, FiLogOut } from "react-icons/fi";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Handler to call on mouse click
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, buttonRef]);

  return (
    <header className="bg-gradient-to-br from-[#2b4e7e] to-black bg-opacity-100 shadow-lg">
      <div className="ms-4 me-4 px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Welcome Section */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="text-3xl text-white tracking-tight">
              Seller Dashboard
            </h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 m-0 p-0">
            {/* Notification Button */}
            <button className="relative p-2 rounded-full text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition duration-300">
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
              <FiBell className="h-6 w-6" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none"
              >
                <img
                  className="h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                />
              </button>

              {isProfileOpen && (
                <div
                  ref={dropdownRef}
                  className="custom-backdrop origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden animate-slide-down"
                >
                  <div className="px-4 py-3 custom-backdrop border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      John Seller
                    </p>
                    <p className="text-xs text-gray-900 truncate">
                      john.seller@example.com
                    </p>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-100 hover:glass transition duration-200 ease-in-out"
                    >
                      <FiUser className="inline-block mr-3 -mt-1" />
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-100 hover:glass transition duration-200 ease-in-out"
                    >
                      <FiLogOut className="inline-block mr-3 -mt-1" />
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
