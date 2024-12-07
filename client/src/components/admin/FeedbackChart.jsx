import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography, Rating } from "@material-tailwind/react";

// Custom Rating component with better styling
const CustomRating = ({ value, readonly = true, size = "md" }) => {
  const starSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const starSize = starSizes[size];

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= value ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`${starSize} text-yellow-400`}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={`${starSize} text-gray-400`}
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
};

export default function FeedbackChart({ feedbackData, recentFeedback }) {
  // Process feedback data to get rating distribution over time
  const processedData = feedbackData.reduce((acc, feedback) => {
    const date = new Date(feedback.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {
        date,
        '1star': 0,
        '2star': 0,
        '3star': 0,
        '4star': 0,
        '5star': 0,
        total: 0,
        sum: 0
      };
    }
    acc[date][`${feedback.rating}star`]++;
    acc[date].total++;
    acc[date].sum += feedback.rating;
    return acc;
  }, {});

  // Convert to array and calculate average
  const chartData = Object.values(processedData).map(day => ({
    ...day,
    average: (day.sum / day.total).toFixed(1)
  }));

  return (
    <Card className="backdrop-blur-md bg-white/10 p-6">
      <Typography variant="h5" color="white" className="mb-6 text-xl font-semibold">
        Feedback Analysis
      </Typography>
      
      {/* Rating Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[5,4,3,2,1].map((rating) => {
          const totalForRating = feedbackData.filter(f => f.rating === rating).length;
          const percentage = ((totalForRating / feedbackData.length) * 100).toFixed(1);
          
          return (
            <div key={rating} className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex flex-col items-center gap-2">
                <CustomRating value={rating} size="sm" />
                <Typography color="white" className="text-lg font-bold">
                  {percentage}%
                </Typography>
                <Typography className="text-gray-300 text-sm">
                  {totalForRating} reviews
                </Typography>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rating Trends Chart */}
      <div className="mb-8">
        <Typography color="white" className="mb-4 text-lg font-semibold">
          Rating Trends
        </Typography>
        <div className="h-[300px] w-full bg-white/5 p-4 rounded-lg border border-white/10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
                domain={[0, 5]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend 
                wrapperStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="5star" stroke="#10B981" name="5 Stars" strokeWidth={2} />
              <Line type="monotone" dataKey="4star" stroke="#3B82F6" name="4 Stars" strokeWidth={2} />
              <Line type="monotone" dataKey="3star" stroke="#F59E0B" name="3 Stars" strokeWidth={2} />
              <Line type="monotone" dataKey="2star" stroke="#EF4444" name="2 Stars" strokeWidth={2} />
              <Line type="monotone" dataKey="1star" stroke="#7C3AED" name="1 Star" strokeWidth={2} />
              <Line type="monotone" dataKey="average" stroke="#ffffff" name="Average" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Feedback Section */}
      <div>
        <Typography color="white" className="mb-4 text-lg font-semibold">
          Latest Feedback
        </Typography>
        <div className="space-y-4">
          {recentFeedback.map((feedback, index) => (
            <div 
              key={index} 
              className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <Typography color="white" className="font-medium mb-2 text-base">
                    {feedback.content}
                  </Typography>
                  <div className="flex items-center gap-3">
                    <CustomRating value={feedback.rating} size="md" />
                    <Typography className="text-gray-300 text-sm">
                      {feedback.rating}/5
                    </Typography>
                  </div>
                </div>
                <Typography className="text-gray-300 text-sm whitespace-nowrap">
                  {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
} 