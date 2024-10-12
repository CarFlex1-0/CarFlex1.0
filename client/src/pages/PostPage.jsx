import React, { useEffect, useState } from "react";
import axios from "@services/axios";
import Carousel from "@components/Carousel";
import "../../public/stylesheets/spinner.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@contexts/auth_context";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FeaturedBlogCard from "@components/FeaturedBlogCard";
import BlogCard from "@components/BlogCard";

const PostPage = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/user/blog-dashboard";
  const authorId = location.pathname.split("/")[4];
  const { drawerState } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        console.log("Fetching blogs...");
        const res = isDashboard
          ? await axios.get("/blogs")
          : await axios.get(`/blogs/author/${authorId}`);

        console.log("Response data:", res.data);
        const data = res.data;
        setBlogs(data);
        setFilteredBlogs(data);

        if (isDashboard) {
          setRecentBlogs(data.slice().reverse().slice(0, 5));
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

  useEffect(() => {
    const results = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(results);
  }, [searchTerm, blogs]);

  const deleteBlog = async (blogId) => {
    try {
      console.log("Deleting blog with ID:", blogId);
      await axios.delete(`/blogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      setFilteredBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== blogId)
      );
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
      setFilteredBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? res.data : blog
        )
      );
      setRecentBlogs((prevBlogs) => {
        const filteredBlogs = prevBlogs.filter(
          (blog) => blog._id !== updatedBlog._id
        );
        return [res.data, ...filteredBlogs].slice(0, 5);
      });
      toast.success("Blog updated successfully!");
      console.log("Blog updated:", res.data);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Error updating blog: " + error.message);
    }
  };

  const featuredBlog = filteredBlogs[0]; // Assuming the first blog is featured

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
    <main
      className={
        drawerState
          ? "blur bg-blue-950"
          : "p-3 flex flex-col max-w-7xl mx-auto min-h-screen md:mb-12"
      }
    >
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Search Blogs</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full max-w-xs pl-10 pr-4 py-2 rounded-full bg-[#3f3f46] text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
        </div>
      </section>

      {featuredBlog && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Post</h2>
          <FeaturedBlogCard item={featuredBlog} onDelete={deleteBlog} onUpdate={updateBlog} />
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.slice(1).map((blog) => (
            <BlogCard key={blog._id} item={blog} onDelete={deleteBlog} onUpdate={updateBlog} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default PostPage;
