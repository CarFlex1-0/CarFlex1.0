// SearchBar.js
import React from "react";
import { Input } from "@material-tailwind/react";
import { IoMdSearch } from "react-icons/io";
import { useForum } from "@contexts/ForumContext";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useForum();

  const handleSearch = (e) => setSearchQuery(e.target.value);

  return (
    <Input
      type="text"
      placeholder="Search questions..."
      value={searchQuery}
      onChange={handleSearch}
      className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-indigo-500"
      icon={<IoMdSearch className="h-5 w-5 text-indigo-500" />}
    />
  );
};

export default SearchBar;
