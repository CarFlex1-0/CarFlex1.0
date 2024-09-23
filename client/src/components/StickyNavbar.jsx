import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";
import Cookies from "js-cookie"; // Import JS Cookies

const StickyNavbar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const getLinkClassName = (path) => {
    return location.pathname === path
      ? "md:px-4 md:py-2 text-indigo-500"
      : "md:px-4 md:py-2 hover:text-indigo-400";
  };

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  const userImageUrl = user ? user.imageUrl.url : null;

  const defaultAvatarUrl =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"; // Default avatar URL
  const avatarSrc = userImageUrl ? userImageUrl : defaultAvatarUrl; // Use user image or default

  // const avatarSrc =
  //   "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"; // TODO: Change with upper logic after cookie updating

  return (
    <nav className="z-50 shadow shadow-gray-300 w-100 px-8 md:px-auto bg-black top-0 sticky">
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
            <li className={getLinkClassName("/feedback")}>
              <Link to="/feedback">Feedback</Link>
            </li>
            <li className={getLinkClassName("/scrap")}>
              <Link to="/scrap">Scrap</Link>
            </li>
            <li className={getLinkClassName("/metric")}>
              <Link to="/metric">Metric</Link>
            </li>
            <li className={getLinkClassName("/model")}>
              <Link to="/model">3D Model</Link>
            </li>
            <li className={getLinkClassName("/subscription")}>
              <Link to="/subscription">Subscription</Link>
            </li>
            {/* Blog Dropdown */}
            <li className="relative">
              <button
                className="md:px-4 md:py-2 hover:text-indigo-400 text-gray-500 flex items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                Blog
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 bg-gray-800 text-gray-300 rounded-box shadow-lg w-48">
                  <li>
                    <Link
                      to="/blog/dashboard"
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      View
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog/create"
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog/actions/dashboard"
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Blogs
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="order-2 md:order-3 flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={avatarSrc} // Use the dynamic avatar source
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => {
                    navigate("/profile-page");
                  }}
                >
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavbar;
