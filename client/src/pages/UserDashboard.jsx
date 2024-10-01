import React from "react";
import { SideBar } from "@components/user/SideBar";
import { Outlet } from "react-router-dom";
import Dashboard from "@components/Dashboard";
export default function UserDashboard() {
  return (
    <div className="h-full w-auto flex">
      {/* Sidebar will take up part of the screen width */}
      <SideBar />
      {/* <Dashboard /> */}
      {/* Outlet will take up the remaining space */}
      <div className="flex-1 bg-gradient-to-br from-blue-950 to-indigo-950 bg-opacity-100 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}
