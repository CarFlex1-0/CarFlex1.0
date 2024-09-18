// Fetch All Blogs and Recently Uploaded Blogs
import { useState, useEffect } from "react";
import axios from "@services/axios";

const useFetchBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/blogs");
        const data = res.data; // No need to check res.ok
        setBlogs(data); // Set the fetched blogs
      } catch (error) {
        setError(error.message); // Axios error messages will be here
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentBlogs = async () => {
      try {
        const res = await axios.get("/blogs");
        const data = res.data; // No need to check res.ok
        setRecentBlogs(data.slice().reverse().slice(0, 5));
      } catch (error) {
        setError(error.message); // Axios error messages will be here
      }
    };

    fetchBlogs();
    fetchRecentBlogs();
  }, []);

  return { loading, error, blogs, recentBlogs };
};

export default useFetchBlogs;
