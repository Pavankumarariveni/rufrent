import { useState } from "react"; // Importing useState hook from React
import { Link } from "react-router-dom"; // Importing Link component for navigation

import { IoMenu } from "react-icons/io5";

import tailwindStyles from "../../utils/tailwindStyles"; // Importing custom Tailwind CSS styles
import AuthModal from "../CommonViews/AuthModalView"; // Importing the authentication modal component

const InitialHeaderView = () => {
  // State to control the visibility of the authentication modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open & close the Login/signup modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to toggle the mobile menu visibility
  const toggleMenu = () => {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  };

  return (
    <>
      <header
        className={`${tailwindStyles.header} p-3 pl-16 pr-16 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-md`}
      >
        <div>
          <img
            src="public/rufrent2.png"
            alt="logo"
            className={`${tailwindStyles.logo}`}
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-10 justify-between items-center">
          <a href="#home" className="hover:text-gray-400">
            Home
          </a>
          <a href="#about" className="hover:text-gray-400">
            About
          </a>
          <a href="#wc" className="hover:text-gray-400">
            Why Choose
          </a>
        </nav>
        {/* Buttons for desktop */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/user-landing">
            <button className={`${tailwindStyles.secondaryButton}`}>
              View Properties
            </button>
          </Link>

          <button
            onClick={openModal}
            className={`${tailwindStyles.secondaryButton}`}
          >
            Post A Property
          </button>

          <button
            onClick={openModal}
            className={`${tailwindStyles.secondaryButton}`}
          >
            Login
          </button>
        </div>

        {/* Hamburger Icon for Mobile */}

        <button
          onClick={toggleMenu}
          className="lg:hidden text-2xl focus:outline-none"
        >
          {/* <IoMenu className="w-6 h-6" /> */}
          &#9776;
        </button>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className="fixed top-0 left-0 w-full hidden lg:hidden bg-gray-800 text-white p-4 space-y-4 mt-16 z-50"
        >
          <a
            href="#home"
            onClick={toggleMenu}
            className="block hover:text-gray-400"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={toggleMenu}
            className="block hover:text-gray-400"
          >
            About
          </a>
          <a
            href="#wc"
            onClick={toggleMenu}
            className="block hover:text-gray-400"
          >
            Why Choose
          </a>
          <button
            onClick={() => {
              openModal();
              toggleMenu();
            }}
            className={`${tailwindStyles.secondaryButton}`}
          >
            Login
          </button>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 ml-0">
            <Link to="/user">
              <button className={`${tailwindStyles.secondaryButton}`}>
                View Properties
              </button>
            </Link>

            <button
              onClick={() => {
                openModal();
                toggleMenu();
              }}
              className={`${tailwindStyles.secondaryButton}`}
            >
              Post A Property
            </button>
          </div>
        </div>
      </header>

      {/* Authentication Modal */}
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default InitialHeaderView;
