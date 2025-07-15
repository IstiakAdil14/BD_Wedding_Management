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
    businessHours: [], // changed from string to array of {day, start, end}
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

  // Removed old business hours validity meter state

  useEffect(() => {
    // Fetch contact info from API on mount
    const fetchContactInfo = async () => {
      try {
        const res = await fetch("/api/admin/contactInfo");
        if (!res.ok) {
          throw new Error("Failed to fetch contact info");
        }
        const data = await res.json();
        if (data) {
          // Parse businessHours string to array of objects
          let businessHoursArray = [];
          if (typeof data.businessHours === "string" && data.businessHours.trim() !== "") {
            businessHoursArray = data.businessHours.split(";").map((entry) => {
              const trimmed = entry.trim();
              // Expected format: "Monday 09:00 - 18:00"
              const match = trimmed.match(/^(\w+)\s+(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})$/);
              if (match) {
                return { day: match[1], start: match[2], end: match[3] };
              }
              return null;
            }).filter(Boolean);
          } else if (Array.isArray(data.businessHours)) {
            businessHoursArray = data.businessHours;
          }
          setContactInfo({
            phoneNumbers: data.phoneNumbers || [],
            email: data.email || "",
            businessHours: businessHoursArray,
            officeLocation: data.officeLocation || "",
            faqs: data.faqs || [],
            socialLinks: {
              facebook: data.socialLinks?.facebook || "",
              instagram: data.socialLinks?.instagram || "",
            },
          });
        } else {
          setContactInfo({
            phoneNumbers: [],
            email: "",
            businessHours: [],
            officeLocation: "",
            faqs: [],
            socialLinks: {
              facebook: "",
              instagram: "",
            },
          });
        }
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

  // New handlers for business hours array manipulation
  const addBusinessHour = () => {
    setContactInfo((prev) => ({
      ...prev,
      businessHours: [...prev.businessHours, { day: "Monday", start: "09:00", end: "18:00" }],
    }));
  };

  const updateBusinessHour = (index, field, value) => {
    setContactInfo((prev) => {
      const newBusinessHours = [...prev.businessHours];
      newBusinessHours[index] = { ...newBusinessHours[index], [field]: value };
      return { ...prev, businessHours: newBusinessHours };
    });
  };

  const removeBusinessHour = (index) => {
    setContactInfo((prev) => ({
      ...prev,
      businessHours: prev.businessHours.filter((_, i) => i !== index),
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

  // Validation function for Bangladeshi phone numbers
  const isValidBangladeshiPhoneNumber = (phone) => {
    const bdPhoneRegex = /^(\+8801|01)[0-9]{9}$/;
    return bdPhoneRegex.test(phone);
  };

  const addPhoneNumber = () => {
    if (newPhone.trim() !== "") {
      if (!isValidBangladeshiPhoneNumber(newPhone.trim())) {
        alert("Please enter a valid Bangladeshi phone number.");
        return;
      }
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

  // Removed old validation function for business hours string

  const handleSave = async () => {
    // Convert businessHours array to string format for saving
    const businessHoursString = contactInfo.businessHours
      .map((bh) => `${bh.day} ${bh.start} - ${bh.end}`)
      .join("; ");

    const dataToSave = {
      ...contactInfo,
      businessHours: businessHoursString,
    };

    setIsSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/admin/contactInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
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
          >
            Contact Info / Settings Management
          </motion.h1>

          {/* Contact Information Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>

            {/* Phone Numbers */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Phone Numbers</label>
              <ul className="mb-2">
                {contactInfo.phoneNumbers.map((phone, index) => (
                  <li key={index} className="flex items-center mb-1">
                    <span className="flex-grow">{phone}</span>
                    <button
                      onClick={() => removePhoneNumber(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      aria-label={`Remove phone number ${phone}`}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Add new phone number"
                className={`w-full rounded border p-2 mb-2 ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-600"
                }`}
              />
              <button
                onClick={addPhoneNumber}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Phone Number
              </button>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                className={`w-full rounded border p-2 ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-600"
                }`}
              />
            </div>


            {/* Business Hours */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Business Hours</label>
              {contactInfo.businessHours.map((bh, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <select
                    value={bh.day}
                    onChange={(e) => updateBusinessHour(index, "day", e.target.value)}
                    className={`rounded border p-2 ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-gray-100"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  >
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                  <input
                    type="time"
                    value={bh.start}
                    onChange={(e) => updateBusinessHour(index, "start", e.target.value)}
                    className={`rounded border p-2 ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-gray-100"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  />
                  <span>-</span>
                  <input
                    type="time"
                    value={bh.end}
                    onChange={(e) => updateBusinessHour(index, "end", e.target.value)}
                    className={`rounded border p-2 ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-gray-100"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  />
                  <button
                    onClick={() => removeBusinessHour(index)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Remove business hour entry ${index + 1}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                onClick={addBusinessHour}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Business Hour
              </button>
            </div>

            {/* Office Location */}
            <div className="mb-4">
              <label className="block font-medium mb-2" htmlFor="officeLocation">
                Office Location
              </label>
              <input
                id="officeLocation"
                type="text"
                value={contactInfo.officeLocation}
                onChange={(e) =>
                  handleContactChange("officeLocation", e.target.value)
                }
                className={`w-full rounded border p-2 ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-600"
                }`}
              />
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-3 rounded text-white ${
                  isSaving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSaving ? "Saving..." : "Save Contact Info"}
              </button>
              {saveMessage && (
                <p
                  className={`mt-2 ${
                    saveMessage.includes("Error")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {saveMessage}
                </p>
              )}
            </div>
          </div>
        </motion.main>
      </div>
    </motion.div>
  );
}
