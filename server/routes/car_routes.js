// routes / carRoutes.js;
const express = require("express");
const router = express.Router();
const carController = require("../controllers/car_controller");

router.get("/cars", carController.getAllCars);
router.get("/cars/:id", carController.getCarById);

module.exports = router;
