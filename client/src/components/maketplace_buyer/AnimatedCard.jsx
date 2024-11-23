import React from 'react'
import { motion } from "framer-motion";
export default function AnimatedCard({ selectedCarPartCard, setSelectedId, addToCart }) {
  return (
    <motion.div
      layoutId={selectedCarPartCard.id}
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center"
      onClick={() => setSelectedId(null)}
    >
      <motion.div
        className="p-4  backdrop-blur-md bg-white/10 rounded-lg w-full max-w-md text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <figure>
          <img
            src={selectedCarPartCard.image}
            alt={selectedCarPartCard.name}
            className="w-full h-48 object-cover"
          />
        </figure>

        <h2 className="text-3xl font-bold mb-4">{selectedCarPartCard.name}</h2>
        <p>
          {selectedCarPartCard.category} - {selectedCarPartCard.brand}
        </p>
        <p className="text-2xl font-bold">
          Rs. {selectedCarPartCard.price.toFixed(2)}
        </p>
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-success text-white"
            onClick={() => addToCart(selectedCarPartCard)}
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
