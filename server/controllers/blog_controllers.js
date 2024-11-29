const Blog = require("../models/blog");
const User = require("../models/user");
const cloudinary = require("../config/cloudinary_config");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { checkPlagiarism } = require("../services/plagiarism"); // Import the plagiarism service
// Create new Blog
// controllers/blog_controllers.js

const createBlog = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log("Request Body:", req.body); // Log the request body

    const { title, content, blogImageUrl, author, plagPercentage, subtitle } =
      req.body;

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ error: "Title, content, and author are required." });
    }

    if (isNaN(plagPercentage)) {
      console.error("Plagiarism percentage is NaN:", percentString);
      return res.status(400).json({ error: "Invalid plagiarism percentage." });
    }

    // Check if plagPercentage is greater than or equal to 30%
    if (plagPercentage >= 30) {
      return res.status(400).json({
        error:
          "Plagiarism percentage is too high. Please ensure it is below 30%.",
      });
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
      subtitle,
      content,
      author,
      blogImageUrl: blogImageUrlData,
      plagPercentage, // Use the parsed number here
    });

    await User.findByIdAndUpdate(
      author,
      { $push: { blogsList: newBlog._id } },
      { new: true }
    );

    console.log("New Blog Created:", newBlog);
    res.status(201).json({
      success: true,
      newBlog,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: error.message });
  }
};

const plageValue = async (req, res) => {
  try {
    const { title, content } = req.body;
    // Call plagiarism check before creating the blog
    console.log("Checking for plagiarism...");
    const plagResult = await checkPlagiarism(content, title);
    console.log("Plagiarism Check Result:", plagResult);

    // Extract and parse the plagiarism percentage
    const percentString = plagResult.Plagiarised; // Ensure you are referencing the right key
    const plagPercentage = parseFloat(percentString.replace("%", "")); // Remove '%' and convert to float

    if (isNaN(plagPercentage)) {
      console.error("Plagiarism percentage is NaN:", percentString);
      return res.status(400).json({ error: "Invalid plagiarism percentage." });
    }

    return res.json({ plagPercentage: plagPercentage });
  } catch (e) {
    console.error("Error checking for plagiarism:", e);
    res.status(500).json({ error: "Failed to check for plagiarism." });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate(
      "author",
      "username bio imageUrl.url"
    );

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
      "username bio imageUrl.url"
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
    console.log("Received update request for blog ID:", req.params.id);
    console.log("Update data:", req.body);

    const { title, content, blogImageUrl, subtitle } = req.body;

    const currentBlog = await Blog.findById(req.params.id);
    if (!currentBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    //build the object data
    const data = {
      title: title || currentBlog.title,
      subtitle: subtitle || currentBlog.subtitle,
      content: content || currentBlog.content,
      blogImageUrl: currentBlog.blogImageUrl, // Default to current image
    };

    //modify post image conditionally
    if (blogImageUrl && blogImageUrl !== currentBlog.blogImageUrl.url) {
      const ImgId = currentBlog.blogImageUrl.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader.upload(blogImageUrl, {
        folder: "blogs",
        width: 1200,
        crop: "scale",
      });

      data.blogImageUrl = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    console.log("Updating blog with data:", data);

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    console.log("Blog updated successfully:", updatedBlog);
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: error.message });
  }
};

// Like a blog post by ID
const likeBlogById = async (req, res) => {
  const userId = req.body.userId; // Extract userId from the request body

  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID." });
    }

    // Find the blog post
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Check if the user has already liked the blog
    if (blog.likes.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this blog." });
    }

    // Update likes count and likedBy array
    blog.likes.likesCount += 1;
    blog.likes.likedBy.push(userId); // Push the userId directly

    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeLikeBlogById = async (req, res) => {
  const userId = req.body.userId; // Extract userId from the request body

  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID." });
    }

    // Find the blog post
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Check if the user has liked the blog
    if (!blog.likes.likedBy.includes(userId)) {
      return res.status(400).json({ message: "You have not liked this blog." });
    }

    // Update likes count and likedBy array
    blog.likes.likesCount -= 1;
    blog.likes.likedBy = blog.likes.likedBy.filter(
      (id) => id.toString() !== userId
    );

    await blog.save();

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
  plageValue,
};
