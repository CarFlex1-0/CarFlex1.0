const Feedback = require("../models/feedback");
const User = require("../models/user");
const {
  sendAdminNotification,
  sendUserThankYou,
} = require("../services/email_service");

exports.createFeedback = async (req, res) => {
  try {
    req.body.author = { _id: "66e5da75922c0737ba3eca42" }; // Mock user ID
    // Create new feedback
    const feedback = new Feedback({
      content: req.body.content,
      rating: req.body.rating,
      author: req.body.author,
    });
    await feedback.save();

    // Fetch user details
    const user = await User.findById(req.body.author).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userEmail = user.email;

    // Send email to admin
    await sendAdminNotification(feedback, userEmail);

    // Send email to user
    // await sendUserThankYou(userEmail, feedback);
    await sendUserThankYou("mohid.anwar@gmail.com", feedback);

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all feedback
exports.getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update feedback by ID
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete feedback by ID
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
