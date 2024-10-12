import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdReadMore, MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import DOMPurify from 'dompurify';
import { useTheme } from "@contexts/ThemeContext";

const FeaturedBlogCard = ({ item, onDelete, onUpdate }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/user/blog-actions-dashboard";
  const { isDarkMode } = useTheme();

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
    <div className={`
      bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl overflow-hidden
      ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
      transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1
    `}>
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-2/5 relative overflow-hidden">
          <img
            className="h-64 w-full object-cover md:h-full md:w-full transition-transform duration-300 hover:scale-105"
            src={item.blogImageUrl.url}
            alt={item.title}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Link
              to={`/user/blog/${item._id}`}
              className="text-white text-lg font-semibold bg-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
            >
              Read More
            </Link>
          </div>
        </div>
        <div className="p-8 md:w-3/5">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Featured</div>
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white hover:text-indigo-400' : 'text-gray-900 hover:text-indigo-600'} transition-colors duration-300`}>
            {item.title}
          </h2>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.subtitle}</p>
          <div 
            className={`text-sm mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} line-clamp-3`}
            dangerouslySetInnerHTML={{ __html: truncatedContent }}
          />
          <div className="flex items-center justify-between">
            <Link
              to={`/user/blog/${item._id}`}
              className={`flex items-center ${
                isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'
              } transition-colors duration-300`}
            >
              <MdReadMore className="mr-2" size={20} />
              <span>Read Full Article</span>
            </Link>
            {isDashboard && (
              <div className="flex space-x-2">
                <Link
                  to={`/user/blog/${item._id}/edit`}
                  className={`p-2 rounded-full ${
                    isDarkMode ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  } transition-colors duration-300`}
                >
                  <CiEdit size={20} />
                </Link>
                <button
                  className={`p-2 rounded-full ${
                    isDarkMode ? 'bg-red-900 text-red-200 hover:bg-red-800' : 'bg-red-100 text-red-600 hover:bg-red-200'
                  } transition-colors duration-300`}
                  onClick={handleDelete}
                >
                  <MdDeleteForever size={20} />
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
