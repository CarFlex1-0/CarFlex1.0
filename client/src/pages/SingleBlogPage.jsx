import React from "react";
import { Link, useParams } from "react-router-dom";
import useBlog from "@hooks/useFetchSingleAndLike";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'css', 'html']
});

const SingleBlogPage = () => {
  const { id } = useParams();
  const { loading, error, blog, liked, likeCount, handleLike } = useBlog(id);

  React.useEffect(() => {
    hljs.highlightAll();
  }, [blog]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching blog:", error);
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-red-600 text-2xl font-serif">{error}</p>
      </div>
    );
  }

  if (!blog) {
    console.warn("No blog found for ID:", id);
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-gray-700 text-2xl font-serif">Article not found</p>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pt-16 pb-10 border-b border-gray-200">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-serif text-gray-900">{blog.title}</h1>
          {blog.subtitle && (
            <h2 className="text-2xl text-gray-600 mb-6 font-serif">{blog.subtitle}</h2>
          )}
          <div className="flex items-center space-x-4">
            <img
              src={blog.author?.imageUrl?.url || "/public/assets/icons/react.svg"}
              alt={blog.author?.username || "Author"}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-lg text-gray-900">
                {blog.author?.username || "Unknown"}
              </p>
              <p className="text-gray-600 text-sm">
                {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · {Math.ceil(blog.content.replace(/<[^>]+>/g, '').split(" ").length / 200)} min read
              </p>
            </div>
          </div>
        </header>
        
        <div className="mt-10">
          {blog.blogImageUrl?.url && (
            <img
              src={blog.blogImageUrl.url}
              alt={blog.title}
              className="w-full h-auto object-cover rounded-lg mb-10 shadow-md"
            />
          )}
          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: blog.content }} 
              className="blog-content"
            />
          </div>
        </div>
        
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 ${
                liked ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              More from {blog.author?.username || "this author"}
            </Link>
          </div>
        </footer>
      </article>
      <style jsx>{`
        .blog-content p {
          margin-bottom: 1.5em;
          line-height: 1.8;
          font-size: 1.1rem;
          color: #333;
        }
        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1em;
          margin-left: 0;
          font-style: italic;
          color: #4b5563;
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 0.25rem;
        }
        .blog-content strong {
          font-weight: 600;
          color: #1f2937;
        }
        .blog-content h2 {
          font-size: 1.8rem;
          margin-top: 2em;
          margin-bottom: 1em;
          font-weight: 700;
          color: #111827;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          font-weight: 600;
          color: #1f2937;
        }
        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
          transition: color 0.2s ease;
        }
        .blog-content a:hover {
          color: #1d4ed8;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5em;
          padding-left: 1.5em;
        }
        .blog-content li {
          margin-bottom: 0.5em;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
          margin: 1.5em 0;
        }
        .blog-content pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 0.375rem;
          overflow-x: auto;
          font-size: 0.9rem;
        }
        .blog-content code {
          background-color: #e5e7eb;
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
      `}</style>
    </main>
  );
};

export default SingleBlogPage;
