import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import tailwindStyles from "../../utils/tailwindStyles";
import AuthModal from "./AuthModalView";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const activePath = location.pathname;

  const jwtToken = Cookies.get("jwtToken");
  const isLogin = jwtToken !== undefined;

  // State to handle mobile/tablet menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle navigation or modal opening
  const handleLinkClick = (path) => {
    console.log("path..", path);
    if (!isLogin) {
      openModal();
    } else {
      console.log(`/user/${path}`);
      navigate(`/user/${path}`); // Use navigate to programmatically route
    }
  };

  const navItems = [
    { path: "postProperties", label: "Post a Property" },
    { path: "mylistings", label: "My Listings" },
    { path: "favorites", label: "My Favourites" },
    { path: "recentlyViewed", label: "Recently Viewed" },
    { path: "notifications", label: "Notifications" },
  ];

  return (
    <>
      <header className="bg-gray-800 text-white py-2  px-4 fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Brand logo */}
          <NavLink to="/user">
            <div>
              <img
                src="/public/rufrent2.png"
                alt="logo"
                className={`${tailwindStyles.logo}`}
              />
            </div>
          </NavLink>

          {/* Mobile/Tablet Menu Toggle */}
          <button
            className="lg:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            &#9776;
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-4 items-center">
            {navItems.map((item) => (
              <button
                key={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activePath === `/user/${item.path}`
                    ? `${tailwindStyles.activeTab} rounded-md font-semibold text-sm`
                    : item.path == `postProperties`
                      ? `bg-white text-gray-900  px-4 py-2 rounded-md font-semibold text-sm`
                      : `font-semibold text-sm`
                }`}
                onClick={() => handleLinkClick(item.path)} // Check login and navigate
              >
                <span>{item.label}</span>
              </button>
            ))}
            {isLogin ? (
              <NavLink
                to="/user/profile"
                className="text-2xl"
                style={{ color: "#FFC156" }}
              >
                <FaUserAlt />
              </NavLink>
            ) : (
              <div>
                <button
                  onClick={openModal}
                  className={`${tailwindStyles.secondaryButton}`}
                >
                  Login
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile/Tablet Nav */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 flex flex-col items-center space-y-4 p-6 transition-all">
            {navItems.map((item) => (
              <button
                key={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`
                }
                onClick={() => handleLinkClick(item.path)} // Check login and navigate
              >
                <span>{item.label}</span>
              </button>
            ))}
            {isLogin ? (
              <NavLink
                to="/user/profile"
                className="text-2xl"
                style={{ color: "#FFC156" }}
              >
                <FaUserAlt />
              </NavLink>
            ) : (
              <div>
                <button
                  onClick={openModal}
                  className={`${tailwindStyles.secondaryButton}`}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
