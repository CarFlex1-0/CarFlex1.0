const express = require('express');
const router = express.Router();
const { protect, seller } = require('../middlewares/authenticate');
const {
    getOrdersBySeller,
    getOrderById,
    updateOrderStatus,
    getOrdersByBuyers,
} = require('../controllers/order_controller');

// Public routes
router.get('/seller-orders', getOrdersBySeller);
router.get('/buyer-orders', getOrdersByBuyers);
router.get('/:id', getOrderById);

// Protected routes (require authentication)
// router.patch('/update-status/:orderId', protect, seller, updateOrderStatus);
router.patch('/update-status/:orderId', updateOrderStatus);

module.exports = router;