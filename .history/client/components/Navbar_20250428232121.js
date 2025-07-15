import React, { useContext, useState } from "react";
import Link from "next/link";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CommentIcon from "@mui/icons-material/Comment";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignupClick = () => {
    window.location.href = "/signup";
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Hamburger menu button for small screens */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-2 text-2xl font-bold text-pink-600">
            <EventIcon fontSize="large" />
            <span>BD Wedding Planner</span>
          </div>
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" passHref>
              <span className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold cursor-pointer">
                <HomeIcon fontSize="small" />
                <span>Home</span>
              </span>
            </Link>
            <Link href="/about" passHref>
              <span className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold cursor-pointer">
                <InfoIcon fontSize="small" />
                <span>About</span>
              </span>
            </Link>
            <Link href="/services" passHref>
              <span className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold cursor-pointer">
                <BuildIcon fontSize="small" />
                <span>Services</span>
              </span>
            </Link>
            <Link href="/portfolio" passHref>
              <span className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold cursor-pointer">
                <PhotoLibraryIcon fontSize="small" />
                <span>Portfolio</span>
              </span>
            </Link>
            <Link href="/testimonials" passHref>
              <span className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold cursor-pointer">
                <CommentIcon fontSize="small" />
                <span>Testimonials</span>
              </span>
            </Link>
            <Link href="/contact" passHref>
              <span className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold cursor-pointer">
                <ContactMailIcon fontSize="small" />
                <span>Contact</span>
              </span>
            </Link>
            {/* Conditional Login/Signup Button */}
            {!isAuthenticated ? (
              <button
                className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 font-semibold"
                aria-label="Login/Signup"
                onClick={handleLoginClick}
              >
                <LoginIcon />
                <span>Login/Signup</span>
              </button>
            ) : (
              <>
                <button
                  className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 font-semibold"
                  aria-label="Logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Dark mode toggle */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg focus:outline-none hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition"
              aria-label="Toggle Dark Mode"
              title="Toggle Dark Mode"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="yellow"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 19.778l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden flex justify-start">
          <div className="bg-white dark:bg-gray-800 w-64 h-full p-4 space-y-4 shadow-lg overflow-auto">
            <Link href="/" legacyBehavior>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition"
              >
                <HomeIcon fontSize="small" />
                <span>Home</span>
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition"
              >
                <InfoIcon fontSize="small" />
                <span>About</span>
              </a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition"
              >
                <BuildIcon fontSize="small" />
                <span>Services</span>
              </a>
            </Link>
            <Link href="/portfolio" legacyBehavior>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition"
              >
                <PhotoLibraryIcon fontSize="small" />
                <span>Portfolio</span>
              </a>
            </Link>
            <Link href="/testimonials" legacyBehavior>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition"
              >
                <CommentIcon fontSize="small" />
                <span>Testimonials</span>
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition"
              >
                <ContactMailIcon fontSize="small" />
                <span>Contact</span>
              </a>
            </Link>
            {/* Conditional Signup/Login Button */}
            {isAuthenticated ? (
              <button
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition"
                className=""
                aria-label="Logout"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white rounded-md px-3 py-2 font-semibold"
                aria-label="Login/Signup"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLoginClick();
                }}
              >
                <LoginIcon />
                <span>Login/Signup</span>
              </button>
            )}
          </div>
          <div
            className="flex-grow"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
