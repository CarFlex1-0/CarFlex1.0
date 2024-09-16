// BlogCard.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BlogCard = ({ item }) => {
  const location = useLocation();

  // Check if we are on the dashboard route
  const isDashboard = location.pathname === "/blog/dashboard";
  const isEditDashboard = location.pathname === "/blog/edit/dashboard";
  const isDeleteDashboard = location.pathname === "/blog/delete/dashboard";
  console.log(isDashboard);

  return (
    <div
      key={item._id}
      className="card card-compact bg-base-100 w-96 shadow-xl mx-5"
    >
      <figure className="relative">
        <img
          src={item.blogImageUrl.url}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>{item.content.slice(0, 100)}...</p>
        <div className="card-actions justify-center">
          {isDashboard && (
            <Link to={`/blog/${item._id}`} className="btn btn-primary glass">
              Read More
            </Link>
          )}

          {isEditDashboard && (
            <>
              <Link
                to={`/blog/${item._id}/edit`}
                className="btn btn-info glass"
              >
                Edit
              </Link>
            </>
          )}
          {isDeleteDashboard && (
            <>
              <Link
                to={`/blog/${item._id}/delete`}
                className="btn btn-error glass"
              >
                Delete Blog
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
