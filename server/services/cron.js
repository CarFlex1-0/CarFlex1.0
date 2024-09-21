const cron = require('node-cron');
const User = require('../models/user');
const sendExpirationEmail = require('../services/expiration_email')
// Schedule a cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily subscription expiration check...');

    try {
        // Get current date
        const currentDate = new Date();

        // Find users whose subscription has expired
        const expiredUsers = await User.find({
            'subscription.subscriptionStatus': 'active',
            'subscription.expirationDate': { $lte: currentDate }
        });

        // Loop through each expired user and set their subscription to inactive
        expiredUsers.forEach(async (user) => {
            user.subscription.subscriptionStatus = 'inactive';
            user.subscription.subscriptionPlan = null; // Optionally, reset the plan
            sendExpirationEmail(user);
            await user.save();
        });

        console.log(`Checked and updated ${expiredUsers.length} expired subscriptions.`);
    } catch (err) {
        console.error('Error updating expired subscriptions:', err);
    }
});
