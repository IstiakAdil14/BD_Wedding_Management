import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import useWindowWidth from "../hooks/useWindowWidth";

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

export default function Contact() {
  const { darkMode } = useContext(DarkModeContext);
  const width = useWindowWidth();

  const [contactInfo, setContactInfo] = useState({
    phoneNumbers: [],
    email: "",
    businessHours: "",
    officeLocation: "",
    faqs: [],
    socialLinks: {
      facebook: "",
      instagram: "",
    },
  });

  const [newPhone, setNewPhone] = useState("");
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    // Fetch contact info from API on mount
    const fetchContactInfo = async () => {
      try {
        const res = await fetch("/api/admin/contactInfo");
        if (!res.ok) {
          throw new Error("Failed to fetch contact info");
        }
        const data = await res.json();
        setContactInfo({
          phoneNumbers: data.phoneNumbers || [],
          email: data.email || "",
          businessHours: data.businessHours || "",
          officeLocation: data.officeLocation || "",
          faqs: data.faqs || [],
          socialLinks: {
            facebook: data.socialLinks?.facebook || "",
            instagram: data.socialLinks?.instagram || "",
          },
        });
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };
    fetchContactInfo();
  }, []);

  const handleContactChange = (field, value) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (platform, value) => {
    setContactInfo((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const addPhoneNumber = () => {
    if (newPhone.trim() !== "") {
      setContactInfo((prev) => ({
        ...prev,
        phoneNumbers: [...prev.phoneNumbers, newPhone.trim()],
      }));
      setNewPhone("");
    }
  };

  const removePhoneNumber = (index) => {
    setContactInfo((prev) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
    }));
  };

  const addFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setContactInfo((prev) => ({
        ...prev,
        faqs: [...prev.faqs, { ...newFaq }],
      }));
      setNewFaq({ question: "", answer: "" });
    }
  };

  const removeFaq = (index) => {
    setContactInfo((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/admin/contactInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactInfo),
      });
      if (!res.ok) {
        throw new Error("Failed to save contact info");
      }
      const data = await res.json();
      setSaveMessage("Contact info saved successfully.");
    } catch (error) {
      console.error("Error saving contact info:", error);
      setSaveMessage("Error saving contact info.");
    } finally {
      setIsSaving(false);
    }
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
      <div className="flex flex-1">
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
          className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen"
          variants={itemVariants}
          style={{ marginLeft: "2rem" }}
        >
          <motion.h1
            className="text-3xl font-bold mb-6"
            variants={itemVariants}
