import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types"; // Import PropTypes for type-checking

const BarChart = ({ data, categories, barColor, heading, headerText }) => {
  // Chart configuration using props
  const chartConfig = {
    type: "bar",
    height: 260,
    series: [
      {
        name: "Sales",
        data: data,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: [barColor],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 5,
        },
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
        categories: categories,
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
        borderColor: "#ffffff",
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
    },
  };

  return (
    <Card
      className="backdrop-blur-md bg-white/10 rounded-lg shadow-lg p-4  transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
      floated={false}
      shadow={true}
    >
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
            {heading}
          </Typography>
          <Typography
            variant="medium"
            color="white"
            className="max-w-sm font-normal ms-6"
          >
            {headerText}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

// Prop types validation
BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Default props
BarChart.defaultProps = {
  data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  categories: ["", "", "", "", "", "", "", "", ""],
};

export default BarChart;
