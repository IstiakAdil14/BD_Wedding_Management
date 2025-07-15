import { useState, useContext } from "react";
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

  const handleQuickLinkChange = (index, field, value) => {
    const newLinks = [...quickLinks];
    newLinks[index][field] = value;
    setQuickLinks(newLinks);
  };

  const addQuickLink = () => {
    const newId = quickLinks.length
      ? quickLinks[quickLinks.length - 1].id + 1
      : 1;
    setQuickLinks([...quickLinks, { id: newId, text: "", url: "" }]);
  };

  const removeQuickLink = (index) => {
    const newLinks = [...quickLinks];
    newLinks.splice(index, 1);
    setQuickLinks(newLinks);
  };

  const handleSocialLinkChange = (field, value) => {
    setSocialLinks((prev) => ({ ...prev, [field]: value }));
  };

  const saveFooterData = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aboutUs,
          quickLinks,
          contactInfo,
          socialLinks,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save footer data");
      }
      setSuccess("Footer data saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        {window.innerWidth <= 768 ? (
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
              <h3 className="font-semibold mb-2">Quick Links</h3>
              {quickLinks.map((link, index) => (
                <div key={link.id} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={link.text}
                    onChange={(e) =>
                      handleQuickLinkChange(index, "text", e.target.value)
                    }
                    placeholder="Link Text"
                    className="flex-1 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-gray-100"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) =>
                      handleQuickLinkChange(index, "url", e.target.value)
                    }
                    placeholder="Link URL"
                    className="flex-1 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-gray-100"
                  />
                  <button
                    onClick={() => removeQuickLink(index)}
