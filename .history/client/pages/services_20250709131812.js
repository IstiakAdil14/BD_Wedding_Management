import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from "react-icons/fa";

const iconMap = {
  FaPaintBrush: (
    <FaPaintBrush className="w-12 h-12 text-pink-500 mb-4 mx-auto" />
  ),
  FaUtensils: <FaUtensils className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  FaCamera: <FaCamera className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  FaMusic: <FaMusic className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
};

const eventTypes = ["WEDDING", "reception", "Engagement", "OTHER"];

// Rate per guest based on event type
const ratePerGuestByEventType = {
  WEDDING: 500,
  reception: 400,
  Engagement: 300,
  OTHER: 200,
};

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (id) => {
    window.location.href = `/services/${id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <motion.main
        className="flex-grow max-w-full md:max-w-7xl lg:max-w-6xl xl:max-w-5xl mx-auto p-4 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-lg leading-relaxed mb-12 max-w-3xl">
          We offer a wide range of wedding planning services to make your
          special day perfect.
        </p>
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              className="flex space-x-6 overflow-x-scroll pb-4 scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              whileTap={{ cursor: "grabbing" }}
              onMouseMove={(e) => {
                const container = e.currentTarget;
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the container
                const scrollWidth = container.scrollWidth - container.clientWidth;
      <Footer />
    </div>
  );
};

export default Services;
