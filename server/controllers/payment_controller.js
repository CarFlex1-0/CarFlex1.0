const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const User = require('../models/user');

exports.createPayment = async (req, res) => {
    const { priceId, userId, planName } = req.body; // Only get priceId

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId, // Use priceId here
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/failure`,
            metadata: {
                userId,  // Store userId to associate with the payment
                planName,  // Store the subscription plan
            },
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.checkPaymentStatus = async (req, res) => {
    const { sessionId, userId } = req.body;

    try {
        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // Define the subscription duration (e.g., 30 days)
            const activationDate = new Date();
            const expirationDate = new Date();
            expirationDate.setDate(activationDate.getDate() + 30); // Example for a 30-day subscription

            // Update the user's subscription status
            await User.findByIdAndUpdate(userId, {
                $set: {
                    'subscription.subscriptionPlan': session.metadata.planName, // Set plan name
                    'subscription.subscriptionStatus': 'active', // Set status as active
                    'subscription.activationDate': activationDate, // Set activation date
                    'subscription.expirationDate': expirationDate, // Set expiration date
                },
            });

            res.json({ status: 'success', message: 'Payment successful and user updated' });
        } else {
            res.json({ status: 'pending', message: 'Payment not yet confirmed' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
