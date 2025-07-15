import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

export default function ContactForm() {
  const { darkMode } = useContext(DarkModeContext);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Contact form submitted:\n" + JSON.stringify(contactForm, null, 2));
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
          <div className="p-4 sticky top-0 left-0 z-50">
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
            Contact Form Management
          </motion.h1>

          <motion.section className="mb-8" variants={itemVariants}>
            <form onSubmit={handleContactSubmit} className="space-y-4 max-w-md">
              <div>
                <label htmlFor="name" className="block font-semibold mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-semibold mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  className="w-full p-2 border rounded"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
              >
                Submit
              </button>
            </form>
          </motion.section>
        </motion.main>
      </div>
    </motion.div>
  );
}
