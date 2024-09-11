const mongoose = require('mongoose');
const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes:{
            type:Number
        },
        blogImageUrl:{
            type:String
        },
        author:{
            type: mongoose.Schema.Types.ObjectId, ref: 'User' 
        },

        // plagPercentage:{
        //     type: Number,
        // }
    },

    {
        timestamps: true,
    }
);


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;