import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";
import CloseIcon from "@mui/icons-material/Close";

export default function Footer() {
  const { darkMode } = useContext(DarkModeContext);

  const [aboutUs, setAboutUs] = useState(
    "BD Wedding Planner is your trusted partner for creating unforgettable wedding experiences. We bring your dream wedding to life with passion and precision."
  );

  const [quickLinks, setQuickLinks] = useState([
    { id: 1, text: "About", url: "/about" },
    { id: 2, text: "Services", url: "/services" },
    { id: 3, text: "Portfolio", url: "/portfolio" },
    { id: 4, text: "Contact", url: "/contact" },
  ]);

  const [contactInfo, setContactInfo] = useState({
    address: "123 Wedding St, Dhaka, Bangladesh",
    email: "info@bdweddingplanner.com",
    phone: "+880 1234 567890",
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New state for phone validation error
  const [phoneError, setPhoneError] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  // Validation function for Bangladeshi phone number
  const validateBangladeshiPhone = (phone) => {
    // Remove spaces, dashes, and parentheses
    const cleaned = phone.replace(/[\s\-()]/g, "");

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

  return (
    <motion.div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-1">
        {/* Sidebar */}
        {isMobile ? (
          <div className="p-4 mr-4 sticky top-0 left-0 z-50">
            <HamburgerMenu />
          </div>
        ) : (
          <motion.nav
            className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-visible rounded-r-lg ${
              darkMode
                ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
                : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
            }`}
            variants={itemVariants}
          >
            <ManagementMenu />
          </motion.nav>
        )}

        <motion.main
          className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ml-0 md:ml-72"
          variants={itemVariants}
        >
          <motion.h1
            className="text-3xl font-bold mb-6"
            variants={itemVariants}
          >
            Footer Management
          </motion.h1>

          <motion.section className="mb-8" variants={itemVariants}>
            {loading && (
              <p className="mb-4 text-blue-600 font-semibold">
                Loading footer data...
              </p>
            )}
            <div className="mb-4">
              <label className="block font-semibold mb-1">About Us</label>
              <textarea
                value={aboutUs}
                onChange={(e) => setAboutUs(e.target.value)}
                className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-gray-100"
                rows={4}
              />
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Contact Info</h3>
              <label className="block font-semibold mb-1">Address</label>
              <input
                type="text"
                value={contactInfo.address}
                onChange={(e) =>
                  setContactInfo((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded mb-2 bg-white text-black dark:bg-gray-700 dark:text-gray-100"
              />
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded mb-2 bg-white text-black dark:bg-gray-700 dark:text-gray-100"
              />
              <label className="block font-semibold mb-1">Phone</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Social Media Links</h3>
              {Object.entries(socialLinks).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <label className="block font-semibold mb-1 capitalize">
                    {key}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleSocialLinkChange(key, e.target.value)
                    }
                    className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={saveFooterData}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              {error && (
                <p className="mt-2 text-red-600 font-semibold">{error}</p>
              )}
              {success && (
                <p className="mt-2 text-green-600 font-semibold">{success}</p>
              )}
            </div>
          </motion.section>
        </motion.main>
      </div>
    </motion.div>
  );
}
