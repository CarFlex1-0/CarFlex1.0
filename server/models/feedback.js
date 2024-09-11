const mongoose = require('mongoose');
const feedbackSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        rating: {
            type: Number
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
    },

    {
        timestamps: true,
    }
);


const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;