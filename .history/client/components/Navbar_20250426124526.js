import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { DarkModeContext } from '../context/DarkModeContext';
import { motion } from 'framer-motion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Hardcoded for demo, replace with real auth logic

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-2xl font-bold text-pink-600">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">Home</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">About</a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">Services</a>
            </Link>
            <Link href="/portfolio" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">Portfolio</a>
            </Link>
            <Link href="/testimonials" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">Testimonials</a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-pink-400 dark:hover:via-red-400 dark:hover:to-yellow-400 transition font-semibold">Contact</a>
            </Link>
            {/* Conditional Signup/Login Button */}
            {isRegistered ? (
              <button
                className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 font-semibold"
                aria-label="Login"
              >
                <LoginIcon />
                <span>Login</span>
              </button>
            ) : (
              <button
                className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 font-semibold"
                aria-label="Signup"
              >
                <PersonAddIcon />
                <span>Signup</span>
              </button>
            )}
          </div>

          {/* Dark mode toggle */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.9 }}
