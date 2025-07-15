import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const {
    isAuthenticated,
    logout,
    clientDetailsSaved,
    passwordSet,
    setLoggingOut,
    email,
  } = useAuth();

  const [profileRegistered, setProfileRegistered] = React.useState(false);

  React.useEffect(() => {
    const registered = localStorage.getItem("profileRegistered");
    // Show profile button after login regardless of profileRegistered flag
    if (isAuthenticated) {
      setProfileRegistered(true);
    } else {
      setProfileRegistered(registered === "true");
    }
  }, [isAuthenticated]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
