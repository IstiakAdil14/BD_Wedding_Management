import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

export default function ServicePackages() {
  const { darkMode } = useContext(DarkModeContext);

  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Basic Wedding Package",
      description:
        "Includes venue decoration, photography, and catering for up to 100 guests.",
      price: "BDT 50,000",
      iconName: "",
      enabled: true,
    },
    {
      id: 2,
      title: "Premium Wedding Package",
      description:
        "Includes all Basic features plus live music, bridal makeup, and luxury transport.",
      price: "BDT 1,20,000",
      iconName: "",
      enabled: true,
    },
    {
      id: 3,
      title: "Ultimate Wedding Package",
      description:
        "Full wedding planning, premium venue, entertainment, and personalized services.",
      price: "BDT 2,50,000",
      iconName: "",
      enabled: true,
    },
    {
      id: 4,
      title: "Customize Package",
      description: "",
      price: "",
      iconName: "",
      enabled: true,
    },
  ]);

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

        <motion.main
          className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ml-2 md:ml-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-3xl font-bold mb-6"
            variants={itemVariants}
          >
            Service Packages Management
          </motion.h1>

          <motion.section className="mb-8" variants={itemVariants}>
            <div className="space-y-4">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="p-4 rounded-lg shadow-lg border border-pink-300"
                >
                  <label className="block font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    value={pkg.title}
                    onChange={(e) => {
                      const newPackages = [...packages];
                      newPackages[index] = {
                        ...newPackages[index],
                        title: e.target.value,
                      };
                      setPackages(newPackages);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
