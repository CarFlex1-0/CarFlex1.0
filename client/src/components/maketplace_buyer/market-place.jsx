import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdShoppingCartCheckout } from "react-icons/md";
import AnimatedCard from "./AnimatedCard";

// Dummy data for car parts
const carParts = [
  {
    id: 1,
    name: "Brake Pads",
    price: 45.99,
    category: "Brakes",
    brand: "Bosch",
    rating: 4.5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZD5La4iqawhOWCnwPl87o8C2apgsMXO018w&s",
  },
  {
    id: 2,
    name: "Oil Filter",
    price: 8.99,
    category: "Engine",
    brand: "Fram",
    rating: 4.2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtPZhaouoO01n_XVpet2LOixJsw_brfVYkCg&s",
  },
  {
    id: 3,
    name: "Spark Plugs",
    price: 12.99,
    category: "Ignition",
    brand: "NGK",
    rating: 4.7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgi9fKH4oyw24dz2iLmOg5-FP7eihZR8K1rw&s",
  },
  {
    id: 4,
    name: "Air Filter",
    price: 15.99,
    category: "Engine",
    brand: "K&N",
    rating: 4.8,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKp_WhE5G7mTYMQxCjOVd6UMISi5S_AvUdPA&s",
  },
  {
    id: 5,
    name: "Wiper Blades",
    price: 24.99,
    category: "Exterior",
    brand: "Bosch",
    rating: 4.3,
    image: "https://m.media-amazon.com/images/I/41577q+QqIL._AC_.jpg",
  },
  {
    id: 6,
    name: "Headlight Bulb",
    price: 19.99,
    category: "Lighting",
    brand: "Sylvania",
    rating: 4.6,
    image:
      "https://images.philips.com/is/image/philipsconsumer/a08a1023d494402595e6afab00621d57?wid=700&hei=700&$pnglarge$",
  },
];

const categories = [...new Set(carParts.map((part) => part.category))];
const brands = [...new Set(carParts.map((part) => part.brand))];

export default function CarPartsMarketplace() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCarPartCard, setSelectedCarPartCard] = useState({});
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState(100);
  const [sortBy, setSortBy] = useState("name");

  const addToCart = (part) => {
    const existingItem = cart.find((item) => item.id === part.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...part, quantity: 1 }]);
    }
  };

  const removeFromCart = (partId) => {
    setCart(cart.filter((item) => item.id !== partId));
  };

  const updateQuantity = (partId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(partId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === partId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const filteredParts = carParts
    .filter((part) =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((part) =>
      selectedCategory === "All" ? true : part.category === selectedCategory
    )
    .filter((part) =>
      selectedBrand === "All" ? true : part.brand === selectedBrand
    )
    .filter((part) => part.price <= priceRange)
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <header className=" text-white p-4">
        <h1 className="text-4xl font-bold">Car Parts Marketplace</h1>
        <div className="flex flex-wrap gap-4 mt-5">
          <input
            type="text"
            placeholder="Search for car parts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered border-gray-300 w-2/4 bg-slate-800"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered bg-slate-800"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="select select-bordered bg-slate-800"
          >
            <option value="All">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered bg-slate-800"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="label">
            <span className="label-text">Max Price: ${priceRange}</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="range range-success"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Available Parts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParts.map((part) => (
              <motion.div
                key={part.id}
                className="card bg-blue-900 shadow-lg rounded-lg transition-transform transform hover:scale-105"
                layoutId={part.id}
                onClick={() => {
                  setSelectedId(part.id);
                  setSelectedCarPartCard(part);
                }}
              >
                <figure>
                  <motion.img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1, rotate: 5 }} // Scale the image and slightly rotate it on hover
                    transition={{ duration: 0.3 }} // Smooth transition
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{part.name}</h2>
                  <p>
                    {part.category} - {part.brand}
                  </p>
                  <div className="flex items-center">
                    <div className="rating rating-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={star}
                          type="radio"
                          name={`rating-${part.id}`}
                          className="mask mask-star-2 bg-orange-400"
                          checked={Math.round(part.rating) === star}
                          readOnly
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">
                      {part.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">${part.price.toFixed(2)}</p>
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
        </div>

        <div className="bg-blue-900 p-4 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <span className="flex-grow">
                      {item.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      className="btn btn-xs ml-4 me-5 bg-orange-600 text-white hover:text-white"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="input input-xs w-16"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-lg">
                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
              </p>
              <div className="mt-6 flex justify-center">
                <button className="btn btn-wide btn-success text-white">
                  <MdShoppingCartCheckout size={20}/>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <AnimatedCard
            selectedCarPartCard={selectedCarPartCard}
            setSelectedId={setSelectedId}
            addToCart={addToCart}
          />
        )}
      </AnimatePresence>
      <footer className="text-white text-center py-4 pt-5">
        <p>&copy; 2024 CarFlex Marketplace. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
