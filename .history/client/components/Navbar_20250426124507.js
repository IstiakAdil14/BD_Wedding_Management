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
