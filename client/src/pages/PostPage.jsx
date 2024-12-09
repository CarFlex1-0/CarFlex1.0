import React, { useEffect, useState } from "react";
import axios from "@services/axios";
import "../../public/stylesheets/spinner.css";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@contexts/auth_context";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FeaturedBlogCard from "@components/FeaturedBlogCard";
import BlogCard from "@components/BlogCard";
import { ThemeProvider, useTheme } from "@contexts/ThemeContext";

const PostPageContent = () => {
  const location = useLocation();
  const { id: authorId } = useParams();
  const isDashboard = location.pathname === "/user/blog-dashboard";
  const { drawerState } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme();
  const [sortOption, setSortOption] = useState("dateDesc");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // console.log("Fetching blogs...");
        const res = isDashboard
          ? await axios.get("/blogs")
          : await axios.get(`/blogs/author/${authorId}`);

        // console.log("Response data:", res.data);
        const data = res.data;

        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
        // console.log("Loading state set to false");
      }
    };

    fetchBlogs();
  }, [isDashboard, authorId]);

  useEffect(() => {
    const sortedAndFilteredBlogs = sortBlogs(
      blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredBlogs(sortedAndFilteredBlogs);
  }, [sortOption, blogs, searchTerm]);

  const sortBlogs = (blogsToSort) => {
    switch (sortOption) {
      case "likesDesc":
        return [...blogsToSort].sort(
          (a, b) => b.likes.likesCount - a.likes.likesCount
        );
      case "likesAsc":
        return [...blogsToSort].sort(
          (a, b) => a.likes.likesCount - b.likes.likesCount
        );
      case "dateAsc":
        return [...blogsToSort].sort(
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        );
      case "dateDesc":
      default:
        return [...blogsToSort].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      // console.log("Deleting blog with ID:", blogId);
      await axios.delete(`/blogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      setFilteredBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== blogId)
      );
      toast.success("Blog deleted successfully!");
      // console.log("Blog deleted:", blogId);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog: " + error.message);
    }
  };

  const updateBlog = async (updatedBlog) => {
    try {
      // console.log("Updating blog with ID:", updatedBlog._id);
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
      toast.success("Blog updated successfully!");
      // console.log("Blog updated:", res.data);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Error updating blog: " + error.message);
    }
  };

  const getSectionTitle = () => {
    switch (sortOption) {
      case "likesDesc":
        return "Most Liked Posts";
      case "likesAsc":
        return "Least Liked Posts";
      case "dateAsc":
        return "Oldest Posts";
      case "dateDesc":
      default:
        return "Latest Posts";
    }
  };

  const featuredBlog =
    blogs.length > 0
      ? blogs.reduce((prev, current) =>
          prev.likes.likesCount > current.likes.likesCount ? prev : current
        )
      : null;

  if (loading) {
    // console.log("Loading... Please wait.");
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

  // console.log("Blogs loaded:", blogs);

  return (
    <div
      className={
        drawerState
          ? "blur bg-blue-950 cursor-none"
          : ""
      }
    >
      <main
        className={`min-h-screen ${
          isDarkMode
            ? "bg-gradient-to-br from-[#2b4e7e] to-black"
            : "bg-gray-100"
        } transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={toggleTheme}
            className={`fixed top-4 right-4 p-2 rounded-full ${
              isDarkMode
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-white"
            }`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          <section className="mb-8 flex justify-between items-center">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-full ${
                  isDarkMode
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-white text-gray-900 placeholder-gray-500"
                } focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={`ml-4 p-2 rounded-md ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              } border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
            >
              <option value="dateDesc">Newest</option>
              <option value="dateAsc">Oldest</option>
              <option value="likesDesc">Most Liked</option>
              <option value="likesAsc">Least Liked</option>
            </select>
          </section>

          {featuredBlog && (
            <section className="mb-12">
              <h2
                className={`text-3xl font-bold mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Featured Post
              </h2>
              <FeaturedBlogCard
                item={featuredBlog}
                onDelete={deleteBlog}
                onUpdate={updateBlog}
              />
            </section>
          )}

          <section className="mb-12">
            <h2
              className={`text-3xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {getSectionTitle()}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs
                .filter((blog) => blog._id !== featuredBlog?._id)
                .map((blog) => (
                  <BlogCard
                    key={blog._id}
                    item={blog}
                    onDelete={deleteBlog}
                    onUpdate={updateBlog}
                  />
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const PostPage = () => {
  return (
    <ThemeProvider>
      <PostPageContent />
    </ThemeProvider>
  );
};

export default PostPage;
