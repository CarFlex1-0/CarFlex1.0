// controllers/carController.js
const Car = require("../models/car");

async function getAllCars(req, res) {
  try {
    const cars = await Car.find({}); // Fetch all cars
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
}

async function getCarById(req, res) {
  const { id } = req.params;
  try {
    const car = await Car.findById(id).exec();
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ error: "Failed to fetch car" });
  }
}

module.exports = {
  getAllCars,
  getCarById,
};
