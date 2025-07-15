import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Portfolio = () => {
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState("");
  const [lightboxDescription, setLightboxDescription] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch events from API
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
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  // Auto slide lightbox images every 2 seconds
  useEffect(() => {
    if (lightboxImages.length === 0) return;
    const interval = setInterval(() => {
      setLightboxCurrentIndex((prevIndex) => (prevIndex + 1) % lightboxImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [lightboxImages]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <main className="flex-grow max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Our Portfolio</h1>
        <div className="mb-8 flex justify-center">
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
          {filteredImages.slice(0, 4).map((img) => (
            <motion.img
              key={img.id}
              src={img.src}
              alt={img.category}
              className="rounded-lg cursor-pointer shadow-lg w-[calc(50%-1.5rem)] sm:w-[calc(25%-1.5rem)]"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                // Find the event for this image
                const event = filteredEvents.find(ev =>
                  ev.images.includes(img.src)
                );
                if (event && event.images.length > 0) {
                  setLightboxImages(event.images);
                  setLightboxCurrentIndex(0);
                  setLightboxTitle(event.title);
                  setLightboxDescription(event.description);
                } else {
                  setLightboxImages([img.src]);
                  setLightboxCurrentIndex(0);
                  setLightboxTitle("");
                  setLightboxDescription("");
                }
              }}
            />
          ))}
        </motion.div>
      </main>

      {lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => {
            setLightboxImages([]);
            setLightboxCurrentIndex(0);
          }}
        >
          <div className="max-w-4xl mx-auto text-center text-white">
            <h3 className="text-2xl font-bold mb-2">{lightboxTitle}</h3>
            <p className="mb-4 whitespace-pre-wrap">
              {(() => {
                try {
                  const rawContent = JSON.parse(lightboxDescription);
                  if (rawContent && rawContent.blocks) {
                    return rawContent.blocks.map(block => block.text).join('\n');
                  }
                  return lightboxDescription;
                } catch (e) {
                  return lightboxDescription;
                }
              })()}
            </p>
            <img
              src={lightboxImages[lightboxCurrentIndex]}
              alt="Lightbox"
              className="w-full h-[500px] object-contain rounded-lg mx-auto"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Portfolio;
