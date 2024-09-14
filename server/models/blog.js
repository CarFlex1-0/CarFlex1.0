const mongoose = require("mongoose");
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
    likes: {
      type: Number,
      default: 0,
    },
    blogImageUrl: {
      type: String,
      // default:
      //   "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post-1536x674.webp",
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
