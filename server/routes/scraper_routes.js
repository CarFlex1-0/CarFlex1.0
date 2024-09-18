// routes/scraperRoutes.js
const express = require("express");
const router = express.Router();
const scraperController = require("../controllers/scraper_controller");

// Endpoint for scraping and transforming data
router.post("/scrape", scraperController.scrapeAndTransform);

// Endpoint for saving the scraped data
router.post("/save", scraperController.saveScrapedData);

module.exports = router;
