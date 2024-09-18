// Sing;e Blog Fetch and Like Management
import { useState, useEffect } from "react";
import axios from "@services/axios";

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
        const res = await axios.get(`/blogs/${id}`);
        const data = res.data;

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
      // In the handleLike function
      const endpoint = liked ? `/blogs/${id}/removelike` : `/blogs/${id}/like`;

      const res = await axios.put(endpoint);

      const data = res.data;

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
