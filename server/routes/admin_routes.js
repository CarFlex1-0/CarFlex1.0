const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');
const { authenticateToken } = require('../middlewares/authenticate');

// Protected admin routes
router.use(authenticateToken);

// Dashboard Overview
router.get('/dashboard/progress-cards', adminController.getProgressCards);

// Product Analytics
router.get('/analytics/products-by-category', adminController.getProductsByCategory);
router.get('/analytics/order-status', adminController.getOrderStatusByCategory);

// Financial Analytics
router.get('/analytics/monthly-profit', adminController.getMonthlyProfit);
router.get('/analytics/carflex-revenue', adminController.getCarFlexRevenue);

// AI Analytics
router.get('/analytics/ai-usage', adminController.getAIAnalytics);

// Community Analytics
router.get('/analytics/forum-activity', adminController.getForumAnalytics);
router.get('/analytics/blog-activity', adminController.getBlogAnalytics);

// User Analytics
router.get('/analytics/user-roles', adminController.getUserRoleDistribution);

module.exports = router; 