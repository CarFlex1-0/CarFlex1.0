import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { FaUserCircle } from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import DashboardHeader from "./DashboardHeader";
import Footer from "./Footer";
import { useAuth } from "@contexts/auth_context";
import {  Typography } from "@material-tailwind/react";

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
  const {drawerState} = useAuth()
  return (
    <div className={drawerState ? "blur bg-blue-950" : ""}>
      {/* Header */}
      <DashboardHeader title={"Admin Dashboard"} />

      {/* Summary Cards */}
      <div className="p-4">
        <Typography variant="h5" className="text-white mb-2 ms-8">
          CarFlex Stats
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-5">
          <SummaryCard
            title="Total Blogs"
            value="1,350"
            icon={<FaUserCircle />}
            percentage={70} // Example percentage
          />
          <SummaryCard
            title="New Users"
            value="350"
            icon={<FaUserCircle />}
            percentage={50} // Example percentage
          />
          <SummaryCard
            title="Active Subscriptions"
            value="2,400"
            icon={<FaUserCircle />}
            percentage={90} // Example percentage
          />
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="p-4">
        <Typography variant="h5" className="text-white ms-8">
          Subscriptions and Blogs
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 p-4 mx-5">
        <div className="col-span-2">
          <LineChart />
        </div>
        <BarChart
          data={blogsData}
          categories={chartCategories}
          barColor={"#facc15"}
          headerText={"Recently uploaded blogs on CarFlex."}
          heading={"Blogs Analytics"}
        />
      </div>


      <div className="p-4">
        <Typography variant="h5" className="text-white ms-8">
          Users and AI Generated Responses
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 p-4 mx-5">
        <BarChart
          data={usersData}
          categories={chartCategories}
          barColor={"#fb7185"}
          headerText={"Recently registered Users on CarFlex."}
          heading={"Users Registered"}
        />
        {/* <AreaChartComponent /> */}
        <div className="col-span-2">
          <PieChart />
        </div>
        {/* <ProgressBar /> */}
      </div>
      {/* Copyright Claim */}
      <Footer />
    </div>
  );
}
