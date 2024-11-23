import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AnimatedCard from "./AnimatedCard";
import PartsList from "./PartsList";
import Cart from "./Cart";
import Header from "./Header";

export default function CarPartsMarketplace() {
  const [carParts, setCarParts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCarPartCard, setSelectedCarPartCard] = useState({});
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState(100);
  const [sortBy, setSortBy] = useState("name");
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarParts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCarParts(data);
        console.log(data)
      } catch (error) {
        setError("Failed to fetch car parts: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarParts();
  }, []);

 const addToCart = (part) => {
   const existingItem = cart.find((item) => item._id === part._id);
   if (existingItem) {
     setCart(
       cart.map((item) =>
         item._id === part._id ? { ...item, quantity: item.quantity + 1 } : item
       )
     );
   } else {
     setCart([...cart, { ...part, quantity: 1 }]);
   }
 };


  const removeFromCart = (partId) => {
    setCart(cart.filter((item) => item._id !== partId));
  };

 const updateQuantity = (partId, newQuantity) => {
   if (newQuantity === 0) {
     removeFromCart(partId);
   } else {
     setCart(
       cart.map((item) =>
         item._id === partId ? { ...item, quantity: newQuantity } : item
       )
     );
   }
 };



  const categories = [...new Set(carParts.map((part) => part.category))];
  const brands = [...new Set(carParts.map((part) => part.brand))];

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

  const totalItems = filteredParts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems =
    filteredParts.length > 0 ? filteredParts.slice(startIdx, endIdx) : [];
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-4">
      <Header
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        setSelectedBrand={setSelectedBrand}
        selectedBrand={selectedBrand}
        brands={brands}
        sortBy={sortBy}
        setSortBy={setSortBy}
        isPriceVisible={isPriceVisible}
        setIsPriceVisible={setIsPriceVisible}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Available Parts</h2>
          <PartsList
            setSelectedId={setSelectedId}
            setSelectedCarPartCard={setSelectedCarPartCard}
            addToCart={addToCart}
            currentItems={carParts}
          />
          <div className="mt-8 flex justify-between items-center ">
            <button
              className={`btn text-white ${
                currentPage === 1 ? "btn-disabled" : ""
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-lg">
              Page {currentPage} of {totalPages}
            </p>
            <button
              className={`btn text-white ${
                currentPage === totalPages ? "btn-disabled" : ""
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          totalPrice={totalPrice}
        />
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
