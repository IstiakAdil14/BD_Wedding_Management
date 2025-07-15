import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { DarkModeContext } from '../context/DarkModeContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          BD Wedding Planner
        </div>

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
          <div className="flex-shrink-0 text-2xl font-bold text-pink-600"></div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">
                Home
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">
                About
              </a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">
                Services
              </a>
            </Link>
            <Link href="/portfolio" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">
                Portfolio
              </a>
            </Link>
            <Link href="/testimonials" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">
                Testimonials
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">
                Contact
              </a>
            </Link>
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

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-2 pt-2 pb-3 space-y-1 shadow-md">
          <Link href="/" legacyBehavior>
            <a className="block px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition">
              Home
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="block px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition">
              About
            </a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a className="block px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition">
              Services
            </a>
          </Link>
          <Link href="/portfolio" legacyBehavior>
            <a className="block px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition">
              Portfolio
            </a>
          </Link>
          <Link href="/testimonials" legacyBehavior>
            <a className="block px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition">
              Testimonials
            </a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="block px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition">
              Contact
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
