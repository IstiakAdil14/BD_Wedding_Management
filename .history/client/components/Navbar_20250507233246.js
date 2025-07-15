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

const Navbar = ({ profilePicture }) => {
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

export default Navbar;
