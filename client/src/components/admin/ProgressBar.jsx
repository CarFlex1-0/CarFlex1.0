import React from "react";
import { Progress } from "@material-tailwind/react"; // Ensure this import is present
import {  Card } from "@material-tailwind/react";
const ProgressBar = () => {
  const progressData = [
    { value: 25, color: "blue" },
    { value: 50, color: "amber" },
    { value: 75, color: "indigo" },
  ];

  return (
    <Card
      className="backdrop-blur-md bg-white/10 rounded-lg shadow-lg p-4 drawer-overlay"
      floated={false}
      shadow={true}
    >
      <div className="flex w-full flex-col gap-4">
        {progressData.map((data, index) => (
          <Progress
            key={index}
            value={data.value}
            size="md"
            color={data.color}
          />
        ))}
      </div>
    </Card>
  );
};

export default ProgressBar;
