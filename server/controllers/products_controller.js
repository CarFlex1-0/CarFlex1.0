const Product = require('../models/product');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Seller
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        category,
        brand,
        stock,
        image
    } = req.body;

    // Verify the user is a seller
    if (!req.user.isSeller) {
        res.status(403);
        throw new Error('Only sellers can create products');
    }

    const product = await Product.create({
        seller: req.user._id,
        name,
        description,
        price,
        category,
        brand,
        stock,
        image
    });

    if (product) {
        res.status(201).json(product);
    } else {
        res.status(400);
        throw new Error('Invalid product data');
    }
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        }
        : {};

    const category = req.query.category ? { category: req.query.category } : {};
    const brand = req.query.brand ? { brand: req.query.brand } : {};

    const count = await Product.countDocuments({ ...keyword, ...category, ...brand });
    const products = await Product.find({ ...keyword, ...category, ...brand })
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

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate('seller', 'username email');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Seller
const updateProduct = asyncHandler(async (req, res) => {
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

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name || product.name,
            description: req.body.description || product.description,
            price: req.body.price || product.price,
            category: req.body.category || product.category,
            brand: req.body.brand || product.brand,
            stock: req.body.stock || product.stock,
            image: req.body.image || product.image,
            status: req.body.status || product.status
        },
        {
            new: true,
            runValidators: true
        }
    );

    res.json(updatedProduct);
});

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
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getSellerProducts,
    updateStock
};