import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdReadMore, MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import DOMPurify from 'dompurify';

const FeaturedBlogCard = ({ item, onDelete, onUpdate }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/user/blog-actions-dashboard";

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await onDelete(item._id);
    }
  };

  const sanitizedContent = DOMPurify.sanitize(item.content);
  const truncatedContent = sanitizedContent.length > 200 
    ? sanitizedContent.substr(0, 200) + '...'
    : sanitizedContent;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/2">
          <img
            className="h-64 w-full object-cover md:h-full md:w-full"
            src={item.blogImageUrl.url}
            alt={item.title}
          />
        </div>
        <div className="p-8 md:w-1/2">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Featured</div>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {item.title}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{item.subtitle}</p>
          <div 
            className="mt-4 text-gray-700 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: truncatedContent }}
          />
          <div className="mt-6 flex items-center justify-between">
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
      </div>
    </div>
  );
};

export default FeaturedBlogCard;
