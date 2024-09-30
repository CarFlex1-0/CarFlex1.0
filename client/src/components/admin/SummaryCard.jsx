import React from "react";
import { Card, Typography } from "@material-tailwind/react";

// Summary Cards Component
const SummaryCard = ({ title, value, icon, percentage }) => (
  <Card className="flex flex-col items-center justify-between p-4 bg-white/20 backdrop-blur-md w-full m-2 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
    <div className="flex flex-col items-center">
      <Typography variant="small" className="text-white text-center mb-2">
        {title}
      </Typography>
      <Typography variant="h4" className="text-white text-center">
        {value}
      </Typography>
      {/* Radial Progress Indicator */}
      <div
        className="radial-progress bg-primary text-[#fde047]   mt-2"
        style={{ "--value": percentage }}
        role="progressbar"
      >
        {percentage}%
      </div>
    </div>
    {/* Uncomment icon if needed */}
    {/* {icon && <div className="text-3xl text-white">{icon}</div>} */}
  </Card>
);

export default SummaryCard;
