// BlogCard.js

import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdReadMore } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const BlogCard = ({ item, onDelete }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/user/blog-actions-dashboard"; // Check if the URL is the dashboard
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await onDelete(item._id);
    }
  };

  

  return (
    <>
      <figure className="mx-auto w-full p-6 max-sm:pb-0 sm:max-w-[12rem] sm:pe-0">
        <img
          src={item.blogImageUrl.url}
          alt={item.title}
          className="w-full h-24 object-scale-down  border-base-content bg-base-300 rounded-btn border border-opacity-5"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-2">{item.title}</h2>
        <p className="text-xs opacity-60 line-clamp-3">{item.content}</p>
      </div>
      <div className="flex justify-center items-center space-x-3 px-2">
        <Link
          to={`/blog/${item._id}`}
          className="rounded-box p-3 hover:bg-green-300 btn-primary glass"
        >
          <MdReadMore />
        </Link>

        {isDashboard && ( // Only show buttons if on the dashboard
          <>
            <Link
              to={`/blog/${item._id}/edit`}
              className="rounded-box p-3 hover:bg-blue-300 btn-primary glass"
            >
              <CiEdit />
            </Link>
            <button
              className="rounded-box p-3 hover:bg-red-300 btn-primary glass"
              onClick={handleDelete}
            >
              <MdDeleteForever />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default BlogCard;
