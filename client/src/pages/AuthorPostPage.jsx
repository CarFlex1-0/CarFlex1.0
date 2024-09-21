import React, { useEffect, useState } from "react";
import axios from "@services/axios";
import Carousel from "@components/Carousel";
import "../../public/stylesheets/spinner.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AuthorPostPage = () => {
    
  const authorCookie = Cookies.get("user");
  const author = authorCookie ? JSON.parse(authorCookie) : null; // Parse cookie data

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
        const data = res.data; // Assume response is structured correctly
        setBlogs(data); // Set the fetched blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };

    fetchBlogs();
  }, []);

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
      <Carousel
        items={blogs}
        title={"My Blogs"}
        onDelete={deleteBlog}
        onUpdate={updateBlog}
      />
    </main>
  );
};

export default AuthorPostPage;
