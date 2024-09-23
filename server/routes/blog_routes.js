const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  likeBlogById,
  removeLikeBlogById,
  getBlogsByAuthor,
  plageValue,
} = require("../controllers/blog_controllers");

// Define blog routes
router.post("/blogs", createBlog);
router.post("/blogs/plagiarism", plageValue);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.delete("/blogs/:id", deleteBlogById);
router.put("/blogs/:id", updateBlogById);
router.put("/blogs/:id/like", likeBlogById);
router.put("/blogs/:id/removelike", removeLikeBlogById);
router.get("/blogs/author/:authorId", getBlogsByAuthor);

module.exports = router;
