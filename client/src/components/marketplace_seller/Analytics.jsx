import { useTheme } from "@contexts/ThemeContext";
import { motion } from "framer-motion";
import React, {useState, useEffect} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Product } from "./Products/Product";
import Order from "./Orders/Order";
import { FiTrendingUp, FiPackage, FiShoppingBag, FiStar } from "react-icons/fi";
import axiosInstance from "@services/axios";
export default function Analytics() {
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B"];

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.get("seller/dashboard-stats");
      // console.log('data', data)
      // Validate data structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid data structure received");
      }

      // Process stats
      const processedStats = data.stats
        ? data.stats.map((stat, index) => ({
            ...stat,
            icon:
              index === 0
                ? FiTrendingUp
                : index === 1
                ? FiPackage
                : index === 2
                ? FiShoppingBag
                : FiStar,
            color:
              index === 0
                ? "text-emerald-500"
                : index === 1
                ? "text-blue-500"
                : index === 2
                ? "text-purple-500"
                : "text-yellow-500",
          }))
        : [];

      setStats(processedStats);

      // Handle sales data
      const safeSalesData =
        data.salesData && data.salesData.length > 0
          ? data.salesData
          : [
              { name: "Week 1", value: 0 },
              { name: "Week 2", value: 0 },
              { name: "Week 3", value: 0 },
              { name: "Week 4", value: 0 },
            ];
      setSalesData(safeSalesData);

      // Handle orders data
      const safeOrdersData =
        data.ordersData && data.ordersData.length > 0
          ? data.ordersData
          : [
              { name: "Mon", orders: 0 },
              { name: "Tue", orders: 0 },
              { name: "Wed", orders: 0 },
              { name: "Thu", orders: 0 },
              { name: "Fri", orders: 0 },
              { name: "Sat", orders: 0 },
              { name: "Sun", orders: 0 },
            ];
      setOrdersData(safeOrdersData);

      // Handle product categories
      const safeProductCategories =
        data.productCategories && data.productCategories.length > 0
          ? data.productCategories
          : [{ name: "No Categories", value: 1 }];
      setProductCategories(safeProductCategories);

      setIsLoading(false);
    } catch (fetchError) {
      console.error("Failed to fetch dashboard stats:", fetchError);
      setError(fetchError);

      // Set default states
      setStats([]);
      setSalesData([
        { name: "Week 1", value: 0 },
        { name: "Week 2", value: 0 },
        { name: "Week 3", value: 0 },
        { name: "Week 4", value: 0 },
      ]);
      setOrdersData([
        { name: "Mon", orders: 0 },
        { name: "Tue", orders: 0 },
        { name: "Wed", orders: 0 },
        { name: "Thu", orders: 0 },
        { name: "Fri", orders: 0 },
        { name: "Sat", orders: 0 },
        { name: "Sun", orders: 0 },
      ]);
      setProductCategories([{ name: "No Categories", value: 1 }]);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Error Rendering
  if (error) {
    return (
      <div
        className={`p-6 flex items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="text-center">
          <FiAlertTriangle className="mx-auto text-6xl text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Dashboard Loading Error</h2>
          <p className="text-gray-500 mb-4">
            Unable to load dashboard statistics
          </p>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div
        className={`p-6 flex items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 w-64 mb-4 rounded"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="h-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div
      className={`p-6 space-y-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}
    >
      {/* Dashboard Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-white/10" : "bg-blue-50"
            }`}
          >
            <FiTrendingUp
              className={`w-6 h-6 ${
                isDarkMode ? "text-blue-400" : "text-blue-500"
              }`}
            />
          </div>
          <div>
            <h2
              className={`text-2xl ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Dashboard Overview
            </h2>
          </div>
        </div>
        <div
          className={`px-4 py-2 rounded-lg ${
            isDarkMode ? "bg-white/10 backdrop-blur-sm" : "bg-gray-100"
          }`}
        >
          <span className="text-sm">Last 30 Days</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl ${
              isDarkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white"
            } shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-100"
                }`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  stat.isPositive
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm font-medium mb-2">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Performance Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-white/10" : "bg-purple-50"
            }`}
          >
            <FiPackage
              className={`w-6 h-6 ${
                isDarkMode ? "text-purple-400" : "text-purple-500"
              }`}
            />
          </div>
          <h2
            className={`text-2xl ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Performance Analytics
          </h2>
        </div>
        <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Detailed metrics and trends from the last 30 days
        </p>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl shadow-lg ${
            isDarkMode ? "bg-gray-800/50" : "bg-white"
          } p-6`}
        >
          <h3 className="text-xl font-bold mb-6">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={
                salesData.length === 0
                  ? [
                      { name: "Week 1", value: 0 },
                      { name: "Week 2", value: 0 },
                      { name: "Week 3", value: 0 },
                      { name: "Week 4", value: 0 },
                    ]
                  : salesData
              }
            >
              <defs>
                <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#374151" : "#E5E7EB"}
              />
              <XAxis
                dataKey="name"
                stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
              />
              <YAxis
                stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
                domain={[0, "dataMax + 10"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                  borderColor: isDarkMode ? "#374151" : "#E5E7EB",
                  color: isDarkMode ? "#FFFFFF" : "#000000",
                }}
              />
              {salesData.length === 0 ? (
                <Bar
                  dataKey="value"
                  fill="#10B981"
                  fillOpacity={0.2}
                  radius={[4, 4, 0, 0]}
                />
              ) : (
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#salesColor)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
          {salesData.length === 0 && (
            <div className="text-center mt-4 text-gray-500">
              No sales data available for the selected period
            </div>
          )}
        </motion.div>

        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-xl shadow-lg ${
            isDarkMode ? "bg-gray-800/50" : "bg-white"
          } p-6`}
        >
          <h3 className="text-xl font-bold mb-6">Weekly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#374151" : "#E5E7EB"}
              />
              <XAxis
                dataKey="name"
                stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
              />
              <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                  borderColor: isDarkMode ? "#374151" : "#E5E7EB",
                  color: isDarkMode ? "#FFFFFF" : "#000000",
                }}
              />
              <Bar dataKey="orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Product Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl shadow-lg ${
            isDarkMode ? "bg-gray-800/50" : "bg-white"
          } p-6`}
        >
          <h3 className="text-xl font-bold mb-6">Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {productCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                  borderColor: isDarkMode ? "#374151" : "#E5E7EB",
                  color: "#000000",
                }}
                itemStyle={{ color: "#000000" }}
              />
              <Legend
                formatter={(value, entry) => (
                  <span style={{ color: isDarkMode ? "#FFFFFF" : "#000000" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Customer Rating Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl shadow-lg ${
            isDarkMode ? "bg-gray-800/50" : "bg-white"
          } p-6`}
        >
          <h3 className="text-xl font-bold mb-6">Customer Rating Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { month: "Jan", rating: 4.5 },
                { month: "Feb", rating: 4.6 },
                { month: "Mar", rating: 4.7 },
                { month: "Apr", rating: 4.8 },
                { month: "May", rating: 4.8 },
              ]}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#374151" : "#E5E7EB"}
              />
              <XAxis
                dataKey="month"
                stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
              />
              <YAxis
                stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
                domain={[4, 5]}
                ticks={[4, 4.2, 4.4, 4.6, 4.8, 5]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                  borderColor: isDarkMode ? "#374151" : "#E5E7EB",
                  color: "#000000",
                }}
                itemStyle={{ color: "#000000" }}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{
                  stroke: "#F59E0B",
                  strokeWidth: 2,
                  r: 4,
                  fill: isDarkMode ? "#1F2937" : "#FFFFFF",
                }}
                activeDot={{
                  r: 6,
                  stroke: "#F59E0B",
                  strokeWidth: 2,
                  fill: "#F59E0B",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <Product type="analytics" />
      <Order type="analytics" />
    </div>
  );
}
