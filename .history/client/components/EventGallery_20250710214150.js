import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const EventGallery = () => {
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  // Auto slide images every 2 seconds
  useEffect(() => {
    if (filteredImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [filteredImages]);

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
        <div className="relative w-full max-w-4xl mx-auto">
          {filteredImages.length > 0 && (
            <motion.img
              key={filteredImages[currentImageIndex]?.id}
              src={filteredImages[currentImageIndex]?.src}
              alt={filteredImages[currentImageIndex]?.category}
              className="rounded-lg cursor-pointer shadow-lg w-full max-h-[500px] object-cover mx-auto"
              whileHover={{ scale: 1.05 }}
              onClick={() => setLightboxImage(filteredImages[currentImageIndex]?.src)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Lightbox"
            className="max-h-full max-w-full rounded-lg"
          />
        </div>
      )}
    </section>
  );
};


export default EventGallery;

