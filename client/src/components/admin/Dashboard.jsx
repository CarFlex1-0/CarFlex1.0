import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import {
  FaUserCircle,
  FaChartLine,
  FaUsers,
  FaRobot,
  FaBlog,
  FaChartBar,
  FaChartPie,
} from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import DashboardHeader from "./DashboardHeader";
import Footer from "./Footer";
import { useAuth } from "@contexts/auth_context";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 p-4 mb-6 border-b border-indigo-300/20">
    <div className="p-3 rounded-full bg-indigo-500/10">
      <Icon className="w-6 h-6 text-indigo-500" />
    </div>
    <Typography variant="h5" className="text-white font-bold">
      {title}
    </Typography>
  </div>
);

export default function AdminDashboardAnalytics() {
  const blogsData = [50, 40, 300, 320, 500, 350, 200, 230, 500];
  const usersData = [50, 40, 300, 320, 500, 350, 200, 230, 500];
  const chartCategories = [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { drawerState } = useAuth();
  return (
    <div className={drawerState ? "blur" : ""}>
      <DashboardHeader title={"Admin Dashboard"} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Section */}
        <div className="mb-12">
          <SectionHeader icon={FaChartLine} title="CarFlex Stats" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SummaryCard
                title="Total Blogs"
                value="1,350"
                icon={<FaBlog className="text-blue-500" />}
                percentage={70}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SummaryCard
                title="New Users"
                value="350"
                icon={<FaUsers className="text-emerald-500" />}
                percentage={50}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SummaryCard
                title="Active Subscriptions"
                value="2,400"
                icon={<FaChartLine className="text-purple-500" />}
                percentage={90}
              />
            </motion.div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-12">
          <SectionHeader icon={FaChartPie} title="Analytics Overview" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 p-6 bg-gray-800/30 border border-indigo-300/20 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Monthly Trends</h3>
              <LineChart />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 bg-gray-800/30 border border-indigo-300/20 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Blog Analytics</h3>
              <BarChart
                data={blogsData}
                categories={chartCategories}
                barColor={"#facc15"}
                headerText={"Recently uploaded blogs"}
                heading={"Blogs Analytics"}
              />
            </motion.div>
          </div>
        </div>

        {/* User Analytics Section */}
        <div className="mb-12">
          <SectionHeader icon={FaRobot} title="AI & User Analytics" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 bg-gray-800/30 border border-indigo-300/20 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
              <BarChart
                data={usersData}
                categories={chartCategories}
                barColor={"#fb7185"}
                headerText={"New user registrations"}
                heading={"Users Registered"}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 p-6 bg-gray-800/30 border border-indigo-300/20 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">AI Response Distribution</h3>
              <PieChart />
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
