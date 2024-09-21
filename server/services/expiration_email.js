const transporter = require('../config/nodemailer_config')

async function sendExpirationEmail(user) {
    

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Your Subscription Has Expired',
        text: `Hello ${user.firstName}, your subscription has expired. Please renew your subscription to continue enjoying our services.`,
    };

    await transporter.sendMail(mailOptions);
}
 module.exports = sendExpirationEmail;