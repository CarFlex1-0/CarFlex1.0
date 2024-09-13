// services/saveData.js
const ScrapedData = require("../models/car");

async function saveData(transformedData) {
  try {
    const newScrapedData = new ScrapedData(transformedData);
    await newScrapedData.save();
    return {
      message: "Data saved successfully",
      data: transformedData,
    };
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
}

module.exports = {
  saveData,
};
