import { useState, useContext } from "react";
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

          {/* Phone Numbers */}
          <motion.section
            className="mb-6 p-4 border rounded shadow"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4">Phone Numbers</h2>
            <ul className="mb-2">
              {contactInfo.phoneNumbers.map((phone, index) => (
                <li key={index} className="flex items-center space-x-2 mb-1">
                  <span>{phone}</span>
                  <button
                    onClick={() => removePhoneNumber(index)}
                    className="text-red-600 hover:underline transition duration-200"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Add new phone number"
              className="p-2 border rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addPhoneNumber}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
            >
              Add Phone Number
            </button>
          </motion.section>

          {/* Email and Business Hours */}
          <motion.section
            className="mb-6 p-4 border rounded shadow"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Email and Business Hours
            </h2>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Business Hours</label>
              <input
                type="text"
                value={contactInfo.businessHours}
                onChange={(e) =>
                  handleContactChange("businessHours", e.target.value)
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.section>

          {/* Office Location */}
          <motion.section
            className="mb-6 p-4 border rounded shadow"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4">Office Location</h2>
            <input
              type="text"
              value={contactInfo.officeLocation}
              onChange={(e) =>
                handleContactChange("officeLocation", e.target.value)
              }
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.section>

          {/* FAQs */}
          <motion.section
            className="mb-6 p-4 border rounded shadow"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
            <ul className="mb-2">
              {contactInfo.faqs.map((faq, index) => (
                <li key={index} className="mb-2 border p-2 rounded">
                  <p className="font-semibold">{faq.question}</p>
                  <p>{faq.answer}</p>
                  <button
                    onClick={() => removeFaq(index)}
                    className="text-red-600 hover:underline mt-1 transition duration-200"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Question"
              value={newFaq.question}
              onChange={(e) =>
                setNewFaq((prev) => ({ ...prev, question: e.target.value }))
              }
              className="p-2 border rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Answer"
              value={newFaq.answer}
              onChange={(e) =>
                setNewFaq((prev) => ({ ...prev, answer: e.target.value }))
              }
              className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button
              onClick={addFaq}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
            >
              Add FAQ
            </button>
          </motion.section>

          {/* Social Media Links */}
          <motion.section
            className="p-4 border rounded shadow"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4">Social Media Links</h2>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Facebook</label>
              <input
                type="url"
                value={contactInfo.socialLinks.facebook}
                onChange={(e) => handleSocialChange("facebook", e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Instagram</label>
              <input
                type="url"
                value={contactInfo.socialLinks.instagram}
                onChange={(e) =>
                  handleSocialChange("instagram", e.target.value)
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://instagram.com/yourpage"
              />
            </div>
          </motion.section>
        </motion.main>
      </div>
    </motion.div>
  );
}
