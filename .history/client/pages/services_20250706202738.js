import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from "react-icons/fa";

const iconMap = {
  FaPaintBrush: <FaPaintBrush className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  FaUtensils: <FaUtensils className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  FaCamera: <FaCamera className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  FaMusic: <FaMusic className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
};

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

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
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
              key={service._id}
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
