import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleBlogPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState(null);

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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-xl font-semibold">Blog not found</p>
      </div>
    );
  }

  return (
    <main className="p-6 md:p-12 max-w-4xl mx-auto h-full mt-10 mb-10 ">
      <article className="bg-white shadow-2xl rounded-3xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
        <figure>
          <img
            src={blog.blogImageUrl.url}
            alt={blog.title}
            className="w-full h-96 object-cover transition-opacity duration-700 hover:opacity-90"
          />
        </figure>
        <div className="p-8">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 transition-colors duration-300 hover:text-indigo-600">
            {blog.title}
          </h1>
          <p className=" leading-relaxed mb-8 prose prose-zinc prose-xl">
            {blog.content}
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-400 p-8">
          <h2 className="text-3xl font-semibold text-white mb-6">
            About the Author
          </h2>
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                src={
                  blog.author.profilePictureUrl ||
                  "/public/assets/icons/react.svg"
                }
                alt={blog.author.username}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div>
              <p className="text-xl font-semibold text-white">
                {blog.author.username}
              </p>
              <p className="text-white mt-2">{blog.author.bio}</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
