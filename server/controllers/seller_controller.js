const Product = require("../models/product");
const Order = require("../models/order");
const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

const getDashboardStats = async (req, res) => {
    try {
        const sellerId = "6742c9fe1b0bae6853c170f2"; // Hardcoded for now, replace with actual authenticated seller

        // Total Sales (Revenue)
        const totalSales = await Transaction.aggregate([
            { $match: { seller: sellerId, paymentStatus: 'completed' } },
            { $group: { _id: null, total: { $sum: 'Rs. amount' } } }
        ]);

        // Total Products
        const totalProducts = await Product.countDocuments({ seller: sellerId });

        // Total Orders
        const totalOrders = await Order.countDocuments({ seller: sellerId });

        // Order Trend for Last 30 Days
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const orderTrend = await Order.aggregate([
            {
                $match: {
                    seller: sellerId,
                    orderDate: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$orderDate" },
                    orders: { $sum: 1 }
                }
            }
        ]);

        // Transform orderTrend to match frontend expectations
        const daysOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const formattedOrderTrend = orderTrend.map(item => ({
            name: daysOrder[item._id - 1],
            orders: item.orders
        }));

        // Sales Trend for Weekly Sales
        const weeklySales = await Transaction.aggregate([
            {
                $match: {
                    seller: sellerId,
                    paymentStatus: 'completed',
                    createdAt: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $week: "$createdAt" },
                    totalSales: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Transform weeklySales to match frontend expectations
        const formattedWeeklySales = weeklySales.map((week, index) => ({
            name: `Week ${index + 1}`,
            value: week.totalSales
        }));

        // Product Categories Distribution
        const productCategories = await Product.aggregate([
            { $match: { seller: sellerId } },
            {
                $group: {
                    _id: "$category",
                    value: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    value: 1
                }
            }
        ]);

        // Customer Ratings Trend (Monthly)
        const customerRatings = await Order.aggregate([
            { $match: { seller: sellerId } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$orderDate" } },
                    rating: { $avg: "$rating" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            stats: [
                {
                    title: "Total Sales",
                    value: `$${totalSales[0]?.total || 0}`,
                    change: "+12.5%",
                    isPositive: true,
                    icon: "FiTrendingUp"
                },
                {
                    title: "Total Products",
                    value: totalProducts,
                    change: "+5%",
                    isPositive: true,
                    icon: "FiPackage"
                },
                {
                    title: "Total Orders",
                    value: totalOrders,
                    change: "-2%",
                    isPositive: false,
                    icon: "FiShoppingBag"
                },
                {
                    title: "Customer Rating",
                    value: "4.7",
                    change: "+0.1",
                    isPositive: true,
                    icon: "FiStar"
                }
            ],
            ordersData: formattedOrderTrend,
            salesData: formattedWeeklySales,
            productCategories
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard stats", error });
    }
};
const productsOverview = async (req, res) => {
    try {
        const sellerId = req.user._id;
        const products = await Product.find({ seller: sellerId })
            .sort({ createdAt: -1 })
            .limit(10);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
}

// Orders Overview API
const ordersOverview = async (req, res) => {
    try {
        const sellerId = req.user._id;
        const orders = await Order.find({ seller: sellerId })
            .populate('product.prod')
            .sort({ orderDate: -1 })
            .limit(10);

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};


module.exports = { getDashboardStats, ordersOverview, productsOverview };
