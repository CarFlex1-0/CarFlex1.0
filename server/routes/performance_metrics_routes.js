// routes/performanceMetricsRoutes
const express = require("express");
const router = express.Router();
const performanceMetricsController = require("../controllers/performance_metrics_controller");
const performanceMetricsController2 = require("../controllers/performance_metrics_controller_copy");

router.get("/metric1/:id", performanceMetricsController.getMetric1);
router.get("/metric2/:id", performanceMetricsController.getMetric2);
router.get("/metric3/:id", performanceMetricsController.getMetric3);
router.get("/metric4/:id", performanceMetricsController.getMetric4);
router.get("/metric5/:id", performanceMetricsController.getMetric5);
router.get("/metric6/:id", performanceMetricsController.getMetric6);

router.post("/metric01", performanceMetricsController2.getMetric1);
router.post("/metric02", performanceMetricsController2.getMetric2);
router.post("/metric03", performanceMetricsController2.getMetric3);
router.post("/metric04", performanceMetricsController2.getMetric4);
router.post("/metric05", performanceMetricsController2.getMetric5);
router.post("/metric06", performanceMetricsController2.getMetric6);

module.exports = router;
