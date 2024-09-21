// Simplistic Dashboard with Buttons
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  

  // Define button data
  const buttons = [
    { to: "/blog/dashboard", label: "Blog Dashboard" },
    { to: "/model", label: "3D Model" },
    { to: "/scrap", label: "Scrap" },
    { to: "/metric", label: "Metric" },
    { to: "/feedback", label: "Feedback" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="prose lg:prose-xl text-center mb-8">
        <h2>Welcome to CarFlex Dashboard</h2>
      </div>
      <div className="flex gap-4 items-center">
        {buttons.map((button, index) => (
          <Link
            key={index}
            to={button.to}
            className="btn glass btn-accent text-white px-4 py-2 rounded"
          >
            {button.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
