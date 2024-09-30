import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

// Function to generate random values for responses
const generateRandomResponses = () => {
  const aiGenerated = Math.floor(Math.random() * 100) + 50; // Random between 50 and 150
  const failed = Math.floor(Math.random() * 40) + 10; // Random between 10 and 50
  const expected = Math.floor(Math.random() * 70) + 20; // Random between 20 and 90
  return [aiGenerated, failed, expected];
};

export default function PieChart() {
  // State to hold the series values
  const [chartData, setChartData] = useState(generateRandomResponses());

  useEffect(() => {
    // You can add more logic here if needed (e.g., refreshing data at intervals)
  }, []);

  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: chartData, // Dynamic series based on state
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#1d4ed8", "#ff8f00", "#00897b"],
      labels: ["AI Generated", "Failed", "Expected"], // Labels for pie chart
      legend: {
        show: true,
        position: "bottom",
        labels: {
          colors: "#fff", // Adjust color for better visibility
        },
      },
    },
  };

  return (
    <Card className="backdrop-blur-md bg-white/10 rounded-lg shadow-lg p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div>
          <Typography
            variant="h4"
            color="white"
            className="font-normal ms-6 mb-2"
          >
            AI Generated Responses
          </Typography>
          <Typography
            variant="medium"
            color="white"
            className="max-w-sm font-normal ms-6"
          >
            Visualize the status of AI-generated responses, failed attempts, and
            expected responses dynamically.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart {...chartConfig} />
      </CardBody>
      <div className="mt-4 flex  justify-between">
        <Typography variant="h6" color="white" className="font-normal">
          AI Generated: {chartData[0]}
        </Typography>
        <Typography variant="h6" color="white" className="font-normal">
          Failed: {chartData[1]}
        </Typography>
        <Typography variant="h6" color="white" className="font-normal">
          Expected: {chartData[2]}
        </Typography>
      </div>
    </Card>
  );
}
