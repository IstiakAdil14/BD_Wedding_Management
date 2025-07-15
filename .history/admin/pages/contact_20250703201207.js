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
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/home");
        if (!res.ok) {
          throw new Error("Failed to fetch contact info");
        }
        const data = await res.json();
        if (data.contactInfo) {
          setContactInfo({
            phoneNumbers: data.contactInfo.phoneNumbers || [],
            email: data.contactInfo.email || "",
            businessHours: data.contactInfo.businessHours || "",
            officeLocation: data.contactInfo.officeLocation || "",
            faqs: data.contactInfo.faqs || [],
            socialLinks: {
              facebook: data.contactInfo.socialLinks?.facebook || "",
              instagram: data.contactInfo.socialLinks?.instagram || "",
            },
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
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
    setSaving(true);
    setError(null);
    setSaveSuccess(false);
    try {
      const res = await fetch("/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactInfo: JSON.stringify(contactInfo),
          socialLinks: JSON.stringify(contactInfo.socialLinks),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save contact info");
      }
      setSaveSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
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
          >
            Contact Info / Settings Management
          </motion.h1>

          {loading && <p>Loading contact info...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {saveSuccess && (
            <p className="text-green-600">Contact info saved successfully!</p>
          )}

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
            <h2 className="text-2xl font-semibold mb-4">Email and Business Hours</h2>
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
          </motion.section>
        </motion.main>
      </div>
    </motion.div>
  );
}
