const express = require('express');
const router = express.Router();
const { protect, seller } = require('../middlewares/authenticate');
const {
    createProduct,
    getProducts,
    searchProductById,
    getProductById,
    updateProduct,
    deleteProduct,
    getSellerProducts,
    updateStock,
    getProductByIdFromSeller
} = require('../controllers/products_controller');

// Public routes
router.get('/', getProducts);
router.get('/:id', searchProductById);
// router.get('/seller/:sellerId', getSellerProducts);

// Protected routes (require authentication)
router.post('/create-product', createProduct);
// router.put('/:id', protect, seller, updateProduct);
router.get('/seller-specific-product/:id', getProductByIdFromSeller);
router.put('/:id', updateProduct);
// router.delete('/:id', protect, seller, deleteProduct);
router.delete('/:id', deleteProduct);
// router.patch('/:id/stock', protect, seller, updateStock);
router.patch('/:id/stock',  updateStock);

module.exports = router;