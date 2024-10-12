import React from "react";
import { Link, useParams } from "react-router-dom";
import useBlog from "@hooks/useFetchSingleAndLike";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import DOMPurify from "dompurify";
import { useTheme } from "@contexts/ThemeContext";
import { ThemeProvider } from "@contexts/ThemeContext";

hljs.configure({
  languages: ["javascript", "ruby", "python", "css", "html"],
});

const SingleBlogPage = () => {
  const { id } = useParams();
  const { loading, error, blog, liked, likeCount, handleLike } = useBlog(id);
  const { isDarkMode, toggleTheme } = useTheme();

  React.useEffect(() => {
    hljs.highlightAll();
  }, [blog]);

  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content);
  };

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode
            ? "bg-gradient-to-br from-blue-950 to-indigo-950"
            : "bg-white"
        }`}
      >
        <div
          className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${
            isDarkMode ? "border-white" : "border-gray-900"
          }`}
        ></div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching blog:", error);
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode
            ? "bg-gradient-to-br from-blue-950 to-indigo-950"
            : "bg-white"
        }`}
      >
        <p className="text-red-600 text-2xl font-serif">{error}</p>
      </div>
    );
  }

  if (!blog) {
    console.warn("No blog found for ID:", id);
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode
            ? "bg-gradient-to-br from-blue-950 to-indigo-950"
            : "bg-white"
        }`}
      >
        <p
          className={`text-2xl font-serif ${
            isDarkMode ? "text-white" : "text-gray-700"
          }`}
        >
          Article not found
        </p>
      </div>
    );
  }

  return (
    <main
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-blue-950 to-indigo-950"
          : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <article
          className={`max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-serif leading-tight">
              {blog.title}
            </h1>
            {blog.subtitle && (
              <h2
                className={`text-2xl mb-6 font-serif leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {blog.subtitle}
              </h2>
            )}
            <div className="flex items-center space-x-4 mb-8">
              <img
                src={
                  blog.author?.imageUrl?.url || "/public/assets/icons/react.svg"
                }
                alt={blog.author?.username || "Author"}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-lg">
                  {blog.author?.username || "Unknown"}
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  ·{" "}
                  {Math.ceil(
                    blog.content.replace(/<[^>]+>/g, "").split(" ").length / 200
                  )}{" "}
                  min read
                </p>
              </div>
            </div>
          </header>

          {blog.blogImageUrl?.url && (
            <img
              src={blog.blogImageUrl.url}
              alt={blog.title}
              className="w-full h-auto object-cover rounded-lg mb-8 shadow-md"
            />
          )}

          <div
            className={`prose prose-lg max-w-none ${
              isDarkMode ? "prose-invert" : ""
            }`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(blog.content),
              }}
              className="blog-content"
            />
          </div>

          <footer
            className={`mt-16 pt-8 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 ${
                  liked
                    ? "bg-green-500 text-white"
                    : isDarkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <span>{likeCount}</span>
              </button>
              <Link
                to={`/user/blog/author/${blog.author._id}`}
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "text-green-400 hover:text-green-300"
                    : "text-green-600 hover:text-green-800"
                }`}
              >
                More from {blog.author?.username || "this author"}
              </Link>
            </div>
          </footer>
        </article>
      </div>
      <style jsx>{`
        .blog-content {
          font-family: 'Georgia', serif;
          line-height: 1.8;
          font-size: 20px;
          color: ${isDarkMode ? '#e0e0e0' : '#292929'};
        }
        .blog-content p {
          margin-bottom: 2em;
        }
        .blog-content h2 {
          font-size: 30px;
          font-weight: 700;
          margin-top: 2em;
          margin-bottom: 0.8em;
          font-family: 'Arial', sans-serif;
          color: ${isDarkMode ? '#ffffff' : '#1a202c'};
        }
        .blog-content h3 {
          font-size: 24px;
          font-weight: 600;
          margin-top: 1.5em;
          margin-bottom: 0.6em;
          font-family: 'Arial', sans-serif;
          color: ${isDarkMode ? '#e2e8f0' : '#2d3748'};
        }
        .blog-content blockquote {
          border-left: 3px solid ${isDarkMode ? '#718096' : '#4a5568'};
          padding-left: 20px;
          margin-left: -23px;
          font-style: italic;
          margin-bottom: 2em;
          color: ${isDarkMode ? '#a0aec0' : '#4a5568'};
        }
        .blog-content a {
          color: ${isDarkMode ? '#90cdf4' : '#3182ce'};
          text-decoration: underline;
        }
        .blog-content a:hover {
          color: ${isDarkMode ? '#63b3ed' : '#2c5282'};
        }
        .blog-content strong {
          font-weight: 700;
          color: ${isDarkMode ? '#f7fafc' : '#1a202c'};
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 2em;
          padding-left: 1.5em;
        }
        .blog-content li {
          margin-bottom: 0.5em;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          margin: 2em 0;
          border-radius: 8px;
        }
        .blog-content pre {
          background-color: ${isDarkMode ? '#2d3748' : '#edf2f7'};
          border-radius: 8px;
          padding: 16px;
          overflow-x: auto;
          font-size: 14px;
          margin: 2em 0;
        }
        .blog-content code {
          background-color: ${isDarkMode ? '#2d3748' : '#edf2f7'};
          padding: 2px 4px;
          border-radius: 4px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.9em;
          color: ${isDarkMode ? '#f7fafc' : '#1a202c'};
        }
      `}</style>
    </main>
  );
};

export default function WrappedSingleBlogPage() {
  return (
    <ThemeProvider>
      <SingleBlogPage />
    </ThemeProvider>
  );
}
