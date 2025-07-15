import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

const events = [
  {
    id: 1,
    title: "Traditional Wedding",
    category: "Traditional",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRK6suyN35vvEjRkC5IJNQaCGdP_ioWniww&s",
    description: "A beautiful traditional Bangladeshi wedding ceremony.",
  },
  {
    id: 2,
    title: "Modern Wedding",
    category: "Modern",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ZzmLOiUOG0QrwSeLocAlOr92NiI6BtL5ZQ&s",
    description: "A stylish modern wedding with contemporary decor.",
  },
  {
    id: 3,
    title: "Destination Wedding",
    category: "Destination",
    image:
      "https://tfe-bd.sgp1.cdn.digitaloceanspaces.com/posts/47019/mceu-28270528531718008553640.jpg",
    description: "A romantic destination wedding by the beach.",
  },
  {
    id: 4,
    title: "Traditional Wedding 2",
    category: "Traditional",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvOdjwdqmrMoKabo4Yyzhjd4isVbNedB7rZA&s",
    description: "Another elegant traditional wedding event.",
  },
  {
    id: 5,
    title: "Modern Wedding 2",
    category: "Modern",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFqSfR1BX9xehmzygFKttGDwmkd5IiSKUDiw&s",
    description: "Modern wedding with vibrant colors and lighting.",
  },
];

const Portfolio = () => {
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        const categoryNames = data.map(cat => cat.name);
        setCategories(["All", ...categoryNames]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <main className="flex-grow max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Our Portfolio</h1>
        <div className="mb-8 flex justify-center space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedEvent(event)}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                <p className="text-sm text-pink-600 dark:text-pink-400">
                  {event.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden max-w-3xl w-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-pink-600 dark:text-pink-400 mb-4">
                    {selectedEvent.category}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {selectedEvent.description}
                  </p>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="mt-6 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
