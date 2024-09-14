const Blog = require("../models/blog");
const { body, validationResult } = require("express-validator");
const User = require("../models/user"); // Check this path

// Create a new blog
const createBlog = [
  // Validation rules
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("author").isMongoId().withMessage("Invalid author ID"),
  body("blogImageUrl").optional().isURL().withMessage("Invalid URL format"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content, author, blogImageUrl } = req.body;

      const newBlog = new Blog({
        title,
        content,
        author,
        blogImageUrl,
        plagPercentage: 0,
      });
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      res.status(500).json({ error: error.message, details: error });
    }
  },
];

// Update a blog post by ID
const updateBlogById = async (req, res) => {
  try {
    const { title, content, blogImageUrl } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, blogImageUrl, plagPercentage: 0 },
      { new: true }
    );
    if (!updatedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: "In Get All Blogs",
    });
  }
};

// Get a single blog post by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: error,
    });
  }
};

// Delete a blog post by ID
const deleteBlogById = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a blog post by ID
const likeBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    blog.likes += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  likeBlogById,
};
