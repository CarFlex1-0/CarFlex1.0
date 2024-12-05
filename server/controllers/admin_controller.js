const User = require('../models/user');
const Blog = require('../models/blog');
const Product = require('../models/product');
const Order = require('../models/order');
const Forum = require('../models/forum');
const Chat = require('../models/chat');
const asyncHandler = require('express-async-handler');

// Progress Cards Data
exports.getProgressCards = asyncHandler(async (req, res) => {
    const [totalBlogs, totalUsers, totalProducts, totalOrders] = await Promise.all([
        Blog.countDocuments(),
        User.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments()
    ]);

    const totalSales = await Order.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$totalAmount" }
            }
        }
    ]);

    res.json({
        totalBlogs,
        totalUsers,
        totalProducts,
        totalSales: totalSales[0]?.total || 0
    });
});

// Products by Category
exports.getProductsByCategory = asyncHandler(async (req, res) => {
    const categoryData = await Product.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);

    res.json(categoryData);
});

// Order Status by Category
exports.getOrderStatusByCategory = asyncHandler(async (req, res) => {
    const orderStatusData = await Order.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'product.prod',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $unwind: '$productDetails'
        },
        {
            $group: {
                _id: {
                    category: '$productDetails.category',
                    status: '$orderStatus'
                },
                count: { $sum: 1 }
            }
        }
    ]);

    res.json(orderStatusData);
});

// Monthly Profit Analysis
exports.getMonthlyProfit = asyncHandler(async (req, res) => {
    const monthlyData = await Order.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$orderDate" },
                    month: { $month: "$orderDate" }
                },
                totalSales: { $sum: "$totalAmount" }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 }
        }
    ]);

    res.json(monthlyData);
});

// CarFlex Revenue (10% of sales)
exports.getCarFlexRevenue = asyncHandler(async (req, res) => {
    const revenue = await Order.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$orderDate" },
                    month: { $month: "$orderDate" }
                },
                totalRevenue: { 
                    $sum: { $multiply: ["$totalAmount", 0.1] } // 10% of sales
                }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 }
        }
    ]);

    res.json(revenue);
});

// AI Analytics
exports.getAIAnalytics = asyncHandler(async (req, res) => {
    const aiUsageData = await Chat.aggregate([
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                },
                totalInteractions: { $sum: 1 },
                uniqueUsers: { $addToSet: "$user" }
            }
        },
        {
            $project: {
                date: "$_id.date",
                totalInteractions: 1,
                uniqueUsers: { $size: "$uniqueUsers" }
            }
        },
        {
            $sort: { date: -1 }
        }
    ]);

    res.json(aiUsageData);
});

// Forum Analytics
exports.getForumAnalytics = asyncHandler(async (req, res) => {
    // Forums created per date
    const forumTrends = await Forum.aggregate([
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.date": -1 } }
    ]);

    // Top 5 most active forums
    const topForums = await Forum.aggregate([
        {
            $project: {
                title: 1,
                content: 1,
                likes: 1,
                commentCount: { $size: "$commentId" }
            }
        },
        {
            $sort: { likes: -1, commentCount: -1 }
        },
        {
            $limit: 5
        }
    ]);

    res.json({
        trends: forumTrends,
        topForums
    });
});

// Blog Analytics
exports.getBlogAnalytics = asyncHandler(async (req, res) => {
    // Blogs created per date
    const blogTrends = await Blog.aggregate([
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.date": -1 } }
    ]);

    // Top 5 most liked blogs
    const topBlogs = await Blog.aggregate([
        {
            $sort: { "likes.likesCount": -1 }
        },
        {
            $limit: 5
        },
        {
            $project: {
                title: 1,
                subtitle: 1,
                likesCount: "$likes.likesCount",
                author: 1
            }
        }
    ]);

    res.json({
        trends: blogTrends,
        topBlogs
    });
});

// User Role Distribution
exports.getUserRoleDistribution = asyncHandler(async (req, res) => {
    const roleDistribution = await User.aggregate([
        {
            $group: {
                _id: null,
                totalUsers: { $sum: 1 },
                enthusiasts: {
                    $sum: {
                        $cond: [
                            { $and: [
                                { $eq: ["$isAdmin", false] },
                                { $eq: ["$isSeller", false] }
                            ]},
                            1,
                            0
                        ]
                    }
                },
                sellers: { $sum: { $cond: ["$isSeller", 1, 0] } },
                admins: { $sum: { $cond: ["$isAdmin", 1, 0] } }
            }
        },
        {
            $project: {
                _id: 0,
                distribution: {
                    enthusiasts: "$enthusiasts",
                    sellers: "$sellers",
                    admins: "$admins"
                },
                total: "$totalUsers"
            }
        }
    ]);

    res.json(roleDistribution[0]);
}); 