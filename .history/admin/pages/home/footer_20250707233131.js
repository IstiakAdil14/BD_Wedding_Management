import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export default function Footer() {
  const { darkMode } = useContext(DarkModeContext);

  const [aboutUs, setAboutUs] = useState([
    {
      type: "paragraph",
      children: [{ text: "BD Wedding Planner is your trusted partner for creating unforgettable wedding experiences. We bring your dream wedding to life with passion and precision." }],
    },
  ]);

  const [editor] = useState(() => withReact(createEditor()));

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

  // New state for email validation error
  const [emailError, setEmailError] = useState("");

  // New state for social links validation errors
  const [socialLinksErrors, setSocialLinksErrors] = useState({});

  const [isMobile, setIsMobile] = useState(false);

  // Validation function for Bangladeshi phone number
  const validateBangladeshiPhone = (phone) => {
    // Remove spaces, dashes, and parentheses
    const cleaned = phone.replace(/[\s\-()]/g, "");
    // Regex for Bangladeshi phone numbers: starts with +880 or 0, followed by 10 digits
    const regex = /^(?:\+8801|01)[3-9]\d{8}$/;
    return regex.test(cleaned);
  };

  // Validation function for email
  const validateEmail = (email) => {
    // More robust email regex pattern
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Validation function for URL
  const validateURL = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // Detect window width on client side
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Fetch footer data on component mount
    const fetchFooterData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/footer");
        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }
        const data = await response.json();
        setAboutUs(data.aboutUs ? JSON.parse(data.aboutUs) : [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ]);
        setQuickLinks(
          data.quickLinks && data.quickLinks.length > 0
            ? data.quickLinks.map((link, index) => ({
                id: index + 1,
                text: link.text,
                url: link.url,
              }))
            : []
        );
        setContactInfo(
          data.contactInfo || { address: "", email: "", phone: "" }
        );
        setSocialLinks(
          data.socialLinks || {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
          }
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFooterData();
  }, []);

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

    // Validate social link URL on input change
    if (value.trim() === "") {
      // Empty value is allowed, clear error
      setSocialLinksErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } else if (!validateURL(value)) {
      setSocialLinksErrors((prev) => ({
        ...prev,
        [field]: "Please enter a valid URL.",
      }));
    } else {
      setSocialLinksErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const saveFooterData = async () => {
    // Validate phone before saving
    if (!validateBangladeshiPhone(contactInfo.phone)) {
      setPhoneError("Please enter a valid Bangladeshi phone number.");
      return;
    } else {
      setPhoneError("");
    }

    // Validate email before saving
    if (!validateEmail(contactInfo.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    // Validate social links before saving
    const newSocialLinksErrors = {};
    Object.entries(socialLinks).forEach(([key, value]) => {
      if (value.trim() !== "" && !validateURL(value)) {
        newSocialLinksErrors[key] = "Please enter a valid URL.";
      }
    });
    if (Object.keys(newSocialLinksErrors).length > 0) {
      setSocialLinksErrors(newSocialLinksErrors);
      return;
    } else {
      setSocialLinksErrors({});
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/footer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aboutUs: JSON.stringify(aboutUs),
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
              <div
                style={{
                  minHeight: "150px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "4px",
                  backgroundColor: darkMode ? "#374151" : "white",
                }}
              >
                <Slate editor={editor} value={aboutUs} onChange={value => setAboutUs(value)}>
                  <Editable
                    placeholder="Enter about us content here..."
                    style={{
                      minHeight: "150px",
                      padding: "8px",
                      border: "none",
                      outline: "none",
                      backgroundColor: darkMode ? "#374151" : "white",
                      color: darkMode ? "white" : "black",
                    }}
                  />
