const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackById,
} = require("../controllers/feedback_controllers");

// Route to create feedback
router.post("/feedback", createFeedback);

// Route to get all feedback
router.get("/feedback", getFeedback);

// Route to get feedback by ID
router.get("/feedback/:id", getFeedbackById);

// Route to update feedback by ID
router.put("/feedback/:id", updateFeedback);

// Route to delete feedback by ID
router.delete("/feedback/:id", deleteFeedback);

module.exports = router;
