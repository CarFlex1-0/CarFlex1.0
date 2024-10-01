import React, { useEffect, useState } from "react";
import axios from "@services/axios";
import Carousel from "@components/Carousel";
import "../../public/stylesheets/spinner.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PostPage = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/user/blog-dashboard";
  const authorId = location.pathname.split("/")[3];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        console.log("Fetching blogs...");
        const res = isDashboard
          ? await axios.get("/blogs")
          : await axios.get(`/blogs/author/${authorId}`);

        console.log("Response data:", res.data);
        const data = res.data; // Assume response is structured correctly
        setBlogs(data); // Set the fetched blogs

        if (isDashboard) {
          setRecentBlogs(data.slice().reverse().slice(0, 5)); // Get recent blogs for dashboard
          console.log("Recent blogs set:", data.slice().reverse().slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };

    fetchBlogs();
  }, [isDashboard, authorId]);

  const deleteBlog = async (blogId) => {
    try {
      console.log("Deleting blog with ID:", blogId);
      await axios.delete(`/blogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      setRecentBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== blogId).slice(0, 5)
      );
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
      setRecentBlogs((prevBlogs) => {
        const filteredBlogs = prevBlogs.filter(
          (blog) => blog._id !== updatedBlog._id
        );
        return [res.data, ...filteredBlogs].slice(0, 5); // Update recent blogs
      });
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
      {isDashboard && <Carousel items={recentBlogs} title="Recently Posted" />}
      <Carousel
        items={blogs}
        title={isDashboard ? "All Blogs" : "Author's Blogs"}
        onDelete={deleteBlog}
        onUpdate={updateBlog}
      />
    </main>
  );
};

export default PostPage;
