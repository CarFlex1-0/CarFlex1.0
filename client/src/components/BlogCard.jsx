// BlogCard.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdReadMore, MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import DOMPurify from 'dompurify';

const BlogCard = ({ item, onDelete }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/user/blog-actions-dashboard";

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await onDelete(item._id);
    }
  };

  const sanitizedContent = DOMPurify.sanitize(item.content);
  const truncatedContent = sanitizedContent.length > 100 
    ? sanitizedContent.substr(0, 100) + '...'
    : sanitizedContent;

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
      <div className="relative pb-48 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          src={item.blogImageUrl.url}
          alt={item.title}
        />
      </div>
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          {item.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
          {item.subtitle}
        </p>
        <div 
          className="text-sm text-gray-700 dark:text-gray-200 line-clamp-3 mb-4"
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />
      </div>
      <div className="p-4 bg-gray-100 dark:bg-gray-700 flex justify-between items-center">
        <Link
          to={`/user/blog/${item._id}`}
          className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
        >
          <MdReadMore className="mr-2" />
          <span>Read More</span>
        </Link>
        {isDashboard && (
          <div className="flex space-x-2">
            <Link
              to={`/user/blog/${item._id}/edit`}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            >
              <CiEdit />
            </Link>
            <button
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
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
