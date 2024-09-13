import React from "react";
import { Link, useLocation } from "react-router-dom";

const StickyNavbar = () => {
  const location = useLocation(); // Get the current location

  // Determine if a link is active based on the current path
  const getLinkClassName = (path) => {
    return location.pathname === path
      ? "md:px-4 md:py-2 text-indigo-500" // Active link styling
      : "md:px-4 md:py-2 hover:text-indigo-400"; // Default link styling
  };

  return (
    <nav className="shadow shadow-gray-300 w-100 px-8 md:px-auto bg-black top-0 sticky">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="text-indigo-500 md:order-1">
          <span className="text-2xl">
            Car<span className="text-red-600">F</span>lex
          </span>
        </div>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-semibold justify-between">
            <li className={getLinkClassName("/")}>
              <Link to="/">Dashboard</Link>
            </li>
            {/* Uncomment and use if needed
            <li className={getLinkClassName("/search")}>
              <Link to="/search">Search</Link>
            </li>
            */}
            <li className={getLinkClassName("/scrap")}>
              <Link to="/scrap">Scrap</Link>
            </li>
            <li className={getLinkClassName("/metric")}>
              <Link to="/metric">Metric</Link>
            </li>
            <li className={getLinkClassName("/model")}>
              <Link to="/model">3D Model</Link>
            </li>
          </ul>
        </div>
        <div className="order-2 md:order-3">
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Login</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavbar;
