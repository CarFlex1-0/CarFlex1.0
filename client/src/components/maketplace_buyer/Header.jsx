import React from "react";
import { FaCarSide } from "react-icons/fa6";

export default function Header({
  setSearchTerm,
  searchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  brands,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  isPriceVisible,
  setIsPriceVisible,
}) {
  
  return (
    <header className="text-white p-4">
      <div className="flex items-center justify-center gap-3">
        {/* Animated car icon */}
        <FaCarSide className="w-10 h-12 animate-car" />
        <h1 className="text-4xl font-bold">
          <span className=" text-indigo-100">
            Car<span className="text-red-600">F</span>lex Marketplace
          </span>
        </h1>
      </div>
      <p className="flex justify-center text-lg mt-2 text-gray-300">
        Your one-stop shop for premium car parts and accessories.
      </p>

      <div className="flex flex-wrap gap-4 mt-5">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for car parts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered border-gray-600 w-2/4 outline-none bg-slate-700"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered bg-slate-700 w-1/4"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Brand Dropdown */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="select select-bordered bg-slate-700 w-72"
        >
          <option value="All">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        {/* <button
          className="btn bg-green-600 text-white hover:bg-orange-400 py-2 px-4 rounded"
          onClick={() => setIsPriceVisible(!isPriceVisible)}
        >
          {isPriceVisible ? "Hide Price Filter" : "Show Price Filter"}
        </button> */}
      </div>

      {/* Price Range Slider */}

      {/* {isPriceVisible && (
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
            className="range [--range-shdw:#16a34a] range-sm"
          />
          <div className="flex justify-between text-xs px-2 mt-1 text-white">
            <span>$0</span>
            <span>$25</span>
            <span>$50</span>
            <span>$75</span>
            <span>$100</span>
          </div>
        </div>
      )} */}
    </header>
  );
}




