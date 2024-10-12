const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      likesCount: {
        type: Number,
        default: 0,
      },
      likedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    blogImageUrl: {
      url: String,
      public_id: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    plagPercentage: {
      type: Number,
      default: 0,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
