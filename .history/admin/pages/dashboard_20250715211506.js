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
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  // Remove early return for isLoggingOut
  // Instead, render LogoutLoading conditionally inside JSX

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

  // Remove early return for isLoggingOut
  // Instead, render LogoutLoading conditionally inside JSX

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

  return (
    <motion.div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-white via-gray-100 to-white text-gray-900"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex ">
        {/* Side Navbar */}
        {isMounted && width >= 580 ? (
          <motion.nav
            className={`flex flex-col w-60 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
              darkMode
                ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
                : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
            }`}
            variants={containerVariants}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              // Removed overflow: "hidden" to fix sticky menu scrolling issue
            }} // Hide scrollbar
          >
            <ManagementMenu />
            {/* Use the ManagementMenu component to render management items */}
          </motion.nav>
        ) : (
          <div className="p-4 sticky top-0 left-0">
            <HamburgerMenu />
          </div>
        )}

          {/* Main Content */}
          <motion.main
            className="flex-1 p-8 overflow-auto"
            variants={containerVariants}
            style={{ marginLeft: "1rem", paddingTop: "6rem" }}
          >
            {isLoggingOut && (
              <div className<thinking>
The early return for isLoggingOut was removed successfully. Now I need to render the <LogoutLoading /> component conditionally inside the main JSX return of the Dashboard component.

I will add a conditional rendering of <LogoutLoading /> inside the main JSX return, preferably as an overlay div that covers the entire screen when isLoggingOut is true, so it visually appears on top of the dashboard content.

This will fix the rendering issue by keeping the dashboard mounted and showing the logout loading UI properly.

I will proceed with this edit.
</thinking>

<edit_file>
<path>admin/pages/dashboard.js</path>
<content>
SEARCH
            {isLoggingOut && (
              <div className<thinking>
+The early return for isLoggingOut was removed successfully. Now I need to render the <LogoutLoading /> component conditionally inside the main JSX return of the Dashboard component.
+
+I will add a conditional rendering of <LogoutLoading /> inside the main JSX return, preferably as an overlay div that covers the entire screen when isLoggingOut is true, so it visually appears on top of the dashboard content.
+
+This will fix the rendering issue by keeping the dashboard mounted and showing the logout loading UI properly.
+
+I will proceed with this edit.
+</thinking>
+
+<edit_file>
+<path>admin/pages/dashboard.js</path>
+<content>
+<<<<<<< SEARCH
+          {/* Main Content */}
+          <motion.main
+            className="flex-1 p-8 overflow-auto"
+            variants={containerVariants}
+            style={{ marginLeft: "1rem", paddingTop: "6rem" }}
+          >
+            <motion.div
+              className="flex justify-between items-center mb-8"
+              variants={itemVariants}
+            >
+              <h1 className="text-2xl font-extrabold tracking-wide">
+                Welcome, {loggedInAdmin.name || "Admin"}
+              </h1>
+              <div className="flex items-center space-x-4">
+                <button
+                  onClick={toggleDarkMode}
+                  className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
+                  aria-label="Toggle dark mode"
+                >
+                  {darkMode ? (
+                    <Brightness7Icon fontSize="small" />
+                  ) : (
+                    <Brightness4Icon fontSize="small" />
+                  )}
+                </button>
+                <button
+                  onClick={handleLogout}
+                  className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition"
+                  aria-label="Logout"
+                >
+                  <LogoutIcon fontSize="small" />
+                </button>
+                {/* Add button to show admin profile modal */}
+                <button
+                  onClick={() => setShowAdminProfile(true)}
+                  aria-label="View Admin Profile"
+                  className={`rounded-full overflow-hidden w-10 h-10 border-2 border-green-600 hover:border-green-700 transition ${
+                    width === 580 ? "mt-5" : ""
+                  }`}
+                >
+                  <img
+                    src={loggedInAdmin.photo}
+                    alt={`${loggedInAdmin.name || "Admin"} photo`}
+                    className="w-full h-full object-cover rounded-full"
+                  />
+                </button>
+              </div>
+            </motion.div>
+=======
+          {/* Main Content */}
+          <motion.main
+            className="flex-1 p-8 overflow-auto"
+            variants={containerVariants}
+            style={{ marginLeft: "1rem", paddingTop: "6rem" }}
+          >
+            {isLoggingOut && (
+              <div className="fixed inset-0 z-50">
+                <LogoutLoading />
+              </div>
+            )}
+            <motion.div
+              className="flex justify-between items-center mb-8"
+              variants={itemVariants}
+            >
+              <h1 className="text-2xl font-extrabold tracking-wide">
+                Welcome, {loggedInAdmin.name || "Admin"}
+              </h1>
+              <div className="flex items-center space-x-4">
+                <button
+                  onClick={toggleDarkMode}
+                  className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
+                  aria-label="Toggle dark mode"
+                >
+                  {darkMode ? (
+                    <Brightness7Icon fontSize="small" />
+                  ) : (
+                    <Brightness4Icon fontSize="small" />
+                  )}
+                </button>
+                <button
+                  onClick={handleLogout}
+                  className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition"
+                  aria-label="Logout"
+                >
+                  <LogoutIcon fontSize="small" />
+                </button>
+                {/* Add button to show admin profile modal */}
+                <button
+                  onClick={() => setShowAdminProfile(true)}
+                  aria-label="View Admin Profile"
+                  className={`rounded-full overflow-hidden w-10 h-10 border-2 border-green-600 hover:border-green-700 transition ${
+                    width === 580 ? "mt-5" : ""
+                  }`}
+                >
+                  <img
+                    src={loggedInAdmin.photo}
+                    alt={`${loggedInAdmin.name || "Admin"} photo`}
+                    className="w-full h-full object-cover rounded-full"
+                  />
+                </button>
+              </div>
+            </motion.div>
          {/* Main Content */}
          <motion.main
            className="flex-1 p-8 overflow-auto"
            variants={containerVariants}
            style={{ marginLeft: "1rem", paddingTop: "6rem" }}
          >
            <motion.div
              className="flex justify-between items-center mb-8"
              variants={itemVariants}
            >
              <h1 className="text-2xl font-extrabold tracking-wide">
                Welcome, {loggedInAdmin.name || "Admin"}
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Brightness7Icon fontSize="small" />
                  ) : (
                    <Brightness4Icon fontSize="small" />
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition"
                  aria-label="Logout"
                >
                  <LogoutIcon fontSize="small" />
                </button>
                {/* Add button to show admin profile modal */}
                <button
                  onClick={() => setShowAdminProfile(true)}
                  aria-label="View Admin Profile"
                  className={`rounded-full overflow-hidden w-10 h-10 border-2 border-green-600 hover:border-green-700 transition ${
                    width === 580 ? "mt-5" : ""
                  }`}
                >
                  <img
                    src={loggedInAdmin.photo}
                    alt={`${loggedInAdmin.name || "Admin"} photo`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
              </div>
            </motion.div>
=======
          {/* Main Content */}
          <motion.main
            className="flex-1 p-8 overflow-auto"
            variants={containerVariants}
            style={{ marginLeft: "1rem", paddingTop: "6rem" }}
          >
            {isLoggingOut && (
              <div className="fixed inset-0 z-50">
                <LogoutLoading />
              </div>
            )}
            <motion.div
              className="flex justify-between items-center mb-8"
              variants={itemVariants}
            >
              <h1 className="text-2xl font-extrabold tracking-wide">
                Welcome, {loggedInAdmin.name || "Admin"}
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Brightness7Icon fontSize="small" />
                  ) : (
                    <Brightness4Icon fontSize="small" />
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition"
                  aria-label="Logout"
                >
                  <LogoutIcon fontSize="small" />
                </button>
                {/* Add button to show admin profile modal */}
                <button
                  onClick={() => setShowAdminProfile(true)}
                  aria-label="View Admin Profile"
                  className={`rounded-full overflow-hidden w-10 h-10 border-2 border-green-600 hover:border-green-700 transition ${
                    width === 580 ? "mt-5" : ""
                  }`}
                >
                  <img
                    src={loggedInAdmin.photo}
                    alt={`${loggedInAdmin.name || "Admin"} photo`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
              </div>
            </motion.div>

          <motion.section
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
            variants={containerVariants}
          >
            {Object.entries(stats).map(([key, value]) => (
              <motion.div
                key={key}
                className={`p-6 rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                }}
              >
                <h2 className="text-lg font-semibold mb-2 capitalize">
                  {key.replace("_", " ")}
                </h2>
                <p className="text-4xl font-bold">{value}</p>
              </motion.div>
            ))}
          </motion.section>

          {/* New Dashboard Charts Section */}
          <motion.section
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
            variants={containerVariants}
          >
            {/* Services Provided Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Services Provided
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={servicesProvidedData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {servicesProvidedData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          <motion.section variants={containerVariants}>
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <motion.ul
              ref={recentActivityRef}
              className="flex space-x-6 overflow-x-auto max-h-96"
              style={{
                minHeight: "18rem",
                paddingTop: "1rem",
                paddingLeft: "1rem",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              variants={containerVariants}
            >
              {recentActivities.map((activity) => {
                const style = activityTypeStyles[activity.type] || {
                  color: "bg-gray-400",
                  icon: null,
                };
                return (
                  <motion.li
                    key={activity.id}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg cursor-pointer transition-colors duration-300 w-48 h-48 ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
                    }}
                    onClick={() => {
                      setSelectedActivity(activity);
                      setIsActivityDialogOpen(true);
                    }}
                  >
                    <div
                      className={`flex items-center justify-center w-16 h-16 rounded-lg text-white mb-4 ${style.color}`}
                    >
                      {style.icon}
                    </div>
                    <span className="font-semibold text-center text-lg">
                      {activity.title}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {activity.date}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.section>
        </motion.main>
      </div>

      <RecentActivityDialog
        isOpen={isActivityDialogOpen}
        onClose={() => setIsActivityDialogOpen(false)}
        activity={selectedActivity}
      />

      {/* Admin Profile Modal */}
      {showAdminProfile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowAdminProfile(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              onClick={() => setShowAdminProfile(false)}
              className="absolute top-4 right-4"
              aria-label="Close Admin Profile"
              size="large"
              sx={{
                color: "white",
                backgroundColor: "blue",
                "&:hover": { backgroundColor: "red" },
                position: "absolute",
                top: 16,
                right: 16,
              }}
            >
              <CloseIcon />
            </IconButton>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Admin Profile
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={loggedInAdmin.photo || "/default-profile.png"}
                alt={`${loggedInAdmin.name || "Admin"} photo`}
                className="w-20 h-20 rounded-full object-cover"
              />
              {!isEditingProfile ? (
                <div className="flex flex-col flex-grow">
                  <p className="text-xl font-semibold dark:text-white">
                    {loggedInAdmin.name || "No Name"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {loggedInAdmin.email}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col flex-grow">
                  <input
                    type="text"
                    value={loggedInAdmin.name}
                    onChange={(e) =>
                      setLoggedInAdmin((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 mb-2 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter name"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Change Photo
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setLoggedInAdmin((prev) => ({
                              ...prev,
                              photo: reader.result,
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
            <p className="text-gray-900 dark:text-gray-100">
              <strong>Role:</strong> {loggedInAdmin.role}
            </p>
            {/* Add Edit Profile and Reset Password buttons */}
            <div className="mt-6 flex space-x-4 items-center">
              <button
                onClick={() => setShowResetPasswordModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Reset Password
              </button>
              {!isEditingProfile ? (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Update Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Save Profile
                  </button>
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 bg-gray-400 text-gray-800 rounded hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowResetPasswordModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              onClick={() => setShowResetPasswordModal(false)}
              className="absolute top-4 right-4"
              aria-label="Close Reset Password Modal"
              size="large"
              sx={{
                color: "white",
                backgroundColor: "red",
                "&:hover": { backgroundColor: "darkred" },
                position: "absolute",
                top: 16,
                right: 16,
              }}
            >
              <CloseIcon />
            </IconButton>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Reset Password
            </h2>
            <p className="text-gray-900 dark:text-gray-100 mb-4">
              Enter a new password for the admin user.
            </p>
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {resetError && <p className="text-red-600 mb-4">{resetError}</p>}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowResetPasswordModal(false)}
                className="px-4 py-2 bg-gray-400 text-gray-800 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={isResetting}
                className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition ${
                  isResetting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isResetting ? "Resetting..." : "Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

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
