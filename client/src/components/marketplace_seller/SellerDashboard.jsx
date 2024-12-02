import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "@contexts/ThemeContext";

export default function SellerDashboard() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main
          className={`flex-grow overflow-y-auto ${
            isDarkMode
              ? "bg-gradient-to-br from-[#2b4e7e] to-black"
              : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
          }`}
        >
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
