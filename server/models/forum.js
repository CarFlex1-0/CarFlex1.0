const mongoose = require('mongoose');
const forumSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: {
            type: Number
        },
        blogImageUrl: {
            type: String
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
        commentId:{
            type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
        }

        // plagPercentage:{
        //     type: Number,
        // }

    },

    {
        timestamps: true,
    }
);


const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;