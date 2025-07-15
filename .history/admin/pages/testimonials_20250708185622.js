import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import TestimonialDialog from "../components/TestimonialDialog";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import { DarkModeContext } from "../context/DarkModeContext";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const TestimonialsPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const width = useWindowWidth();

  const [hasMounted, setHasMounted] = useState(false);

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      } else {
        console.error("Failed to fetch testimonials");
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleAddClick = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const handleEditClick = (testimonial) => {
    setEditData(testimonial);
    setDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchTestimonials();
      } else {
        console.error("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleDisplayToggle = async (id, currentDisplay) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ display: !currentDisplay }),
      });
      if (res.ok) {
        fetchTestimonials();
      } else {
        console.error("Failed to update display status");
      }
    } catch (error) {
      console.error("Error updating display status:", error);
    }
  };

  const handleSave = async (data) => {
    try {
      const method = data._id ? "PUT" : "POST";
      const url = data._id
        ? `/api/testimonials/${data._id}`
        : "/api/testimonials";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setDialogOpen(false);
        fetchTestimonials();
      } else {
        console.error("Failed to save testimonial");
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  return (
    <motion.div
      className={`flex h-fullscreen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Side Navbar */}
      {hasMounted && (width >= 580 ? (
        <motion.nav
          className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
            darkMode
              ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
              : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
          }`}
          variants={itemVariants}
        >
          <ManagementMenu />
        </motion.nav>
      ) : (
        <div className="p-4 sticky top-0 left-0">
          <HamburgerMenu />
        </div>
      ))}

      {/* Main Content */}
      <motion.main
        className="flex-1 p-6 md:p-8 overflow-auto h-screen max-h-screen"
        variants={itemVariants}
        style={{ marginLeft: "2rem" }}

export default TestimonialsPage;
