import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";

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

export default function Settings() {
  const { darkMode } = useContext(DarkModeContext);
  const width = useWindowWidth();

  const [settings, setSettings] = useState({
    darkModeEnabled: true,
    logo: null,
    favicon: null,
    siteTitle: "My Wedding Site",
    seoMetaTitle: "Best Wedding Planning Services",
    seoMetaDescription:
      "We provide the best wedding planning services for your special day.",
    adminPassword: "",
  });

  const [newLogo, setNewLogo] = useState(null);
  const [newFavicon, setNewFavicon] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewLogo(imageUrl);
      setSettings((prev) => ({ ...prev, logo: imageUrl }));
    }
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewFavicon(imageUrl);
      setSettings((prev) => ({ ...prev, favicon: imageUrl }));
    }
  };

  const handlePasswordChange = (e) => {
    setSettings((prev) => ({ ...prev, adminPassword: e.target.value }));
  };

  const handleSaveSettings = () => {
    alert("Settings saved (mock implementation).");
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
      {width >= 580 ? (
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
        <div className="p-4 sticky top-0 left-0">
          <HamburgerMenu />
        </div>
      )}

      {/* Main Content */}
      <motion.main
        className={`flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
        variants={itemVariants}
        style={{ marginLeft: "2rem" }}
      >
        <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
          Settings Management
        </motion.h1>

        <motion.section className="mb-6" variants={itemVariants}>
          <label
            className={`flex items-center space-x-3 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            <input
              type="checkbox"
              name="darkModeEnabled"
              checked={settings.darkModeEnabled}
              onChange={handleInputChange}
              className="form-checkbox"
            />
            <span>Enable Dark Mode Globally</span>
          </label>
        </motion.section>

        <motion.section className="mb-6" variants={itemVariants}>
          <h2
            className={`text-2xl font-semibold mb-4 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Logo
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className={darkMode ? "text-gray-100" : "text-gray-900"}
          />
          {newLogo && (
            <img
              src={newLogo}
              alt="Logo"
              className="mt-2 max-h-20 object-contain"
            />
          )}
        </motion.section>

        <motion.section className="mb-6" variants={itemVariants}>
          <h2
            className={`text-2xl font-semibold mb-4 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Favicon
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFaviconChange}
            className={darkMode ? "text-gray-100" : "text-gray-900"}
          />
          {newFavicon && (
            <img
              src={newFavicon}
              alt="Favicon"
              className="mt-2 max-h-10 object-contain"
            />
          )}
        </motion.section>

        <motion.section className="mb-6" variants={itemVariants}>
          <label
            className={`block font-semibold mb-1 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Site Title
          </label>
          <input
            type="text"
            name="siteTitle"
            value={settings.siteTitle}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "text-gray-100 bg-gray-700 border-gray-600"
                : "text-gray-900 bg-white border-gray-300"
            }`}
          />
        </motion.section>

        <motion.section className="mb-6" variants={itemVariants}>
          <label
            className={`block font-semibold mb-1 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            SEO Meta Title
          </label>
          <input
            type="text"
            name="seoMetaTitle"
            value={settings.seoMetaTitle}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "text-gray-100 bg-gray-700 border-gray-600"
                : "text-gray-900 bg-white border-gray-300"
            }`}
          />
        </motion.section>

        <motion.section className="mb-6" variants={itemVariants}>
          <label
            className={`block font-semibold mb-1 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            SEO Meta Description
          </label>
          <textarea
            name="seoMetaDescription"
            value={settings.seoMetaDescription}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "text-gray-100 bg-gray-700 border-gray-600"
                : "text-gray-900 bg-white border-gray-300"
            }`}
            rows={3}
          />
        </motion.section>

        <motion.section className="mb-6" variants={itemVariants}>
          <label
            className={`block font-semibold mb-1 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Admin Password Reset
          </label>
          <input
            type="password"
            name="adminPassword"
            value={settings.adminPassword}
            onChange={handlePasswordChange}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "text-gray-100 bg-gray-700 border-gray-600"
                : "text-gray-900 bg-white border-gray-300"
            }`}
            placeholder="Enter new password"
          />
        </motion.section>

        <button
          onClick={handleSaveSettings}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </motion.main>
    </motion.div>
  );
}
