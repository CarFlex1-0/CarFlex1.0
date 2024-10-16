import React from "react";

export default function LoadingSkeleton({ size }) {
  return (
    <div className="flex flex-col gap-4 ">
      {Array.from({ length: size }).map((_, index) => (
        <div
          key={index}
          className="skeleton h-28 w-full backdrop-blur-md bg-white/5 p-4"
        ></div>
      ))}
    </div>
  );
}
