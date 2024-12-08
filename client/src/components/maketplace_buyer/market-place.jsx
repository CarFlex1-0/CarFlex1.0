import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AnimatedCard from "./AnimatedCard";
import PartsList from "./PartsList";
import Cart from "./Cart";
import Header from "./Header";
import axiosInstance from "@services/axios";
import { Link } from "react-router-dom";

export default function CarPartsMarketplace() {
  const [carParts, setCarParts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCarPartCard, setSelectedCarPartCard] = useState({});
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [priceRange, setPriceRange] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Matches backend pageSize
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "Engine & Drivetrain",
    "Suspension & Steering",
    "Brakes",
    "Electrical & Lighting",
    "Interior Accessories",
    "Wheels & Tires",
  ];
  const brands = ["Honda", "Toyota", "Hyndai", "Kia", "Suzuki", "Daihatsu"];

  useEffect(() => {
    const fetchCarParts = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          keyword: searchTerm || undefined,
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          brand: selectedBrand !== "All" ? selectedBrand : undefined,
        };
        const { data } = await axiosInstance.get("/products", { params });
        setCarParts(data.products);
      } catch (error) {
        setError("Failed to fetch car parts: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarParts();
  }, [currentPage, searchTerm, selectedCategory, selectedBrand]);

  const addToCart = (part) => {
    const existingItem = cart.find((item) => item._id === part._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === part._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalPages = Math.ceil((carParts?.length || 0) / itemsPerPage);

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
        brands={brands}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        isPriceVisible={isPriceVisible}
        setIsPriceVisible={setIsPriceVisible}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white p-4">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-2">Available Parts</h2>
          <div className="flex justify-start mb-4">
            <Link 
              to="/user/order-details" 
              className="flex items-center gap-2 btn btn-outline text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Order History
            </Link>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <PartsList
                setSelectedId={setSelectedId}
                setSelectedCarPartCard={setSelectedCarPartCard}
                addToCart={addToCart}
                currentItems={carParts}
              />
              <div className="mt-8 flex justify-between items-center">
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
            </>
          )}
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
