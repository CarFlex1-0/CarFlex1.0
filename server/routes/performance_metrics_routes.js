// routes/performanceMetricsRoutes
const express = require("express");
const router = express.Router();
const performanceMetricsController = require("../controllers/performance_metrics_controller");

router.get("/metric1/:id", performanceMetricsController.getMetric1);
router.get("/metric2/:id", performanceMetricsController.getMetric2);
router.get("/metric3/:id", performanceMetricsController.getMetric3);
router.get("/metric4/:id", performanceMetricsController.getMetric4);
router.get("/metric5/:id", performanceMetricsController.getMetric5);
router.get("/metric6/:id", performanceMetricsController.getMetric6);

module.exports = router;
