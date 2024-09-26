import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useBlog from "@hooks/useFetchSingleAndLike";

const SingleBlogPage = () => {
  const { id } = useParams();
  const { loading, error, blog, liked, likeCount, handleLike, userId } =
    useBlog(id);

  // console.log("Blog ID from params:", id);
  // console.log("Loading state:", loading);
  // console.log("Error state:", error);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-white"></div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching blog:", error);
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  if (!blog) {
    console.warn("No blog found for ID:", id);
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-xl font-semibold">Blog not found</p>
      </div>
    );
  }

  console.log("Blog data:", blog);

  return (
    <main className="p-6 md:p-12 max-w-5xl mx-auto h-full mt-10 mb-10">
      <article className="bg-white shadow-2xl rounded-3xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
        <div className="p-8">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 transition-colors duration-300 hover:text-indigo-600 flex flex-wrap">
            {blog.title}
          </h1>
            <h6 className="flex p-2">Last Updated At: {new Date(blog.updatedAt).toLocaleDateString()}</h6>
          <figure>
            <img
              src={blog.blogImageUrl?.url}
              alt={blog.title}
              className="w-full rounded-3xl object-cover transition-opacity duration-700 hover:opacity-90 mb-3"
            />
          </figure>
          <p className="leading-relaxed mb-8 prose prose-zinc prose-xl border-b border-b-gray-800 pb-4 flex flex-wrap">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <img
                  src={
                    blog.author?.imageUrl?.url ||
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
            <div className="mt-4">
              <Link
                to={`/blog/author/${blog.author._id}`}
                onClick={() => {
                  console.log(
                    "Navigating to author's blog posts for user ID:",
                    blog.author.userId
                  );
                }}
                className="bg-white text-blue-500 font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
              >
                More by the Author
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default SingleBlogPage;
