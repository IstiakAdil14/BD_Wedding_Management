import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from "react-icons/fa";

const iconMap = {
  { id: 1, name: "Venue Decoration" },
  { id: 2, name: "Premium Features" },
  { id: 3, name: "Full Planning" },
];

const eventTypes = [
  "WEDDING",
  "reception",
  "Engagement",
  "OTHER",
];

// Rate per guest based on event type
const ratePerGuestByEventType = {
  WEDDING: 500,
  reception: 400,
  Engagement: 300,
  OTHER: 200,
};

const services = categories.map((category) => ({
  id: category.id,
  title: category.name,
  description: `Service for ${category.name}`,
  icon:
    category.name === "Venue Decoration" ? (
      <FaPaintBrush className="w-12 h-12 text-pink-500 mb-4 mx-auto" />
    ) : category.name === "Premium Features" ? (
      <FaUtensils className="w-12 h-12 text-pink-500 mb-4 mx-auto" />
    ) : (
      <FaCamera className="w-12 h-12 text-pink-500 mb-4 mx-auto" />
    ),
}));

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <motion.main
        className="flex-grow max-w-6xl mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-lg leading-relaxed mb-12 max-w-3xl">
          We offer a wide range of wedding planning services to make your
          special day perfect.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {service.description}
              </p>
              <div>
                {eventTypes.map((eventType) => (
                  <div key={eventType} className="mb-2">
                    <span className="font-semibold">{eventType}:</span>{" "}
                    <span className="text-pink-600 dark:text-pink-400 font-medium">
                      BDT {ratePerGuestByEventType[eventType]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Services;
