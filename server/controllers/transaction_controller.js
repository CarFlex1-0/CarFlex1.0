// controllers/transactionController.js

const Transaction = require("../models/transaction");
const Product = require("../models/product");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
// Create Transaction (Purchase)
exports.createTransaction = async (req, res) => {
    try {
        // Validate request body
        const { cart } = req.body;

        // Check if cart is empty or not an array
        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({
                message: "Invalid cart. Please provide a non-empty cart array.",
                error: "EMPTY_CART"
            });
        }

        let totalAmount = 0;
        const invalidProducts = [];

        // Validate each product in the cart
        for (const product of cart) {
            // Check if product is valid
            if (!product) {
                invalidProducts.push({
                    message: "Invalid product object",
                    details: product
                });
                continue;
            }

            // Check product status
            if (product.status === "sold") {
                invalidProducts.push({
                    message: "Product already sold",
                    productId: product.id,
                    productName: product.name
                });
                continue;
            }

            // Validate quantity
            if (!product.quantity || product.quantity <= 0) {
                invalidProducts.push({
                    message: "Invalid product quantity",
                    productId: product.id,
                    productName: product.name,
                    quantity: product.quantity
                });
                continue;
            }

            // Validate price
            if (!product.price || product.price < 0) {
                invalidProducts.push({
                    message: "Invalid product price",
                    productId: product.id,
                    productName: product.name,
                    price: product.price
                });
                continue;
            }

            // Calculate total amount
            totalAmount += product.quantity * product.price;
        }

        // Check if there are any invalid products
        if (invalidProducts.length > 0) {
            return res.status(400).json({
                message: "One or more products in the cart are invalid",
                invalidProducts,
                error: "INVALID_PRODUCTS"
            });
        }

        // Validate total amount
        if (totalAmount <= 0) {
            return res.status(400).json({
                message: "Total transaction amount must be greater than zero",
                totalAmount,
                error: "INVALID_TOTAL_AMOUNT"
            });
        }

        // Create Stripe Payment Intent with additional error handling
        let paymentIntent;
        try {
            paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(totalAmount * 100), // Ensure amount is an integer
                currency: "PKR",
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: 'never',
                },
            });
        } catch (stripeError) {
            console.error('Stripe Payment Intent Error:', stripeError);
            return res.status(502).json({
                message: "Payment processing failed",
                error: "STRIPE_PAYMENT_ERROR",
                details: stripeError.message
            });
        }

        // Send the client secret back to the client
        return res.status(201).json({
            clientSecret: paymentIntent.client_secret,
            message: "Transaction initiated successfully",
            totalAmount,
            transactionDetails: {
                products: cart.map(product => ({
                    id: product.id,
                    name: product.name,
                    quantity: product.quantity,
                    price: product.price
                }))
            }
        });

    } catch (error) {
        console.error('Transaction Creation Error:', error);
        return res.status(500).json({
            message: "Internal server error during transaction creation",
            error: "SERVER_ERROR",
            details: error.message
        });
    }
};

// Confirm Payment and Save Transaction
exports.confirmPayment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { paymentIntentId, user, cart } = req.body;

        // Retrieve the PaymentIntent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // Prepare transaction data
            const transactionData = {
                buyer: user._id,
                product: cart.map(item => ({
                    prodId: item._id,
                    quantity: item.quantity
                })),
                amount: paymentIntent.amount / 100,
                paymentStatus: 'completed',
                paymentIntent: paymentIntentId,
                payoutStatus: 'pending',
                holdUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days hold
            };

            // Create an array to store update operations
            const updateOperations = cart.map(item => ({
                updateOne: {
                    filter: { _id: item._id },
                    update: {
                        $inc: { stock: -item.quantity },
                    }
                }
            }));

            // Perform multiple operations in a transaction
            const [transaction] = await Promise.all([
                Transaction.create([transactionData], { session }),
                Product.bulkWrite(updateOperations, { session })
            ]);

            // Commit the transaction
            await session.commitTransaction();

            res.json({
                success: true,
                message: 'Transaction saved successfully.',
                transaction: transaction[0]
            });
        } else {
            await session.abortTransaction();
            res.status(400).json({ success: false, message: 'Payment not completed.' });
        }
    } catch (error) {
        // Abort the transaction in case of any error
        await session.abortTransaction();
        console.error('Error saving transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    } finally {
        // End the session
        session.endSession();
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
