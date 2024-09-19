// Carousel for viewing BlogList items
import React from "react";
import BlogCard from "@components/BlogCard";



const Carousel = ({ items, title }) => {
  return (
    <div className="flex flex-col justify-center items-center mb-1">
      <h1 className="text-2xl mt-10 p-3 text-center underline max-w-2xl mx-auto lg:text-3xl">
        {title}
      </h1>

      <div className="carousel carousel-center rounded-box w-full mt-5">
        <div className="carousel-item flex gap-5">
          {items.length > 0 ? (
            items.map((item) => <BlogCard key={item._id} item={item} />)
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
