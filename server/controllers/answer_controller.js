const Answer = require('../models/answer');
const Question = require('../models/question');

// Add a new answer
const addAnswer = async (req, res) => {
    const { content, userId } = req.body;
    const { questionId } = req.params;
    try {
        const answer = new Answer({
            content,
            user: userId,
            question: questionId,
        });
        await answer.save();

        // Update question with the new answer
        const question = await Question.findById(questionId);
        question.answers.push(answer._id);
        await question.save();

        res.status(201).json(answer);
    } catch (error) {
        res.status(400).json({ message: 'Failed to add answer', error });
    }
};

// Upvote an answer
const upvoteAnswer = async (req, res) => {
    const { answerId } = req.params;
    try {
        const answer = await Answer.findById(answerId);
        answer.upvotes += 1;
        await answer.save();
        res.status(200).json(answer);
    } catch (error) {
        res.status(400).json({ message: 'Failed to upvote answer', error });
    }
};

// Downvote an answer
const downvoteAnswer = async (req, res) => {
    const { answerId } = req.params;
    try {
        const answer = await Answer.findById(answerId);
        answer.downvotes += 1;
        await answer.save();
        res.status(200).json(answer);
    } catch (error) {
        res.status(400).json({ message: 'Failed to downvote answer', error });
    }
};

// Get all answers for a question
const getAnswersByQuestionId = async (req, res) => {
    const { questionId } = req.params;
    try {
        const answers = await Answer.find({ question: questionId }).populate('user');
        res.status(200).json(answers);
    } catch (error) {
        res.status(400).json({ message: 'Failed to get answers', error });
    }
};

module.exports = { addAnswer, upvoteAnswer, downvoteAnswer, getAnswersByQuestionId };
