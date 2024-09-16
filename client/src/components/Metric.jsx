// Dummy Dashboard for Metrics
// TODO: Integrate with ThreeDModel and use values from there
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Metric = () => {
  const [cars, setCars] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch("http://localhost:5000/api/cars");
      const json = await response.json();
      if (response.ok) {
        setCars(json);
      }
    };
    fetchCars();
  }, []);

  const fetchMetrics = async (carId) => {
    setLoading(true);
    try {
      const metric1Response = await fetch(
        `http://localhost:5000/api/metric1/${carId}`
      );
      const metric1Data = await metric1Response.json();

      const metric2Response = await fetch(
        `http://localhost:5000/api/metric2/${carId}`
      );
      const metric2Data = await metric2Response.json();

      const metric3Response = await fetch(
        `http://localhost:5000/api/metric3/${carId}`
      );
      const metric3Data = await metric3Response.json();

      const metric4Response = await fetch(
        `http://localhost:5000/api/metric4/${carId}`
      );
      const metric4Data = await metric4Response.json();

      const metric5Response = await fetch(
        `http://localhost:5000/api/metric5/${carId}`
      );
      const metric5Data = await metric5Response.json();

      const metricsData = {
        metric1: metric1Data.data,
        metric2: metric2Data.data,
        metric3: metric3Data.data,
        metric4: metric4Data.data,
        metric5: metric5Data.data,
      };

      setMetrics(metricsData);
    } catch (error) {
      console.error("Failed to fetch metrics", error);
    } finally {
      setLoading(false);
    }
  };

  const showMetrics = (carId) => {
    setSelectedCarId(carId);
    fetchMetrics(carId);
  };

  const getChartData = () => {
    if (!metrics) return {};

    return {
      labels: [
        "Stock Acceleration Time",
        "Calculated Acceleration Time",
        "Stock Max Speed",
        "Calculated Max Speed",
        "Stock Horsepower",
        "Calculated Horsepower",
        "Stock Displacement",
        "Calculated Displacement",
        "Stock Max Torque",
        "Calculated Max Torque",
      ],
      datasets: [
        {
          label: "Metric Values",
          data: [
            metrics.metric1.stock_Acceleration_Time,
            metrics.metric1.calculated_Acceleration_Time,
            metrics.metric2.stock_Max_Speed_kph,
            metrics.metric2.calculated_max_Speed_Kph,
            metrics.metric3.stock_Horsepower,
            metrics.metric3.calculated_Horsepower,
            metrics.metric4.stock_Displacement_Cc,
            metrics.metric4.calculated_Displacement_Cc,
            metrics.metric5.stock_Max_Torque_Nm,
            metrics.metric5.calculated_Max_Torque_Nm,
          ].map(Number), // Convert data to numbers
          backgroundColor: "rgba(75, 192, 192, 0.9)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const getChartOptions = () => ({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Arial",
            weight: "bold",
          },
          color: "rgba(75, 192, 192, 1)", // Customize legend color
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw} ${context.dataset.label}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10, // Reduce font size
            family: "Arial",
            weight: "normal",
          },
          color: "#333", // Customize x-axis tick color
          maxRotation: 45, // Rotate labels if needed
          minRotation: 0,
          callback: (value) => {
            // Limit the length of the label and add ellipsis
            return value.length > 20 ? value.substring(0, 20) + "..." : value;
          },
        },
        grid: {
          display: false, // Hide grid lines for better label visibility
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
            family: "Arial",
            weight: "normal",
          },
          color: "#333", // Customize y-axis tick color
        },
        grid: {
          borderColor: "rgba(75, 192, 192, 0.2)", // Grid line color
          borderWidth: 1,
        },
      },
    },
    animation: {
      duration: 2000, // Duration of the animation in milliseconds
      easing: "easeInOutQuart", // Easing function
      delay: (context) => {
        // Delay animation based on index
        if (context.type === "data" && context.mode === "default") {
          return context.dataIndex * 100; // 100ms delay per data point
        }
        return 0;
      },
    },
  });

  return (
    <>
      <div className="flex items-center justify-center pt-6 pb-6">
        <div className="carousel w-64">
          {cars &&
            cars.map((car) => (
              <div className="carousel-item w-full" key={car._id}>
                <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-80 bg-zinc-800 text-gray-50 p-5">
                  <div className="">
                    <button
                      className="group-hover:scale-110 w-full h-60 bg-blue-400 duration-500"
                      onClick={() => showMetrics(car._id)}
                    >
                      <span className="text-sm font-semibold text-white group-hover:text-blue-500">
                        View Details
                      </span>
                    </button>
                    <div className="absolute w-56 left-0 p-5 -bottom-20 duration-500 group-hover:-translate-y-16">
                      <div className="absolute -z-10 left-0 w-64 h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900" />
                      <span className="text-xl font-bold">
                        {car.general.brand}
                      </span>
                      <p className="group-hover:opacity-100 w-56 duration-500 opacity-0">
                        {car.general.model}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {loading && <p>Loading metrics...</p>}

      {metrics && (
        <div className="metrics-chart">
          <h2>Metrics for Car ID: {selectedCarId}</h2>
          <Bar data={getChartData()} options={getChartOptions()} />
        </div>
      )}
    </>
  );
};

export default Metric;
