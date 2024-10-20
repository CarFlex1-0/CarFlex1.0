import React from "react";
import { SideBar } from "@components/user/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import Dashboard from "@components/Dashboard";
export default function UserDashboard() {
  const location = useLocation(); // Get the current route

  // Check if the current path is /user/buy-parts
  const isBuyPartsRoute = location.pathname === "/user/buy-parts";
  return (
    <div className="h-full w-auto flex">
      {/* Sidebar will take up part of the screen width */}
      <SideBar />
      {/* <Dashboard /> */}
      {/* Outlet will take up the remaining space */}
      <div
        className={`flex-1 ${
          isBuyPartsRoute
            ? "bg-gradient-to-br from-blue-950 to-indigo-950 bg-opacity-100 min-h-screen"
            : "bg-gradient-to-br from-blue-950 to-indigo-950 bg-opacity-100 min-h-screen"
        } rounded-lg`}
      >
        <Outlet />
      </div>
    </div>
  );
}
