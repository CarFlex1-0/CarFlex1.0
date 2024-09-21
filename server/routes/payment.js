const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment_controller")

router.post('/create-checkout-session', paymentController.createPayment);
router.post('/check-payment-status', paymentController.checkPaymentStatus);
module.exports = router;