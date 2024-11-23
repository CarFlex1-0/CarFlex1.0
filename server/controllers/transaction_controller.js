// controllers/transactionController.js

const Transaction = require("../models/transaction");
const Product = require("../models/product");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create Transaction (Purchase)
exports.createTransaction = async (req, res) => {
    try {
        const { cart } = req.body;
        console.log('cart', cart);
        let totalAmount = 0;

        for (const product of cart) {
            // Check for product status before calculating totalAmount
            if (!product || product.status === "sold") {
                return res.status(400).json({
                    message: "Product unavailable or already sold",
                    soldProduct: product
                });
            }

            totalAmount += product.quantity * product.price;
            console.log('product.price', product.price);
        }

        console.log('totalAmount', totalAmount);

        // Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // Stripe expects the amount in cents
            currency: "PKR",
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        });

        // Send the client secret back to the client
        return res.status(201).json({
            clientSecret: paymentIntent.client_secret,
            message: "Transaction successful",
            transaction: {} // Include the transaction data as needed
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


// Confirm Payment and Save Transaction
exports.confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId, user, cartId } = req.body;

        // Retrieve the PaymentIntent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // Save the transaction in your DB
            const transaction = new Transaction({
                products: cartId,
                buyer: user._id,
                amount: paymentIntent.amount / 100,
                paymentStatus: 'completed',
                paymentIntent: paymentIntentId,
                payoutStatus: 'pending',
                holdUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days hold
            });

            await transaction.save();

            res.json({ success: true, message: 'Transaction saved successfully.' });
        } else {
            res.status(400).json({ success: false, message: 'Payment not completed.' });
        }
    } catch (error) {
        console.error('Error saving transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Payout Transaction (Admin/Auto-trigger after 3 days)
exports.payoutTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate("product");

        if (!transaction || transaction.payoutStatus === "paid") {
            return res.status(400).json({ message: "Transaction not found or already paid" });
        }

        if (new Date() < transaction.holdUntil) {
            return res.status(403).json({ message: "Hold period not yet completed" });
        }

        // Perform payout logic
        transaction.payoutStatus = "paid";
        await transaction.save();

        res.json({ message: "Payout successful", transaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
