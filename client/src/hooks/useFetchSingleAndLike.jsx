// Sing;e Blog Fetch and Like Management
import { useState, useEffect } from "react";

const useBlog = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch the blog post");
        }
        setBlog(data);
        setLikeCount(data.likes);

        // Check if the user has liked this blog
        const userLiked = localStorage.getItem(`liked_${id}`) === "true";
        setLiked(userLiked);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    try {
      const endpoint = liked
        ? `http://localhost:5000/api/blogs/${id}/removelike`
        : `http://localhost:5000/api/blogs/${id}/like`;

      const res = await fetch(endpoint, {
        method: "PUT",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update the like status");
      }

      setLikeCount(data.likes);
      setLiked(!liked);
      localStorage.setItem(`liked_${id}`, !liked);
    } catch (error) {
      setError(error.message);
    }
  };

  return { loading, error, blog, liked, likeCount, handleLike };
};

export default useBlog;
