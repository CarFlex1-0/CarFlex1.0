const express = require('express');
const Subscription = require('../models/subscription');
const router = express.Router();

router.get('/subscriptions', async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.json(subscriptions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
