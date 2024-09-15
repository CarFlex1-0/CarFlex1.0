import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../public/stylesheets/spinner.css";

export default function PostPage() {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center underline max-w-2xl mx-auto lg:text-4xl">
        All Blogs
      </h1>
      <div className="flex flex-wrap w-full sm:w-full gap-5 mt-5 justify-center">
        {blogs.length > 0 ? (
          blogs.map((post) => (
            <div
              key={post._id}
              className="card card-compact bg-base-100 w-96 shadow-xl"
            >
              <figure>
                <img src={post.blogImageUrl.url} alt={post.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.content.slice(0, 100)}...</p>
                <div className="card-actions justify-center">
                  <Link
                    to={`/blog/${post._id}`}
                    className="btn btn-primary glass"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
      <div className="flex flex-col justify-center items-center mb-1">
        <h1 className="text-2xl mt-5 underline font-medium">Recent Posted</h1>
        <div className="flex flex-wrap w-full sm:w-full gap-5 mt-5 justify-center">
          {recentBlogs.length > 0 ? (
            recentBlogs.map((recentPost) => (
              <div
                key={recentPost._id}
                className="card card-compact bg-base-100 w-96 shadow-xl"
              >
                <figure>
                  <img
                    src={recentPost.blogImageUrl.url}
                    alt={recentPost.title}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{recentPost.title}</h2>
                  <p>{recentPost.content.slice(0, 100)}...</p>
                  <div className="card-actions justify-center">
                    <Link
                      to={`/blog/${recentPost._id}`}
                      className="btn btn-primary glass"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recent blogs available</p>
          )}
        </div>
      </div>
    </main>
  );
}
