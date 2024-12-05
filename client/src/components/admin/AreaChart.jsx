import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography } from "@material-tailwind/react";

export default function AreaChartComponent({ data, title, description }) {
  return (
    <Card className="backdrop-blur-md bg-white/10 p-6">
      <Typography variant="h5" color="white" className="mb-2">
        {title}
      </Typography>
      <Typography color="white" className="mb-6 opacity-75">
        {description}
      </Typography>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="date" 
              stroke="#fff"
              tick={{ fill: '#fff' }}
            />
            <YAxis 
              stroke="#fff"
              tick={{ fill: '#fff' }}
              tickFormatter={(value) => `PKR ${value.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => [`PKR ${value.toLocaleString()}`, '']}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
              name="Total Revenue"
            />
            <Area
              type="monotone"
              dataKey="commission"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="CarFlex Commission"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
