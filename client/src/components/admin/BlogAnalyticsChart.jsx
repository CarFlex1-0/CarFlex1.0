import React from "react";
import {
  LineChart,
  Line,
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

export default function BlogAnalyticsChart({ trends, topBlogs }) {
  return (
    <Card className="backdrop-blur-md bg-white/10 p-6">
      <Typography variant="h5" color="white" className="mb-2">
        Blog Analytics
      </Typography>

      {/* Blog Creation Trends */}
      <div className="h-[300px] w-full mb-8">
        <Typography color="white" className="mb-4">
          Blog Creation Trends
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trends}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="_id.date" 
              stroke="#fff"
              tick={{ fill: '#fff' }}
            />
            <YAxis 
              stroke="#fff"
              tick={{ fill: '#fff' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#8884d8" 
              name="Blogs Created"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Blogs */}
      <div className="mt-6">
        <Typography color="white" className="mb-4">
          Top Performing Blogs
        </Typography>
        <div className="space-y-4">
          {topBlogs.map((blog, index) => (
            <div 
              key={blog._id} 
              className="p-4 bg-white/5 rounded-lg transition-all hover:bg-white/10"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Typography color="white" className="font-medium">
                    {blog.title}
                  </Typography>
                  {blog.subtitle && (
                    <Typography color="white" className="text-sm">
                      {blog.subtitle}
                    </Typography>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-500/20 px-3 py-1 rounded-full">
                    <Typography color="white" className="text-sm">
                      {blog.likesCount} likes
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
} 