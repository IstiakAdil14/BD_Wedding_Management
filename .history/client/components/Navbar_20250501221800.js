import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CommentIcon from "@mui/icons-material/Comment";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "../context/AuthContext";

const LogoutLoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-transparent animate-fadeIn">
      <div className="bg-white bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-30 p-12 rounded-3xl shadow-[0_0_20px_rgba(124,58,237,0.7)] w-full max-w-md text-center transition-transform transform hover:scale-105">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 dark:border-gray-700 h-20 w-20 mb-8 animate-spin border-red-600 dark:border-red-400 shadow-lg"></div>
          <h2 className="text-4xl font-extrabold mb-6 text-red-700 dark:text-red-400 tracking-wider flex items-center justify-center">
            Logging Out
            <span className="dots ml-3 text-red-600 dark:text-red-300 font-extrabold text-4xl animate-pulse">
              ...
            </span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg font-medium">
            Please wait while we log you out.
          </p>
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 dark:bg-red-500 animate-progressBar"></div>
          </div>
        </div>
        <style jsx>{`
          .loader {
            border-top-color: #dc2626; /* Tailwind red-600 */
            box-shadow: 0 0 15px #dc2626;
          }
          .dots {
            animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
          }
          @keyframes progressBar {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
          .animate-progressBar {
            animation: progressBar 2s linear forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
      setMobileMenuOpen(false);
    }, 3000);
  };

  return (
    <>
      {loading && <LogoutLoadingOverlay />}
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
                <span className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1">
                  <Tooltip title="Home" arrow>
                    <HomeIcon fontSize="large" />
                  </Tooltip>
                </span>
              </Link>
              <Link href="/about" passHref>
                <span className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1">
                  <Tooltip title="About" arrow>
                    <InfoIcon fontSize="large" />
                  </Tooltip>
                </span>
              </Link>
              <Link href="/services" passHref>
                <span className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1">
                  <Tooltip title="Services" arrow>
                    <MiscellaneousServicesIcon fontSize="large" />
                  </Tooltip>
                </span>
              </Link>
              <Link href="/portfolio" passHref>
                <span className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1">
                  <Tooltip title="Portfolio" arrow>
                    <PhotoLibraryIcon fontSize="large" />
                  </Tooltip>
                </span>
              </Link>
              <Link href="/testimonials" passHref>
                <span className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1">
                  <Tooltip title="Testimonials" arrow>
                    <CommentIcon fontSize="large" />
                  </Tooltip>
                </span>
              </Link>
              <Link href="/contact" passHref>
                <span className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1">
                  <Tooltip title="Contact" arrow>
                    <ContactMailIcon fontSize="large" />
                  </Tooltip>
                </span>
              </Link>
              {/* Conditional Login/Signup Button */}
              {!isAuthenticated ? (
                <button
                  className="flex items-center space-x-2 px-3 py-1 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 font-semibold rounded-md transition"
                  aria-label="Login/Signup"
                  onClick={handleLoginClick}
                >
                  <LoginIcon />
                  <span>Login/Signup</span>
                </button>
              ) : (
                <>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <a className="flex items-center space-x-2 px-3 py-1 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 font-semibold rounded-md transition cursor-pointer">
                      <PersonAddIcon />
                      <span>Dashboard</span>
                    </a>
                  </Link>
                  <button
                    className="flex items-center space-x-2 px-3 py-1 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-800 dark:hover:text-red-300 font-semibold rounded-md transition"
                    aria-label="Logout"
                    onClick={handleLogout}
                  >
                    <LogoutIcon />
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
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
                >
                  <HomeIcon fontSize="large" />
                  <span>Home</span>
                </a>
              </Link>
              <Link href="/about" legacyBehavior>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
                >
                  <InfoIcon fontSize="large" />
                  <span>About</span>
                </a>
              </Link>
              <Link href="/services" legacyBehavior>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
                >
                  <MiscellaneousServicesIcon fontSize="large" />
                  <span>Services</span>
                </a>
              </Link>
              <Link href="/portfolio" legacyBehavior>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
                >
                  <PhotoLibraryIcon fontSize="large" />
                  <span>Portfolio</span>
                </a>
              </Link>
              <Link href="/testimonials" legacyBehavior>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
                >
                  <CommentIcon fontSize="large" />
                  <span>Testimonials</span>
                </a>
              </Link>
              <Link href="/contact" legacyBehavior>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
                >
                  <ContactMailIcon fontSize="large" />
                  <span>Contact</span>
                </a>
              </Link>

              {/* Conditional Signup/Login Button */}
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" legacyBehavior>
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
                    >
                      <PersonAddIcon />
                      <span>Dashboard</span>
                    </a>
                  </Link>
                  <button
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-800 dark:hover:text-red-300 transition"
                    aria-label="Logout"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogoutIcon />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
                  aria-label="Login/Signup"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLoginClick();
                  }}
                >
                  <LoginIcon fontSize="large" />
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
    </>
  );
};

export default Navbar;
