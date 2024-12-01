const Product = require('../models/product');
const Order = require('../models/order');
// const User = require('../models/user');
const asyncHandler = require('express-async-handler');
// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getOrdersBySeller = asyncHandler(async (req, res) => {
    // const {sellerId} = req.body;
    const sellerId = "6742c9fe1b0bae6853c170f2"
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const filter = {
        seller: { $in: sellerId }
    };

    // Add status filter if provided
    if (req.query.status) {
        filter.orderStatus = req.query.status;
    }

    const count = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
        .populate('buyer', 'username')
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort('-createdAt');


    res.json({
        orders,
        page,
        pages: Math.ceil(count / pageSize),
        total: count
    });
});

const getOrdersByBuyers = asyncHandler(async (req, res) => {
    // const {buyerId} = req.body;
    const buyerId = "66ec5fb01bca199ffe10c6c2"
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const filter = {
        buyer: { $in: buyerId }
    };

    // Add status filter if provided
    if (req.query.status) {
        filter.orderStatus = req.query.status;
    }

    const count = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
        .populate('seller', 'username')
        .populate("product.prod", "name imageUrl.url") // Populate product name and image
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort('-createdAt');


    res.json({
        orders,
        page,
        pages: Math.ceil(count / pageSize),
        total: count
    });
});
// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate input
    if (!id) {
        return res.status(400).json({ message: "Order ID is required" });
    }

    try {
        // Find the order and populate related fields
        const order = await Order.findById(id)
            .populate('buyer', 'username email')
            .populate('seller', 'username')
            .populate({
                path: 'product.prod',
                select: 'name price image' // Populate product details
            });

        // If order not found
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            order,
            message: "Order retrieved successfully"
        });

    } catch (error) {
        // Handle potential errors (e.g., invalid ObjectId)
        res.status(500).json({
            message: "Error retrieving order",
            error: error.message
        });
    }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    try {
        const { orderId } = req.params;
        const { newStatus } = req.body;

        // Validate the new status
        const validStatuses = ['pending', 'shipped', 'delivered', "cancelled"];
        if (!validStatuses.includes(newStatus)) {
            return res.status(400).json({
                message: 'Invalid order status',
                validStatuses: validStatuses
            });
        }

        // Find and update the order
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { orderStatus: newStatus },
            { new: true } // Return the updated document
        );

        // Check if order exists
        if (!updatedOrder) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        // Respond with the updated order
        res.status(200).json({
            message: 'Order status updated successfully',
            order: updatedOrder
        });

    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
})


// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Seller
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Verify ownership
    if (product.seller.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to delete this product');
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
});

// @desc    Get seller's products
// @route   GET /api/products/seller/:sellerId
// @access  Public
const getSellerProducts = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const count = await Product.countDocuments({ seller: req.params.sellerId });
    const products = await Product.find({ seller: req.params.sellerId })
        .populate('seller', 'username email')
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort('-createdAt');

    res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
        total: count
    });
});

// @desc    Update product stock
// @route   PATCH /api/products/:id/stock
// @access  Private/Seller
const updateStock = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Verify ownership
    if (product.seller.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to update this product');
    }

    product.stock = req.body.stock;
    if (product.stock === 0) {
        product.status = 'sold';
    } else {
        product.status = 'available';
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
});

module.exports = {
    getOrdersBySeller,
    getOrdersByBuyers,
    getOrderById,
    updateOrderStatus,
};