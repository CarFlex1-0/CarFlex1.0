import React, { useEffect, useState } from "react";
import axios from "@services/axios";
import "../../public/stylesheets/spinner.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import FeaturedBlogCard from "@components/FeaturedBlogCard";
import BlogCard from "@components/BlogCard";

const AuthorPostPage = () => {
  const authorCookie = Cookies.get("user");
  const author = authorCookie ? JSON.parse(authorCookie) : null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!author) {
        console.error("No author data found in cookies.");
        setError("No author data found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching blogs for author ID:", author._id);
        const res = await axios.get(`/blogs/author/${author._id}`);
        console.log("Response data:", res.data);
        const data = res.data;
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };

    fetchBlogs();
    setLoading(false)
  }, [author]);

  const deleteBlog = async (blogId) => {
    try {
      console.log("Deleting blog with ID:", blogId);
      await axios.delete(`/blogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      toast.success("Blog deleted successfully!");
      console.log("Blog deleted:", blogId);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog: " + error.message);
    }
  };

  const updateBlog = async (updatedBlog) => {
    try {
      console.log("Updating blog with ID:", updatedBlog._id);
      const res = await axios.put(`/blogs/${updatedBlog._id}`, updatedBlog);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? res.data : blog
        )
      );
      toast.success("Blog updated successfully!");
      console.log("Blog updated:", res.data);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Error updating blog: " + error.message);
    }
  };

  if (loading) {
    console.log("Loading... Please wait.");
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    console.error("Error state:", error);
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  console.log("Blogs loaded:", blogs);

  return (
    <main className="p-3 flex flex-col max-w-7xl mx-auto min-h-screen md:mb-12">
      <h1 className="text-3xl font-bold mb-5">My Blogs</h1>

      {blogs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Blog</h2>
          <FeaturedBlogCard
            item={blogs[0]}
            onDelete={deleteBlog}
            onUpdate={updateBlog}
          />
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            item={blog}
            onDelete={deleteBlog}
            onUpdate={updateBlog}
          />
        ))}
      </section>

      {blogs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No blogs found.</p>
      )}
    </main>
  );
};

export default AuthorPostPage;
