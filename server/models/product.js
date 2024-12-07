const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    isActive:{type:Boolean, default:true},
    status: { type: String, enum: ["available", "sold"], default: "available" },
    imageUrl: {
        url: String,
        public_id: String,
    },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
