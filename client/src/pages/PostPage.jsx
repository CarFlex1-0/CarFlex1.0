// Display All Blogs and recently published Blogs
// TODO: Show Likes
import React, { useEffect } from "react";
import useFetchBlogs from "@hooks/useFetchBlogs";
import Carousel from "@components/Carousel";
import "../../public/stylesheets/spinner.css";
import { Link, useLocation } from "react-router-dom";

const PostPage = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/blog/dashboard";
  const { loading, error, blogs, recentBlogs } = useFetchBlogs();
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen md:mb-12">
      <Carousel items={blogs} title="All Blogs" />
      {isDashboard && <Carousel items={recentBlogs} title="Recent Posted" />}
    </main>
  );
};

export default PostPage;
