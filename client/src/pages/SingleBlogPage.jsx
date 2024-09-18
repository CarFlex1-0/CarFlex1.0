// Show a Single Blog
// TODO: Show Blogs by author (Backend and Frontend)
import React from "react";
import { useParams } from "react-router-dom";
import useBlog from "@hooks/useFetchSingleAndLike";

const SingleBlogPage = () => {
  const { id } = useParams();
  const { loading, error, blog, liked, likeCount, handleLike } = useBlog(id);

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
    <main className="p-6 md:p-12 max-w-4xl mx-auto h-full mt-10 mb-10">
      <article className="bg-white shadow-2xl rounded-3xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
        <figure>
          <img
            src={blog.blogImageUrl?.url}
            alt={blog.title}
            className="w-full h-96 object-cover transition-opacity duration-700 hover:opacity-90"
          />
        </figure>
        <div className="p-8">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 transition-colors duration-300 hover:text-indigo-600">
            {blog.title}
          </h1>
          <p className="leading-relaxed mb-8 prose prose-zinc prose-xl border-b border-b-gray-800 pb-4">
            {blog.content}
          </p>
          <div className="flex justify-end mt-6">
            <div className="bg-white p-4 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:bg-pink-50">
              <div
                className={`flex items-center cursor-pointer ${
                  liked ? "text-pink-500" : "text-gray-500"
                }`}
                onClick={handleLike}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={liked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900 hover:text-pink-500">
                    {likeCount}
                  </div>
                  <div className="text-sm text-gray-600 hover:text-pink-500">
                    {liked ? "Thank You" : "Leave a Like?"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-400 p-8">
          <h2 className="text-3xl font-semibold text-white mb-6">
            About the Author
          </h2>
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                src={
                  blog.author?.profilePictureUrl ||
                  "/public/assets/icons/react.svg"
                }
                alt={blog.author?.username || "Author"}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div>
              <p className="text-xl font-semibold text-white">
                @{blog.author?.username || "Unknown"}
              </p>
              <p className="text-white mt-2">
                {blog.author?.bio || "No bio available"}
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default SingleBlogPage;
