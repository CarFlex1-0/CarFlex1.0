const mongoose = require('mongoose');

const voteSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        answer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer',
            required: true,
        },
        voteType: {
            type: String,
            enum: ['upvote', 'downvote'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
