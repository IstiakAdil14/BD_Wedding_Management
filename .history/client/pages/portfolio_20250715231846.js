import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import CloseIcon from "@mui/icons-material/Close";

const Portfolio = () => {
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (
      !selectedEvent ||
      !selectedEvent.images ||
      selectedEvent.images.length <= 1
    ) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % selectedEvent.images.length
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedEvent]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        const categoryNames = data.map((cat) => cat.name);
        setCategories(["All", ...categoryNames]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <main className="flex-grow max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Our Portfolio</h1>
        <div className="mb-8 flex justify-center space-x-4 flex-wrap sm:space-x-4 sm:justify-center overflow-x-auto scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div>
          <motion.div
            className="flex space-x-2 overflow-x-scroll pb-4 scrollbar-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollbarColor: "transparent transparent",
              WebkitOverflowScrolling: "touch",
              overflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitScrollbar: { display: "none" },
            }}
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            dragElastic={0.1}
            whileTap={{ cursor: "grabbing" }}
            onMouseMove={(e) => {
              const container = e.currentTarget;
              const rect = container.getBoundingClientRect();
            {filteredEvents.map((event) => (
              <motion.div
                key={event._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 flex flex-col items-center text-center w-[calc((100vw-32px)/2)] sm:w-[calc((100vw-64px)/5)] min-w-[calc((100vw-32px)/2)] sm:min-w-[300px] flex-shrink-0 cursor-grab mt-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => {
                  setSelectedEvent(event);
                  setCurrentImageIndex(0);
                }}
              >
                <img
                  src={
                    event.images && event.images.length > 0
                      ? event.images[0]
                      : ""
                  }
                  alt={event.title}
                  className="w-full h-32 sm:h-40 object-cover mb-4"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-pink-700 dark:text-pink-200 mb-1">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-pink-600 dark:text-pink-400">
                  {event.category}
                </p>
              </motion.div>
            ))}
          </motion.div>
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
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden max-w-7xl w-full relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 transition duration-300 ease-in-out transform hover:scale-110"
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
                <img
                  src={
                    selectedEvent.images && selectedEvent.images.length > 0
                      ? selectedEvent.images[currentImageIndex]
                      : ""
                  }
                  alt={selectedEvent.title}
                  className="w-full h-64 sm:h-96 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-pink-600 dark:text-pink-400 mb-4">
                    {selectedEvent.category}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap text-sm sm:text-base">
                    {(() => {
                      try {
                        const rawContent = JSON.parse(
                          selectedEvent.description
                        );
                        if (rawContent && rawContent.blocks) {
                          return rawContent.blocks
                            .map((block) => block.text)
                            .join("\n");
                        }
                        return selectedEvent.description;
                      } catch (e) {
                        return selectedEvent.description;
                      }
                    })()}
                  </p>
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
