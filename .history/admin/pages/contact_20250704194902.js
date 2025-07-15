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
    phoneNumbers: ["+1 234 567 890"],
    email: "info@weddingplanner.com",
    businessHours: "Mon-Fri 9am - 6pm",
    officeLocation: "123 Wedding St, City, Country",
    faqs: [
      {
        question: "What is your cancellation policy?",
        answer: "You can cancel up to 7 days before the event.",
      },
      {
        question: "Do you offer custom packages?",
        answer: "Yes, we tailor packages to your needs.",
      },
    ],
    socialLinks: {
      facebook: "https://facebook.com/weddingplanner",
      instagram: "https://instagram.com/weddingplanner",
    },
  });

  const [newPhone, setNewPhone] = useState("");
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

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
          >
            Contact Info / Settings Management
          </motion.h1>
        </motion.main>
      </div>
    </motion.div>
  );
}
