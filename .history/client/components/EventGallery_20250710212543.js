import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  {
    id: 1,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA9QL2ZHLD2YXWr0iyxSNYjm-1aTVxoKM2FA&s",
    category: "Wedding",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1612110822013-e97c053f25dc?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Reception",
  },
  {
    id: 3,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0chohVOjwll6tZts6QvozEhDuGV3milR_2g&s",
    category: "Engagement",
  },
  {
    id: 4,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtjyZZ5pvOTfcIJtUEZFYBlhSdR8hssJOqQ&s",
    category: "Wedding",
  },
  {
    id: 5,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKS8I7bkKh5BXfXEGdtg49-y1Ge5X3vv0Wew&s",
    category: "Reception",
  },
  {
    id: 6,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 7,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 8,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 9,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 10,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 11,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 12,

const images = [
  {
    id: 1,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA9QL2ZHLD2YXWr0iyxSNYjm-1aTVxoKM2FA&s",
    category: "Wedding",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1612110822013-e97c053f25dc?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Reception",
  },
  {
    id: 3,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0chohVOjwll6tZts6QvozEhDuGV3milR_2g&s",
    category: "Engagement",
  },
  {
    id: 4,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtjyZZ5pvOTfcIJtUEZFYBlhSdR8hssJOqQ&s",
    category: "Wedding",
  },
  {
    id: 5,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKS8I7bkKh5BXfXEGdtg49-y1Ge5X3vv0Wew&s",
    category: "Reception",
  },
  {
    id: 6,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 7,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 8,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 9,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 10,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 11,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 12,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 13,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 15,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 16,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
  {
    id: 17,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpJ9QFjHRWhgc7lFb3DuvV0xLj7nwyD-9Sg&s",
    category: "Engagement",
  },
];

const EventGallery = () => {
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
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

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

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
              className="rounded-lg cursor-pointer shadow-lg w-[calc(25%-1.5rem)]"
              whileHover={{ scale: 1.05 }}
              onClick={() => setLightboxImage(img.src)}
            />
          ))}
        </motion.div>
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
