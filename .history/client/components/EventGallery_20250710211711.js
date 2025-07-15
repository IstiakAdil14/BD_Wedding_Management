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
