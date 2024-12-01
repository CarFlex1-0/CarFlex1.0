const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },
    product: [{
        prodId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
       
        quantity: { type: Number }
    }],
    amount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
    payoutStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    holdUntil: { type: Date, required: true },
    paymentIntent: { type: String }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
