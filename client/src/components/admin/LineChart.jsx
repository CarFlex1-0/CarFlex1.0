import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

export default function LineChart({ data }) {
  const chartConfig = {
    type: "line",
    height: 260,
    series: [
      {
        name: "Basic Plan",
        data: data.filter(d => d._id.plan === 'basic').map(d => d.count),
      },
      {
        name: "Standard Plan",
        data: data.filter(d => d._id.plan === 'standard').map(d => d.count),
      },
      {
        name: "Premium Plan",
        data: data.filter(d => d._id.plan === 'premium').map(d => d.count),
      },
    ],
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
      colors: ["#00d4ff", "#34D399", "#FBBF24"], // Colors for Basic, Standard, and Premium lines
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 4,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [...new Set(data.map(d => `${d._id.month}/${d._id.year}`))],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        labels: {
          colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
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
            Subscriptions
          </Typography>
          <Typography
            variant="medium"
            color="white"
            className="max-w-sm font-normal ms-6"
          >
            Visualize Basic, Standard, and Premium subscribers over time.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
