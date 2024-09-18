// controllers/scraperController.js
const scraperService = require("../services/scraper_service");
const { transformData } = require("../utils/transform_data");
const { saveData } = require("../services/save_data");

let cachedData = null;

exports.scrapeAndTransform = async (req, res) => {
  console.log("Request body:", req.body); // Log the request body to debug
  const { url } = req.body;
  try {
    const scrapedData = await scraperService.scrapeData(url);
    cachedData = await transformData(scrapedData);
    res.status(200).json({
      message: "Data scraped and transformed successfully",
      data: cachedData, // Include the cached data in the response
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to process data",
      details: error.message,
    });
  }
};

exports.saveScrapedData = async (req, res) => {
  const { data } = req.body; // Receive updated data from request body

  if (!data) {
    return res
      .status(400)
      .json({ error: "No data to save. Please provide data." });
  }

  try {
    const result = await saveData(data); // Pass received data to saveData
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to save data",
      details: error.message,
    });
  }
};
