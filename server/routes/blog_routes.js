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
} = require("../controllers/blog_controllers");

// Define blog routes
router.post("/blogs", createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.delete("/blogs/:id", deleteBlogById);
router.put("/blogs/:id", updateBlogById);
router.put("/blogs/:id/like", likeBlogById);
router.put("/blogs/:id/removelike", removeLikeBlogById);

module.exports = router;
