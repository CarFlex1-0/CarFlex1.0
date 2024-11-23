// routes/productRoutes.js

const express = require("express");
const { createProduct, getProducts, getProductById } = require("../controllers/products_controller");
// const { authMiddleware, sellerMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// router.post("/", authMiddleware, sellerMiddleware, createProduct);
router.post("/create-product",  createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
