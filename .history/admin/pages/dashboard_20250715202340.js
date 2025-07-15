import React, { useRef, useEffect, useContext, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import CloseIcon from "@mui/icons-material/Close";
import RecentActivityDialog from "../components/RecentActivityDialog";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu"; // Import the new ManagementMenu component
import HamburgerMenu from "../components/HamburgerMenu";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CommentIcon from "@mui/icons-material/Comment";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import Loading from "../components/Loading";
import LogoutLoading from "../components/LogoutLoading";
import IconButton from "@mui/material/IconButton";

export default function Dashboard() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const recentActivityRef = useRef(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const width = useWindowWidth();

  // Add state for admin profile modal
  const [showAdminProfile, setShowAdminProfile] = useState(false);

  // Add state for showing edit profile form inside modal
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Add state for reset password modal
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  // Add state for reset password inputs and status
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState("");

  // Mock loggedInAdmin data (copied from adminUsers.js)
  const [loggedInAdmin, setLoggedInAdmin] = useState({
    id: null,
    name: "",
    email: "",
    role: "User",
    photo: "",
  });

  useEffect(() => {
    // Get logged-in admin email and password from localStorage or other secure storage
    const adminEmail = localStorage.getItem("userEmail") || "admin@example.com";
    const adminPassword = localStorage.getItem("userPassword") || "";

    async function fetchProfile() {
      try {
        // Optionally, verify password here or send it to backend if needed for authentication
        // For now, just fetch profile by email
        const response = await fetch(
          `${
            window.location.origin
          }/api/admin/profile?email=${encodeURIComponent(adminEmail)}`
        );
        if (!response.ok) {
          console.error("Failed to fetch profile data");
          return;
        }
        const data = await response.json();
        setLoggedInAdmin({
          id: null, // id not returned by API currently
          name: data.name || "",
          email: data.email || "",
          role: data.role || "User",
          photo: data.photo || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchProfile();
  }, []);

  async function handleSaveProfile() {
    try {
      const response = await fetch("/api/admin/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loggedInAdmin.email,
          name: loggedInAdmin.name,
          photo: loggedInAdmin.photo,
          role: loggedInAdmin.role,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Failed to save profile");
        return;
      }

      alert("Profile saved successfully");
      setIsEditingProfile(false);
      // After saving, refresh profile data and close modal
      setShowAdminProfile(false);
      // Redirect to profile page to show updated profile
      router.push("/dashboard");
    } catch (error) {
      alert("An error occurred while saving profile");
    }
  }

  // Disable background scrolling when modals are open
  useEffect(() => {
    if (showAdminProfile || showResetPasswordModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showAdminProfile, showResetPasswordModal]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // State for stats and recent activity
  const [stats, setStats] = React.useState({
    events: 0,
    testimonials: 0,
    packages: 0,
    messages: 0,
  });

  React.useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats");
        if (!response.ok) {
          console.error("Failed to fetch stats");
          return;
        }
        const data = await response.json();
        setStats({
          events: data.events || 0,
          testimonials: data.testimonials || 0,
          packages: data.packages || 0,
          messages: data.messages || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    fetchStats();
  }, []);

  const [recentActivities, setRecentActivities] = React.useState([]);

  // New state for selected activity and dialog open
  const [selectedActivity, setSelectedActivity] = React.useState(null);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchRecentActivities() {
      try {
        const response = await fetch("/api/admin/recentActivities");
        if (!response.ok) {
          console.error("Failed to fetch recent activities");
          return;
        }
        const data = await response.json();
        setRecentActivities(data);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    }
    fetchRecentActivities();
  }, []);

  const activityTypeStyles = {
    Portfolio: {
      color: "bg-gradient-to-r from-green-400 to-green-600",
      icon: <PhotoLibraryIcon />,
    },
    Message: {
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      icon: <MessageIcon />,
    },
    Testimonial: {
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      icon: <CommentIcon />,
    },
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await router.push("/");
    } catch (error) {
      console.error("Navigation error during logout:", error);
    }
  };

  // Wheel event handler to scroll horizontally on mouse wheel over recent activity
  useEffect(() => {
    const el = recentActivityRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // Remove early return to fix hooks error
  // Instead conditionally render LogoutLoading inside JSX

  // Remove this early return:
  // if (isLoggingOut) {
  //   return <LogoutLoading />;
  // }

  // Sample data for charts

  const [servicesProvidedData, setServicesProvidedData] = React.useState([]);

  React.useEffect(() => {
    async function fetchServicesByCategory() {
      try {
        const response = await fetch("/api/admin/servicesByCategory");
        if (!response.ok) {
          console.error("Failed to fetch services by category");
          return;
        }
        const data = await response.json();
        setServicesProvidedData(data);
      } catch (error) {
        console.error("Error fetching services by category:", error);
      }
    }
    fetchServicesByCategory();
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  async function handleResetPassword() {
    if (!newPassword || !confirmPassword) {
      setResetError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match.");
      return;
    }
    setResetError("");
    setIsResetting(true);

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminId: loggedInAdmin.id,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setResetError(data.message || "Failed to reset password.");
        setIsResetting(false);
        return;
      }

      // On success, close modal and redirect to profile register page
      setShowResetPasswordModal(false);
      setIsResetting(false);
      router.push("/profile-register");
    } catch (error) {
      setResetError("An error occurred. Please try again.");
      setIsResetting(false);
    }
  }

  async function handleResetPassword() {
    if (!newPassword || !confirmPassword) {
      setResetError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match.");
      return;
    }
    setResetError("");
    setIsResetting(true);

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminId: loggedInAdmin.id,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setResetError(data.message || "Failed to reset password.");
        setIsResetting(false);
        return;
      }

      // On success, close modal and redirect to profile register page
      setShowResetPasswordModal(false);
      setIsResetting(false);
      router.push("/profile-register");
    } catch (error) {
      setResetError("An error occurred. Please try again.");
      setIsResetting(false);
    }
  }
}
