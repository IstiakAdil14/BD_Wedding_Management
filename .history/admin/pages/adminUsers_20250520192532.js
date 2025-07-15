import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import useWindowWidth from "../hooks/useWindowWidth";
import { FiX } from "react-icons/fi";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

export default function AdminUsers() {
  const { darkMode } = useContext(DarkModeContext);
  const windowWidth = useWindowWidth();

  const [admins, setAdmins] = useState([]);
  const [isMounted, setIsMounted] = React.useState(false);
  const [userRole, setUserRole] = useState(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await fetch("/api/admin/adminUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch admin users");
        }
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    }
    fetchAdmins();
  }, []);

  React.useEffect(() => {
    async function fetchUserRole() {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          setUserRole(null);
          return;
        }
        const response = await fetch(
          `/api/admin/profile?email=${encodeURIComponent(userEmail)}`
        );
        if (!response.ok) {
          setUserRole(null);
          return;
        }
        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole(null);
      }
    }
    fetchUserRole();
  }, []);

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Add state for image viewer
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [imageViewerPhoto, setImageViewerPhoto] = useState(null);

  // Function to handle image click to open viewer
  const handleImageClick = (photo) => {
    setImageViewerPhoto(photo);
    setShowImageViewer(true);
    setSelectedAdmin(null);
  };

  return (
    <motion.div
      className={`flex h-fullscreen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Side Navbar */}
      {isMounted && windowWidth >= 580 ? (
        <motion.nav
          className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
            darkMode
              ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
              : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
          }`}
          variants={itemVariants}
        >
          <ManagementMenu />
        </motion.nav>
      ) : (
        <div className="p-4 sticky top-0 left-0 z-50">
          <HamburgerMenu />
        </div>
      )}

      {/* Main Content */}
      <motion.main
        className={`flex-1 p-4 md:p-8 mt-20 overflow-auto h-screen max-h-screen ${
          windowWidth < 580 ? "ml-16" : ""
        }`}
        variants={itemVariants}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100"
          variants={itemVariants}
        >
          Admin Users Management
        </motion.h1>
        {/* Admins List */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">Existing Admin Users</h2>
          {admins.length === 0 ? (
            <p>No admin users added yet.</p>
          ) : (
            <ul className="space-y-4">
              {admins.map((admin) => (
                <li
                  key={admin.id}
                  className="border p-4 rounded shadow flex items-center space-x-4"
                >
                  {admin.photo && (
                    <img
                      src={admin.photo}
                      alt={`${admin.name || "Admin"} photo`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p>
                      <strong>Email:</strong> {admin.email}
                    </p>
                    <p>
                      <strong>Role:</strong> {admin.role}
                    </p>

                    <button
                      onClick={() => setSelectedAdmin(admin)}
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
        {userRole === "Full Access" && (
          <div className="fixed top-36 right-10 w-40 z-50 bg-transparent">
            <button
              onClick={() => (window.location.href = "/signup")}
              className="w-full bg-green-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 flex items-center justify-center space-x-2"
              style={{ pointerEvents: "auto" }}
            >
              <PersonAddIcon />
              <span>New Admin</span>
            </button>
          </div>
        )}
      </motion.main>

      {selectedAdmin && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedAdmin(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAdmin(null)}
              className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold text-lg"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Admin Details
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              {selectedAdmin.photo && (
                <img
                  src={selectedAdmin.photo}
                  alt={`${selectedAdmin.name || "Admin"} photo`}
                  className="w-20 h-20 rounded-full object-cover cursor-pointer"
                  onClick={() => {
                    handleImageClick(selectedAdmin.photo);
                  }}
                />
              )}
              <div>
                <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {selectedAdmin.name || "No Name"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedAdmin.email}
                </p>
              </div>
            </div>
            <p className="text-gray-900 dark:text-gray-100">
              <strong>Role:</strong> {selectedAdmin.role}
            </p>
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
      {showImageViewer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60"
          onClick={() => setShowImageViewer(false)}
        >
          <div
            className="relative bg-white dark:bg-gray-800 p-4 rounded shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageViewer(false)}
              className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold text-lg"
            >
              X
            </button>
            <img
              src={imageViewerPhoto}
              alt="Admin large view"
              className="max-h-[80vh] w-full object-contain rounded"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
