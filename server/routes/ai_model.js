const express = require("express");
const router = express.Router();

const aiModelController = require("../controllers/ai_model_controller");

// Define blog routes
router.post("/get-response", aiModelController.getResponseFromModel);
router.post("/chat-history", aiModelController.getChatSpecificUser);
router.post("/weather", aiModelController.getWeather);
module.exports = router;
