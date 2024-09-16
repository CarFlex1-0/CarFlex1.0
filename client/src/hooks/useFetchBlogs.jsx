import { useState, useEffect } from "react";

const useFetchBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/blogs`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch blogs");
        }
        setBlogs(data); // Set the fetched blogs
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch recent blogs");
        }
        setRecentBlogs(data.slice(0, 5));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlogs();
    fetchRecentBlogs();
  }, []);

  return { loading, error, blogs, recentBlogs };
};

export default useFetchBlogs;
