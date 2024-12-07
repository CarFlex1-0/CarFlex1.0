import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaRobot,
  FaBlog,
  FaShoppingCart,
  FaComments,
  FaDollarSign,
  FaChartBar,
} from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import DashboardHeader from "./DashboardHeader";
import Footer from "./Footer";
import { useAuth } from "@contexts/auth_context";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import axios from "@services/axios";
import AreaChartComponent from "./AreaChart";
import FeedbackChart from "./FeedbackChart";
import BlogAnalyticsChart from "./BlogAnalyticsChart";
import AIResponseChart from "./AIResponseChart";
import BarChart from "./BarChart";

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
  const [progressCards, setProgressCards] = useState(null);
  const [productCategories, setProductCategories] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [monthlyProfit, setMonthlyProfit] = useState([]);
  const [carflexRevenue, setCarflexRevenue] = useState([]);
  const [aiAnalytics, setAiAnalytics] = useState([]);
  const [forumActivity, setForumActivity] = useState(null);
  const [blogActivity, setBlogActivity] = useState(null);
  const [userRoles, setUserRoles] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const { drawerState } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [
          progressData,
          productsData,
          ordersData,
          profitData,
          revenueData,
          aiData,
          forumData,
          blogData,
          rolesData,
          feedbackData,
        ] = await Promise.all([
          axios.get("/admin/dashboard/progress-cards", config),
          axios.get("/admin/analytics/products-by-category", config),
          axios.get("/admin/analytics/order-status", config),
          axios.get("/admin/analytics/monthly-profit", config),
          axios.get("/admin/analytics/carflex-revenue", config),
          axios.get("/admin/analytics/ai-usage", config),
          axios.get("/admin/analytics/forum-activity", config),
          axios.get("/admin/analytics/blog-activity", config),
          axios.get("/admin/analytics/user-roles", config),
          axios.get("/feedback", config),
        ]);

        setProgressCards(progressData.data);
        setProductCategories(productsData.data);
        setOrderStatus(ordersData.data);
        setMonthlyProfit(profitData.data);
        setCarflexRevenue(revenueData.data);
        setAiAnalytics(aiData.data);
        setForumActivity(forumData.data);
        setBlogActivity(blogData.data);
        setUserRoles(rolesData.data);
        setFeedback(feedbackData.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Format currency in PKR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Transform revenue data for Area Chart
  const transformRevenueData = () => {
    return monthlyProfit.map(item => ({
      date: `${item._id.month}/${item._id.year}`,
      revenue: item.totalSales,
      commission: item.totalSales * 0.1
    }));
  };

  return (
    <div className={drawerState ? "blur" : ""}>
      <DashboardHeader title={"Admin Dashboard"} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Progress Cards */}
        <div className="mb-12">
          <SectionHeader icon={FaChartLine} title="Overview" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Total Users",
                value: progressCards?.totalUsers || 0,
                icon: <FaUsers />,
                percentage: 85,
              },
              {
                title: "Total Products",
                value: progressCards?.totalProducts || 0,
                icon: <FaShoppingCart />,
                percentage: 75,
              },
              {
                title: "Total Blogs",
                value: progressCards?.totalBlogs || 0,
                icon: <FaBlog />,
                percentage: 90,
              },
              {
                title: "Total Sales",
                value: formatCurrency(progressCards?.totalSales || 0),
                icon: <FaDollarSign />,
                percentage: 95,
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SummaryCard {...card} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="mb-12">
          <SectionHeader icon={FaDollarSign} title="Revenue Analytics" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AreaChartComponent
              data={transformRevenueData()}
              title="Revenue & Commission Trends"
              description="Monthly revenue and CarFlex commission analysis"
            />
          </motion.div>
        </div>

        {/* Products by Category */}
        <div className="mb-12">
          <SectionHeader icon={FaChartBar} title="Product Analytics" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <BarChart
                data={productCategories.map(cat => cat.count)}
                categories={productCategories.map(cat => cat._id)}
                barColor="#4CAF50"
                heading="Items per Category"
                headerText="Distribution of products across categories"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <BarChart
                data={orderStatus.map(status => status.count)}
                categories={orderStatus.map(status => status._id.status)}
                barColor="#3B82F6"
                heading="Order Status"
                headerText="Current status of orders"
              />
            </motion.div>
          </div>
        </div>

        {/* Blog Analytics */}
        <div className="mb-12">
          <SectionHeader icon={FaBlog} title="Blog Analytics" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BlogAnalyticsChart
              trends={blogActivity?.trends || []}
              topBlogs={blogActivity?.topBlogs || []}
            />
          </motion.div>
        </div>

        {/* Feedback Analysis */}
        <div className="mb-12">
          <SectionHeader icon={FaComments} title="Feedback Analysis" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FeedbackChart
              feedbackData={feedback}
              recentFeedback={feedback.slice(0, 5)}
            />
          </motion.div>
        </div>

        {/* AI Analytics */}
        <div className="mb-12">
          <SectionHeader icon={FaRobot} title="AI Analytics" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AIResponseChart
              data={{
                generated: aiAnalytics.reduce((sum, item) => sum + item.totalInteractions, 0),
                failed: Math.floor(Math.random() * 5), // Replace with actual failed attempts
                expected: aiAnalytics.reduce((sum, item) => sum + item.uniqueUsers, 0)
              }}
            />
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
