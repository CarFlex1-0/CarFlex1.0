const express = require('express');
const router = express.Router();
const { addAnswer, getAnswersByQuestionId, upvoteAnswer, downvoteAnswer } = require('../controllers/answer_controller');

// POST route to add an answer
router.post('/:questionId/', addAnswer);

// GET route to get answers by question ID
router.get('/:questionId/answers', getAnswersByQuestionId);

// PUT route to upvote an answer
router.put('/:answerId/upvote', upvoteAnswer);

// PUT route to downvote an answer
router.put('/:answerId/downvote', downvoteAnswer);

module.exports = router;
