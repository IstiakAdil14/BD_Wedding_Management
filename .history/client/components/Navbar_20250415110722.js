import React, { useContext } from 'react';
import Link from 'next/link';
import { DarkModeContext } from '../context/DarkModeContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-2xl font-bold text-pink-600">
            BD Wedding Planner
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/">
              <a className="text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition">Home</a>
            </Link>
            <Link href="/about">
              <a className="text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition">About</a>
            </Link>
            <Link href="/services">
              <a className="text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition">Services</a>
            </Link>
            <Link href="/portfolio">
              <a className="text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition">Portfolio</a>
            </Link>
            <Link href="/testimonials">
              <a className="text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition">Testimonials</a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-800 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 transition">Contact</a>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
              aria-label="Toggle Dark Mode"
              title="Toggle Dark Mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="yellow" viewBox="0 0 24 24" stroke="currentColor">
