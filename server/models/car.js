// models/Car.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const dimensionSchema = new Schema({
  value: { type: Number, default: null },
  unit: { type: String, default: "" },
});

const performanceSchema = new Schema({
  acceleration: dimensionSchema,
  maxSpeed: dimensionSchema,
  weightToPowerRatio: { type: String, default: "" },
  weightToTorqueRatio: { type: String, default: "" },
});

const engineSchema = new Schema({
  power: {
    value: { type: Number, default: null },
    unit: { type: String, default: "" },
    rpm: { type: Number, default: null },
  },
  torque: {
    value: { type: Number, default: null },
    unit: { type: String, default: "" },
    rpm: { type: Number, default: null },
  },
  numberOfCylinders: { type: Number, default: null },
  valvesPerCylinder: { type: Number, default: null },
  oilCapacity: dimensionSchema,
  kerbWeight: {
    value: { type: Number, default: null },
    unit: { type: String, default: "" },
  },
  bore: dimensionSchema,
  displacement: dimensionSchema,
  stroke: dimensionSchema, // Add piston stroke here
});

const dimensionsSchema = new Schema({
  length: dimensionSchema,
  width: dimensionSchema,
  height: dimensionSchema,
  wheelbase: dimensionSchema,
  frontTrack: dimensionSchema,
  rearTrack: dimensionSchema,
  dragCoefficient: dimensionSchema,
});

const generalSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  generation: { type: String, default: "" },
  modification: { type: String, default: "" },
  startOfProduction: { type: Number, default: null },
  powertrainArchitecture: { type: String, default: "" },
  bodyType: { type: String, default: "" },
  seats: { type: Number, default: null },
  doors: { type: Number, default: null },
});

const carSchema = new Schema({
  general: generalSchema,
  performance: performanceSchema,
  engine: engineSchema,
  dimensions: dimensionsSchema,
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
