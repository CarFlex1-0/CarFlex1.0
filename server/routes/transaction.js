const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction_controller");

// Define transactions routes
router.post("/create-payment-intent", transactionController.createTransaction);
router.post("/confirm-payment", transactionController.confirmPayment);
module.exports = router;
