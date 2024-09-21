const Blog = require("../models/blog");
const User = require("../models/user");
const cloudinary = require("../config/cloudinary_config");
const { body, validationResult } = require("express-validator");

// Create new Blog
// controllers/blog_controllers.js

const createBlog = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log("Request Body:", req.body); // Log the request body

    const { title, content, blogImageUrl, author } = req.body; // Extract author from the request body

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ error: "Title, content, and author are required." });
    }

    let blogImageUrlData = null;
    if (blogImageUrl) {
      const result = await cloudinary.uploader.upload(blogImageUrl, {
        folder: "blogs",
        width: 1200,
        crop: "scale",
      });
      blogImageUrlData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const newBlog = await Blog.create({
      title,
      content,
      author, // Use the author ID from the request
      blogImageUrl: blogImageUrlData,
      plagPercentage: 0,
    });

    // Add the new blog's ID to the user's blogsList
    await User.findByIdAndUpdate(
      author,
      { $push: { blogsList: newBlog._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      newBlog,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
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
    const currentBlog = await Blog.findById(req.params.id);
    if (!currentBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Log the image ID being deleted
    const ImgId = currentBlog.blogImageUrl?.public_id;
    if (ImgId) {
      console.log(`Attempting to delete image with ID: ${ImgId}`);
      await cloudinary.uploader.destroy(ImgId);
      console.log(`Successfully deleted image with ID: ${ImgId}`);
    }

    // Remove the blog ID from the author's blogsList
    await User.findByIdAndUpdate(
      currentBlog.author,
      { $pull: { blogsList: currentBlog._id } },
      { new: true } // Return the updated document
    );

    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a blog post by ID
const updateBlogById = async (req, res) => {
  try {
    const { title, content, blogImageUrl } = req.body;

    const currentBlog = await Blog.findById(req.params.id);
    //build the object data
    const data = {
      title: title || currentBlog.title,
      content: content || currentBlog.content,
      blogImageUrl: blogImageUrl || currentBlog.blogImageUrl,
      plagPercentage: 0,
    };

    //modify post image conditionally
    if (req.body.blogImageUrl !== "") {
      const ImgId = currentBlog.blogImageUrl.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader.upload(req.body.blogImageUrl, {
        folder: "blogs",
        width: 1200,
        crop: "scale",
      });

      data.blogImageUrl = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!updatedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a blog post by ID
const likeBlogById = async (req, res) => {
  try {
    // Increment the likes field using $inc operator
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } }, // Increment the likes field by 1
      { new: true, runValidators: true } // Return the updated blog and run validators
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeLikeBlogById = async (req, res) => {
  try {
    // Decrement the likes field using $inc operator
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 } }, // Decrement the likes field by 1
      { new: true, runValidators: true } // Return the updated blog and run validators
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all blogs by author ID
const getBlogsByAuthor = async (req, res) => {
  const authorId = req.params.authorId; // Get author ID from route parameters

  try {
    const blogs = await Blog.find({ author: authorId }).populate(
      "author",
      "username"
    );
    if (!blogs.length) {
      return res
        .status(404)
        .json({ message: "No blogs found for this author" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: "In Get Blogs By Author",
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  likeBlogById,
  removeLikeBlogById,
  getBlogsByAuthor,
};
