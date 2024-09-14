import React from "react";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-center">
      <h2 className="">Welcome to CarFlex Dashboard</h2>
      <button className="btn glass btn-accent text-white">
        <Link to="/blog/dashboard">Blog Redirect</Link>
      </button>
    </div>
  );
};

export default Dashboard;
