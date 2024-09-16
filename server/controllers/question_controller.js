const Question = require('../models/question');

// Ask a new question
const askQuestion = async (req, res) => {
    const { title, description, userId } = req.body;
    try {
        const question = new Question({
            title,
            description,
            user: userId,
        });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: 'Failed to ask question', error });
    }
};

// Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('user');
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ message: 'Failed to get questions', error });
    }
};

// Get a specific question by ID
const getQuestionById = async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findById(id).populate('user').populate('answers');
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: 'Failed to get question', error });
    }
};

module.exports = { askQuestion, getAllQuestions, getQuestionById };
