const Answer = require('../models/answer');
const Question = require('../models/question');
const checkProfanity = require("../utils/profanity-check");
// Add a new answer
const addAnswer = async (req, res) => {
    const { content, userId } = req.body;
    const { questionId } = req.params;
    try {
        if (checkProfanity(content)){
            return res.status(406).json({ message: "Profanity detected" });
        }
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

const upvoteAnswer = async (req, res) => {
    const { answerId } = req.params;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const answer = await Answer.findById(answerId);

        // Check if the answer exists
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        const hasUpvoted = answer.upvoters.includes(userId);
        const hasDownvoted = answer.downvoters.includes(userId);

        if (hasUpvoted) {
            // If already upvoted, remove the upvote
            answer.upvotes -= 1;
            answer.upvoters = answer.upvoters.filter(voter => voter.toString() !== userId);
        } else {
            // Add upvote
            answer.upvotes += 1;
            answer.upvoters.push(userId);

            // If the user had previously downvoted, remove the downvote
            if (hasDownvoted) {
                answer.downvotes -= 1;
                answer.downvoters = answer.downvoters.filter(voter => voter.toString() !== userId);
            }
        }

        await answer.save();
        res.status(200).json(answer);
    } catch (error) {
        console.error("Error upvoting answer:", error);
        res.status(500).json({ message: 'Failed to upvote answer', error });
    }
};

const downvoteAnswer = async (req, res) => {
    const { answerId } = req.params;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const answer = await Answer.findById(answerId);

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        const hasDownvoted = answer.downvoters.includes(userId);
        const hasUpvoted = answer.upvoters.includes(userId);

        if (hasDownvoted) {
            // If already downvoted, remove the downvote
            answer.downvotes -= 1;
            answer.downvoters = answer.downvoters.filter(voter => voter.toString() !== userId);
        } else {
            // Add downvote
            answer.downvotes += 1;
            answer.downvoters.push(userId);

            // If the user had previously upvoted, remove the upvote
            if (hasUpvoted) {
                answer.upvotes -= 1;
                answer.upvoters = answer.upvoters.filter(voter => voter.toString() !== userId);
            }
        }

        await answer.save();
        res.status(200).json(answer);
    } catch (error) {
        console.error("Error downvoting answer:", error);
        res.status(500).json({ message: 'Failed to downvote answer', error });
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
