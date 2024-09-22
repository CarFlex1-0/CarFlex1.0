import { useState, useEffect } from "react";
import axios from "@services/axios";
import Cookies from "js-cookie"; // Import JS Cookies

const useBlog = (id) => {
  const user = Cookies.get("user");
  const userId = user ? JSON.parse(user)._id : null; // Parse userId from cookies
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
        setLikeCount(data.likes.likesCount);
        setLiked(data.likes.likedBy.includes(userId)); // Check if the user has liked

        // This is optional based on your earlier approach
        localStorage.setItem(`liked_${id}`, liked);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchBlog();
  }, [id, userId]); // Add userId as a dependency

  const handleLike = async () => {
    try {
      const endpoint = liked ? `/blogs/${id}/removelike` : `/blogs/${id}/like`;

      const res = await axios.put(endpoint, { userId }); // Send userId in the request body

      const data = res.data;

      setLikeCount(data.likes.likesCount);
      setLiked(!liked);
      localStorage.setItem(`liked_${id}`, !liked);
    } catch (error) {
      setError(error.message);
    }
  };

  return { loading, error, blog, liked, likeCount, handleLike, userId };
};

export default useBlog;
