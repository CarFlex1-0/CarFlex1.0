import React from 'react';
import { Typography } from "@material-tailwind/react";
import { FaUserCircle, FaBell } from "react-icons/fa";

// Header Component for Dashboard
export default function DashboardHeader({ title }) {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <Typography color="white" variant="h5">
          <div className="flex items-center space-x-2">
            <span className="text-2xl text-indigo-500">
              Car<span className="text-red-600">F</span>lex
            </span>
            <span className="text-2xl text-indigo-500">{title}</span>
          </div>
        </Typography>
      </div>
      <div className="flex items-center gap-6">
        <FaBell className="text-white text-xl cursor-pointer" />
        <FaUserCircle className="text-white text-2xl cursor-pointer" />
      </div>
    </header>
  );
}

