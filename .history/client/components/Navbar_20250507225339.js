 import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
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
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { useAuth } from "../context/AuthContext";

import LogoutLoadingOverlay from "./LogoutLoadingOverlay";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const {
    isAuthenticated,
    logout,
    clientDetailsSaved,
    passwordSet,
    setLoggingOut,
  } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
    setMobileMenuOpen(false);
    setHideNavbar(true);
    setLoading(true);
    setLoggingOut(true);
    setTimeout(() => {
      logout();
      setLoading(false);
      setHideNavbar(false);
      setLoggingOut(false);
      window.location.href = "/";
    }, 3000);
  };
<<<<<<< REPLACE
SEARCH
-<<<<<<< REPLACE
-<<<<<<< SEARCH
-              {/* Profile dropdown */}
-+                 {/* 
-+                   Implement hover to show dropdown menu
-+                 */}
-+                {(() => {
-+                  const [profileOpen, setProfileOpen] = React.useState(false);
-+                  return (
-              <div
-                className="relative inline-block text-left"
-                onMouseEnter={() => setProfileOpen(true)}
-                onMouseLeave={() => setProfileOpen(false)}
-              >
-                <button
-                  type="button"
-                  className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
-                  id="menu-button"
-                  aria-expanded={profileOpen}
-                  aria-haspopup="true"
-                  onClick={() => setMobileMenuOpen(false)}
-                >
-                  Profile
-                  <svg
-                    className="-mr-1 ml-2 h-5 w-5"
-                    xmlns="http://www.w3.org/2000/svg"
-                    viewBox="0 0 20 20"
-                    fill="currentColor"
-                    aria-hidden="true"
-                  >
-                    <path
-                      fillRule="evenodd"
-                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
-                      clipRule="evenodd"
-                    />
-                  </svg>
-                </button>
-
-                {profileOpen && (
-                  <div
-                    className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
-                    role="menu"
-                    aria-orientation="vertical"
-                    aria-labelledby="menu-button"
-                    tabIndex={-1}
-                  >
-                    <div className="py-1" role="none">
-                      <Link
-                        href="/dashboard"
-                        onClick={() => setMobileMenuOpen(false)}
-                        className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300"
-                        role="menuitem"
-                        tabIndex={-1}
-                        id="menu-item-0"
-                      >
-                        Dashboard
-                      </Link>
-                      <button
-                        onClick={handleLogout}
-                        className="text-red-700 dark:text-red-400 block w-full text-left px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-800 dark:hover:text-red-300"
-                        role="menuitem"
-                        tabIndex={-1}
-                        id="menu-item-1"
-                      >
-                        Logout
-                      </button>
-                    </div>
-                  </div>
-                )}
-              </div>
-=======
+              <div
+                className="relative inline-block text-left"
+                onMouseEnter={() => setProfileOpen(true)}
+                onMouseLeave={() => setProfileOpen(false)}
+              >
+                <button
+                  type="button"
+                  className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
+                  id="menu-button"
+                  aria-expanded={profileOpen}
+                  aria-haspopup="true"
+                  onClick={() => setMobileMenuOpen(false)}
+                >
+                  Profile
+                  <svg
+                    className="-mr-1 ml-2 h-5 w-5"
+                    xmlns="http://www.w3.org/2000/svg"
+                    viewBox="0 0 20 20"
+                    fill="currentColor"
+                    aria-hidden="true"
+                  >
+                    <path
+                      fillRule="evenodd"
              {/* Profile dropdown */}
+                 {/* 
+                   Implement hover to show dropdown menu
+                 */}
+                {(() => {
+                  const [profileOpen, setProfileOpen] = React.useState(false);
+                  return (
              <div
                className="relative inline-block text-left"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  id="menu-button"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {profileOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-red-700 dark:text-red-400 block w-full text-left px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-800 dark:hover:text-red-300"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-1"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
+                  );
+                })()}
=======
              <div
                className="relative inline-block text-left"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  id="menu-button"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {profileOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-red-700 dark:text-red-400 block w-full text-left px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-800 dark:hover:text-red-300"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-1"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

  const handleSignupClick = () => {
    window.location.href = "/signup";
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleLogout = () => {
    setMobileMenuOpen(false);
    setHideNavbar(true);
    setLoading(true);
    setLoggingOut(true);
    setTimeout(() => {
      logout();
      setLoading(false);
      setHideNavbar(false);
      setLoggingOut(false);
      window.location.href = "/";
    }, 3000);
  };

  return (
    <>
      {loading && <LogoutLoadingOverlay />}
      <nav
        className={`bg-white dark:bg-gray-800 shadow-md relative z-50 ${
          hideNavbar ? "hidden" : ""
        } md:block`}
      >
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
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1"
              >
                <Tooltip title="Home" arrow>
                  <HomeIcon fontSize="large" />
                </Tooltip>
              </Link>
              <Link
                href="/about"
                className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1"
              >
                <Tooltip title="About" arrow>
                  <InfoIcon fontSize="large" />
                </Tooltip>
              </Link>
              <Link
                href="/services"
                className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1"
              >
                <Tooltip title="Services" arrow>
                  <MiscellaneousServicesIcon fontSize="large" />
                </Tooltip>
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1"
              >
                <Tooltip title="Portfolio" arrow>
                  <PhotoLibraryIcon fontSize="large" />
                </Tooltip>
              </Link>
              <Link
                href="/testimonials"
                className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1"
              >
                <Tooltip title="Testimonials" arrow>
                  <CommentIcon fontSize="large" />
                </Tooltip>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1"
              >
                <Tooltip title="Contact" arrow>
                  <ContactMailIcon fontSize="large" />
                </Tooltip>
              </Link>
              {/* Conditional Login/Signup Button */}
              {!isAuthenticated || !passwordSet ? (
                <Tooltip title="Login/Signup" arrow>
                  <button
                    className="flex items-center space-x-2 px-3 py-1 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 font-semibold rounded-md transition"
                    aria-label="Login/Signup"
                    onClick={handleLoginClick}
                  >
                    <LoginIcon fontSize="large" />
                  </button>
                </Tooltip>
              ) : (
                <>
                  {/* Profile dropdown */}
+                 {/*
+                   Implement hover to show dropdown menu
+                 */}
+                {(() => {
+                  const [profileOpen, setProfileOpen] = React.useState(false);
+                  return (
+                    <div
+                      className="relative inline-block text-left"
+                      onMouseEnter={() => setProfileOpen(true)}
+                      onMouseLeave={() => setProfileOpen(false)}
+                    >
+                      <button
+                        type="button"
+                        className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
+                        id="menu-button"
+                        aria-expanded={profileOpen}
+                        aria-haspopup="true"
+                        onClick={() => setMobileMenuOpen(false)}
+                      >
+                        Profile
+                        <svg
+                          className="-mr-1 ml-2 h-5 w-5"
+                          xmlns="http://www.w3.org/2000/svg"
+                          viewBox="0 0 20 20"
+                          fill="currentColor"
+                          aria-hidden="true"
+                        >
+                          <path
+                            fillRule="evenodd"
+                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
+                            clipRule="evenodd"
+                          />
+                        </svg>
+                      </button>
+
+                      {profileOpen && (
+                        <div
+                          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
+                          role="menu"
+                          aria-orientation="vertical"
+                          aria-labelledby="menu-button"
+                          tabIndex={-1}
+                        >
+                          <div className="py-1" role="none">
+                            <Link
+                              href="/dashboard"
+                              onClick={() => setMobileMenuOpen(false)}
+                              className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300"
+                              role="menuitem"
+                              tabIndex={-1}
+                              id="menu-item-0"
+                            >
+                              Dashboard
+                            </Link>
+                            <button
+                              onClick={handleLogout}
+                              className="text-red-700 dark:text-red-400 block w-full text-left px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-800 dark:hover:text-red-300"
+                              role="menuitem"
+                              tabIndex={-1}
+                              id="menu-item-1"
+                            >
+                              Logout
+                            </button>
+                          </div>
+                        </div>
+                      )}
+                    </div>
+                  );
+                })()}
                </>
              )}
            </div>

            {/* Dark mode toggle */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleDarkMode}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full shadow-lg focus:outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                    : "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
                }`}
                aria-label="Toggle Dark Mode"
                title="Toggle Dark Mode"
              >
                {darkMode ? (
                  <NightsStayIcon className="h-6 w-6" />
                ) : (
                  <WbSunnyIcon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden flex justify-start">
            <div className="bg-white dark:bg-gray-800 w-64 h-full p-4 space-y-4 shadow-lg overflow-auto">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
              >
                <HomeIcon fontSize="large" />
                <span>Home</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
              >
                <InfoIcon fontSize="large" />
                <span>About</span>
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
              >
                <MiscellaneousServicesIcon fontSize="large" />
                <span>Services</span>
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
              >
                <PhotoLibraryIcon fontSize="large" />
                <span>Portfolio</span>
              </Link>
              <Link
                href="/testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
              >
                <CommentIcon fontSize="large" />
                <span>Testimonials</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
              >
                <ContactMailIcon fontSize="large" />
                <span>Contact</span>
              </Link>

              {/* Conditional Signup/Login Button */}
              {!isAuthenticated || !passwordSet ? (
                <button
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition"
                  aria-label="Login/Signup"
                  onClick={handleLoginClick}
                >
                  <LoginIcon fontSize="large" />
                  <span>Login/Signup</span>
                </button>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-600 dark:hover:text-pink-300 transition font-semibold cursor-pointer rounded-md px-2 py-1"
                  >
                    <Tooltip title="Dashboard" arrow>
                      <SpaceDashboardIcon fontSize="large" />
                    </Tooltip>
                    <span>Dashboard</span>
                  </Link>
                  <button
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-800 dark:hover:text-red-300 transition"
                    aria-label="Logout"
                    onClick={handleLogout}
                  >
                    <LogoutIcon fontSize="large" />
                    Logout
                  </button>
                </>
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
