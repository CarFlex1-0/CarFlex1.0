const express = require('express');
const router = express.Router();
const { protect, seller } = require('../middlewares/authenticate');
const {
    getOrders,
    getOrderById,
    updateOrderStatus,
} = require('../controllers/order_controller');

// Public routes
router.get('/', getOrders);
router.get('/:id', getOrderById);
// // router.get('/seller/:sellerId', getSellerProducts);

// // Protected routes (require authentication)
// router.post('/create-product', createProduct);
// // router.put('/:id', protect, seller, updateProduct);
// router.get('/seller-specific-product/:id', getProductByIdFromSeller);
// router.put('/:id', updateProduct);
// router.delete('/:id', protect, seller, deleteProduct);
// router.patch('/:id/stock', protect, seller, updateStock);

// router.patch('/update-status/:orderId', protect, seller, updateOrderStatus);
router.patch('/update-status/:orderId', updateOrderStatus);
module.exports = router;