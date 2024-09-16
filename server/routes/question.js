const express = require('express');
const router = express.Router();
const { askQuestion, getAllQuestions, getQuestionById } = require('../controllers/question_controller');

// POST route to ask a question
router.post('/ask', askQuestion);

// GET route to get all questions
router.get('/', getAllQuestions);

// GET route to get a specific question by ID
router.get('/:id', getQuestionById);

module.exports = router;
