import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const EventGallery = () => {
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch PortfolioEvents from API
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);

        // Extract unique categories from events
        const uniqueCategories = Array.from(new Set(data.map(event => event.category)));
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  // Filter events by selected category
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter(event => event.category === selectedCategory);

  // Flatten images from filtered events
  const filteredImages = filteredEvents.flatMap(event =>
    event.images.map((imgSrc, index) => ({
      id: `${event._id}-${index}`,
      src: imgSrc,
      category: event.category,
    }))
  );

  useEffect(() => {
    const el = containerRef.current;
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
    <section id="portfolio" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-pink-700 dark:text-pink-300 mb-8">
          Event Gallery
        </h2>
        <div className="mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`mx-2 px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === cat
                  ? "bg-pink-600 text-white"
                  : "bg-pink-200 dark:bg-pink-700 text-pink-700 dark:text-pink-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <motion.div
          ref={containerRef}
          className="flex flex-wrap gap-6 overflow-x-scroll pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          whileTap={{ cursor: "grabbing" }}
        >
          {filteredImages.slice(0, 8).map((img) => (
            <motion.img
              key={img.id}
              src={img.src}
              alt={img.category}
