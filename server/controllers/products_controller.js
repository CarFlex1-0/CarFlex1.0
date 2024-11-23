// controllers/productController.js

const Product = require("../models/product");

// Create Product (Seller Only)
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, brand, stock,  image } = req.body;
        const seller = "66e546c813eb5f50654bc8d0";

        const product = new Product({
            seller,
            name,
            description,
            price,
            category,
            brand,
            stock,
            image,
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: "available" });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
