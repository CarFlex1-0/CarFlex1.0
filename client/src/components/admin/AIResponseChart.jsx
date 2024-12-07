import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography } from "@material-tailwind/react";

export default function AIResponseChart({ data }) {
  // Transform data for visualization
  const chartData = [
    {
      name: "Response Status",
      "AI Generated": data.generated || 0,
      "Failed Attempts": data.failed || 0,
      "Expected Responses": data.expected || 0,
    },
  ];

  return (
    <Card className="backdrop-blur-md bg-white/10 p-6">
      <Typography variant="h5" color="white" className="mb-2">
        AI Response Analytics
      </Typography>
      <Typography color="white" className="mb-6 opacity-75">
        Overview of AI-generated responses and their status
      </Typography>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500/10 p-4 rounded-lg">
          <Typography color="white" className="text-lg font-bold">
            {data.generated}
          </Typography>
          <Typography color="white" className="text-sm">
            AI Generated
          </Typography>
        </div>
        <div className="bg-red-500/10 p-4 rounded-lg">
          <Typography color="white" className="text-lg font-bold">
            {data.failed}
          </Typography>
          <Typography color="white" className="text-sm">
            Failed Attempts
          </Typography>
        </div>
        <div className="bg-green-500/10 p-4 rounded-lg">
          <Typography color="white" className="text-lg font-bold">
            {data.expected}
          </Typography>
          <Typography color="white" className="text-sm">
            Expected
          </Typography>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="AI Generated" fill="#3B82F6" />
            <Bar dataKey="Failed Attempts" fill="#EF4444" />
            <Bar dataKey="Expected Responses" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
