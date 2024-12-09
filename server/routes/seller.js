const express = require("express");
const router = express.Router();
const { protect, seller } = require('../middlewares/authenticate');
const { getDashboardStats,ordersOverview, productsOverview } = require("../controllers/seller_controller");


router.get("/dashboard-stats", protect, seller, getDashboardStats);
// router.get("/dashboard-stats",  getDashboardStats);
router.get('/products-overview',  productsOverview);
router.get('/orders-overview', ordersOverview);
module.exports = router;