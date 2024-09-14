// routes/blog_routes.js
const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  likeBlogById,
} = require("../controllers/blog_controllers");

// Create a new blog
router.post("/blogs", createBlog);

// Get all blog posts
router.get("/blogs", getAllBlogs);

// Get a single blog post by ID
router.get("/blogs/:id", getBlogById);

// Update a blog post by ID
router.put("/blogs/:id", updateBlogById);

// Delete a blog post by ID
router.delete("/blogs/:id", deleteBlogById);

// Like a blog post by ID
router.post("/blogs/:id/like", likeBlogById);

module.exports = router;
