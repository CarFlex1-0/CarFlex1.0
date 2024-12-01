const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },
    product: [{
        prod: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number }
    }],
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
    orderDate:{type:Date, default: Date.now}
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
