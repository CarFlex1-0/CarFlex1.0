// BlogCard.js
// TODO: List not re-freshing 
// TODO: Flex wrap
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "@services/axios";
import { Bounce, Slide, Zoom } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const BlogCard = ({ item }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      if (confirm("Are you sure you want to delete")) {
        const res = await axios.delete(`/blogs/${item._id}`);
        toast.success("Blog deleted successfully!", {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
          transition: Slide,
        });
        
        navigate("/blog/dashboard");
      } else {
        toast("Blog delete was unsuccessful", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      console.log("Error deleting blog post:", error);
      toast.error("An error occurred while deleting the blog post", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      
    }
  };

  const location = useLocation();

  // Check if we are on the dashboard route
  // TODO: Change conditional rendering with user state (I think backend Change)
  const isDashboard = location.pathname === "/blog/dashboard";
  const isEditDashboard = location.pathname === "/blog/edit/dashboard";
  const isDeleteDashboard = location.pathname === "/blog/delete/dashboard";
  // console.log(isDashboard);

  return (
    <>
      
      <div
        key={item._id}
        className="card card-compact bg-base-100 w-96 shadow-xl mx-5"
      >
        <figure className="relative">
          <img
            src={item.blogImageUrl.url}
            alt={item.title}
            className={
              isDashboard
                ? "w-full h-48 object-cover"
                : "w-full h-60 object-cover flex-wrap"
            }
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
                <Link className="btn btn-error glass" onClick={handleDelete}>
                  Delete Blog
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
