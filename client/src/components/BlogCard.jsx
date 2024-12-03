// BlogCard.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdReadMore, MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import DOMPurify from "dompurify";
import { useTheme } from "@contexts/ThemeContext";

const BlogCard = ({ item, onDelete }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/user/blog-actions-dashboard";
  const { isDarkMode } = useTheme();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await onDelete(item._id);
    }
  };

  const sanitizedContent = DOMPurify.sanitize(item.content);
  const truncatedContent =
    sanitizedContent.length > 100
      ? sanitizedContent.substr(0, 100) + "..."
      : sanitizedContent;

  return (
    <div
      className={`flex flex-col h-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${
        isDarkMode ? "bg-gray-800/50 text-white hover:bg-gray-700/60 backdrop-blur-sm" : "bg-white text-gray-900"
      }`}
    >
      <div className="relative pb-48 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          src={item.blogImageUrl.url}
          alt={item.title}
        />
      </div>
      <div className="p-4 flex-grow">
        <h2
          className={`text-lg font-semibold mb-2 line-clamp-2 hover:text-indigo-600 transition-colors ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {item.title}
        </h2>
        <p
          className={`text-sm mb-2 line-clamp-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {item.subtitle}
        </p>
        <div
          className={`text-sm line-clamp-3 mb-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />
      </div>
      <div
        className={`p-4 ${
          isDarkMode ? "bg-gray-700/50 backdrop-blur-sm" : "bg-gray-100"
        } flex justify-between items-center`}
      >
        <Link
          to={`/user/blog/${item._id}`}
          className={`flex items-center ${
            isDarkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "text-indigo-600 hover:text-indigo-800"
          } transition-colors duration-300 px-4 py-2 rounded-lg`}
        >
          <MdReadMore className="mr-2" size={20} />
          <span>Read Full Article</span>
        </Link>
        {isDashboard && (
          <div className="flex space-x-2">
            <Link
              to={`/user/blog/${item._id}/edit`}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              } transition-colors`}
            >
              <CiEdit />
            </Link>
            <button
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              } transition-colors`}
              onClick={handleDelete}
            >
              <MdDeleteForever />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
