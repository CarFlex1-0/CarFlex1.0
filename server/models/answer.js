const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Track users who upvoted
    downvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Track users who downvoted
}, { timestamps: true });

module.exports = mongoose.model('Answer', answerSchema);
