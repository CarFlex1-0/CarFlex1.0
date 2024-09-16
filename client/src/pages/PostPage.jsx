import React from "react";
import useFetchBlogs from "../hooks/useFetchBlogs";
import Carousel from "../components/Carousel";
import "../../public/stylesheets/spinner.css";

const PostPage = () => {
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
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center underline max-w-2xl mx-auto lg:text-4xl">
        All Blogs
      </h1>
      <Carousel items={blogs} />
      <Carousel items={recentBlogs} title="Recent Posted" />
    </main>
  );
};

export default PostPage;
