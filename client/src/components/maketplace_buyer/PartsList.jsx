import React, { useEffect } from 'react'
import { motion } from "framer-motion";

export default function PartsList({
  setSelectedId,
  setSelectedCarPartCard,
  addToCart,
  currentItems,
}) {
    useEffect(() => {
     console.log("currentItems", currentItems);
    }, [currentItems])
    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentItems.map((part) => (
        <motion.div
          key={part._id}
          className="card backdrop-blur-md bg-white/10 shadow-lg rounded-lg transition-transform transform hover:scale-105"
          layoutId={part._id}
          onClick={() => {
            setSelectedId(part._id);
            setSelectedCarPartCard(part);
          }}
        >
          <figure>
            <motion.img
              src={part.image}
              alt={part.name}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{part.name}</h2>
            <p>
              {part.category} - {part.brand}
            </p>
            <p className="text-2xl font-bold">Rs. {part.price.toFixed(2)}</p>
            <div className="card-actions justify-end">
              <button
                className="btn bg-green-600 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                onClick={(e) => {
                  addToCart(part);
                  e.stopPropagation();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
