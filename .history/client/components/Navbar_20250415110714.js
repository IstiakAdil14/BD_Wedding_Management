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
