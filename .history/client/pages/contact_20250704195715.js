import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { MdSend as SendIcon } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const Contact = () => {
  const { email: authEmail } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: authEmail || "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (authEmail) {
      const fetchProfileData = async () => {
        try {
          const res = await fetch(
            `/api/auth/client-personal-details?email=${encodeURIComponent(
              authEmail
            )}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch profile data");
          }
          const data = await res.json();
          setProfileName(data.fullName || "");
          setFormData((prev) => ({
            ...prev,
            name: data.fullName || "",
            email: authEmail,
          }));
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchProfileData();
    }
  }, [authEmail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowSuccess(true);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to send message.");
      }
    } catch (error) {
      alert("An error occurred while sending the message.");
      console.error("Contact form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    window.location.reload(); // Refresh the page
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <motion.main
        className="flex-grow max-w-4xl mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 lg:col-span-2 flex flex-col"
            style={{ minHeight: "400px" }}
          >
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-5 right-5 max-w-sm w-full bg-white dark:bg-gray-800 border border-green-400 shadow-lg rounded-lg p-4 flex items-center space-x-4 z-50"
                role="alert"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    Success! Thank you for your message!
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleCloseSuccess}
                    className="inline-flex text-green-500 hover:text-green-700 dark:hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded"
                    aria-label="Close"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
            <div className="flex-grow space-y-4">
              <label className="block">
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full h-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:ring-opacity-50 transition"
                />
              </label>
              <label className="block">
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full h-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:ring-opacity-50 transition"
                />
              </label>
              <label className="block">
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  Message
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="8"
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:ring-opacity-50 transition"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading || showSuccess}
              className={`w-full bg-pink-600 dark:bg-pink-700 text-white py-3 text-lg rounded-lg transition mt-6 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                isLoading || showSuccess
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-pink-700 dark:hover:bg-pink-800"
              }`}
            >
              {isLoading ? (
                <>
                  Sending...
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </>
              ) : (
                <>
                  Send Message <SendIcon />
                </>
              )}
            </button>
          </form>

          {/* Contact Info and Map */}
          <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
              Contact Information
            </h2>
            {contactInfo ? (
              <>
                {contactInfo.phoneNumbers && contactInfo.phoneNumbers.length > 0 && (
                  <p>
                    <strong>Phone:</strong> {contactInfo.phoneNumbers.join(", ")}
                  </p>
                )}
                {contactInfo.email && (
                  <p>
                    <strong>Email:</strong> {contactInfo.email}
                  </p>
                )}
                {contactInfo.officeLocation && (
                  <p>
                    <strong>Location:</strong> {contactInfo.officeLocation}
                  </p>
                )}
              </>
            ) : (
              <>
                <p>
                  <strong>Phone:</strong> +880 1234 567890
                </p>
                <p>
                  <strong>Email:</strong> info@bdweddingplanner.com
                </p>
                <p>
                  <strong>Location:</strong> Sylhet, Bangladesh
                </p>
              </>
            )}
          </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                title="BD Wedding Planner Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0000000000005!2d91.87000000000001!3d24.894999999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b0b0b0b0b1%3A0x123456789abcdef!2sSylhet%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.main>

      <div className="w-full max-w-screen-xl mx-auto flex justify-center mt-6 mb-6">
        <a
          href="https://wa.me/8801234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 dark:bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-600 dark:hover:bg-green-800 transition mx-auto shadow-md hover:shadow-lg"
        >
          Chat with us on WhatsApp
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
