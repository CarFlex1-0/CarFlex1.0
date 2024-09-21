import React from "react";
import BlogCard from "@components/BlogCard";

const Carousel = ({ items, title, onDelete, onUpdate }) => {
  return (
    <div className="flex flex-col justify-center items-center mb-1">
      <h1 className="text-2xl mt-10 p-3 text-center underline max-w-2xl mx-auto lg:text-3xl">
        {title}
      </h1>

      <div className="carousel carousel-vertical carousel-center rounded-box w-full my-5-5">
        {items.length > 0 ? (
          items.map((item) => (
            <div className="carousel-item w-full h-full" key={item._id}>
              <BlogCard item={item} onDelete={onDelete} onUpdate={onUpdate} />
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
  );
};

export default Carousel;
