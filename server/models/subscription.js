const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stripePriceId: { type: String, required: true }, // ID from Stripe
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
