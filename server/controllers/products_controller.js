const Product = require('../models/product');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const cloudinary = require("../config/cloudinary_config");
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
    if (!image) {
        return res.status(400).json({ message: "No image provided" });
    }
    let imageUrlData = null;
    if (image) {
        const result = await cloudinary.uploader.upload(image, {
            folder: "products",
            width: 1200,
            crop: "scale",
        });
        imageUrlData = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }
    const product = await Product.create({
        seller: req.user._id,
        name,
        description,
        price,
        category,
        brand,
        stock,
        imageUrl: imageUrlData
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
    const pageSize = 9;
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
// const getProductById = asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//         .populate('seller', 'username email')
//         .lean();

//     if (!product) {
//         res.status(404);
//         throw new Error('Product not found');
//     }
//     res.json(product);
//     // Pagination and filtering for related products
//     const pageSize = 10; // Number of related products per page
//     const page = Number(req.query.page) || 1;

//     // Prepare filter conditions
//     const relatedFilter = {
//         $or: [
//             { category: product.category },
//             { seller: product.seller }
//         ],
//         _id: { $ne: product._id } // Exclude the current product
//     };

//     // Optional additional filters
//     const category = req.query.category
//         ? { category: req.query.category }
//         : {};
//     const brand = req.query.brand
//         ? { brand: req.query.brand }
//         : {};

//     // Combine all filters
//     const combinedFilter = {
//         ...relatedFilter,
//         ...category,
//         ...brand
//     };

//     // Count total related products
//     const count = await Product.countDocuments(combinedFilter);

//     // Fetch related products with pagination
//     const relatedProducts = await Product.find(combinedFilter)
//         .select('name price image category brand')
//         .limit(pageSize)
//         .skip(pageSize * (page - 1))
//         .sort('-createdAt')
//         .lean();

//     res.json({
//         product,
//         relatedProducts,
//         page,
//         pages: Math.ceil(count / pageSize),
//         total: count
//     });
// });

const searchProductById = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get id from query parameters

    if (!id) {
        res.status(400);
        throw new Error("Product ID is required");
    }

    // Find product by ID
    const product = await Product.findById(id)
        .populate("seller", "username email") // Include seller info
        .lean();

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.json({ product });
});

const getProductByIdFromSeller = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id }).populate('seller').lean()
    console.log('product', product)
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    res.json(product);
});
// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Seller
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        category,
        brand,
        stock,
        description,
        image, // base64 image string
    } = req.body;
    const productId = req.params.id;
    if (!image) {
        return res.status(400).json({ message: "No image provided" });
    }
    let imageUrlData = null;
    if (image) {
        const result = await cloudinary.uploader.upload(image, {
            folder: "products",
            width: 1200,
            crop: "scale",
        });
        imageUrlData = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }
    const product = await Product.findById({ _id: productId });

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Verify ownership
    if (product.seller.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to update this product');
    }

    product.name = name;
    product.description = description
    product.price = price
    product.category = category
    product.brand = brand
    product.stock = stock
    product.image = image
    product.imageUrl = imageUrlData
    await product.save();
    res.json({
        success: true,
        message: 'Product updated successfully',
    });
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
    try {
        const pageSize = 9;
        const page = Number(req.query.page) || 1;

        if (!req.user?._id) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const count = await Product.countDocuments({ seller: req.user._id });
        const products = await Product.find({ seller: req.user._id })
            .populate('seller', 'username email')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort('-createdAt');

        res.json({
            products,
            page,
            pages: Math.ceil(count / pageSize),
            total: count,
        });
    } catch (error) {
        console.error('Error in getSellerProducts:', error);
        res.status(500).json({ message: 'Failed to fetch seller products' });
    }
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
    // getProductById,
    updateProduct,
    deleteProduct,
    getSellerProducts,
    updateStock,
    getProductByIdFromSeller,
    searchProductById,
};