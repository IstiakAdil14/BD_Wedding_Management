import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

export default function Testimonials() {
  const { darkMode } = useContext(DarkModeContext);

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
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
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const addTestimonial = () => {
    setTestimonials([
      ...testimonials,
      {
        _id: null,
        clientName: "",
        clientImage: "",
        message: "",
        display: true,
      },
    ]);
  };

  const removeTestimonial = async (index) => {
    const testi = testimonials[index];
    if (testi._id) {
      try {
        const res = await fetch(`/api/testimonials/${testi._id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          console.error("Failed to delete testimonial");
          return;
        }
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        return;
      }
    }
    const newTestimonials = [...testimonials];
    newTestimonials.splice(index, 1);
    setTestimonials(newTestimonials);
  };

  const saveTestimonial = async (index) => {
    const testi = testimonials[index];
    if (testi._id) {
      // Update existing testimonial
      try {
        const res = await fetch(`/api/testimonials/${testi._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testi),
        });
        if (!res.ok) {
          console.error("Failed to update testimonial");
        }
      } catch (error) {
        console.error("Error updating testimonial:", error);
      }
    } else {
      // Create new testimonial
      try {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testi),
        });
        if (res.ok) {
          const newTesti = await res.json();
          const newTestimonials = [...testimonials];
          newTestimonials[index] = newTesti;
          setTestimonials(newTestimonials);
        } else {
          console.error("Failed to create testimonial");
        }
      } catch (error) {
        console.error("Error creating testimonial:", error);
      }
    }
  };

  const updateTestimonialField = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setTestimonials(newTestimonials);
  };

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

  if (loading) {
    return <div>Loading testimonials...</div>;
  }

  return (
    <motion.div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.nav
          className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-visible rounded-r-lg ${
            darkMode
              ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
              : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
          }`}
          variants={itemVariants}
        >
          <ManagementMenu />
        </motion.nav>

        <motion.main
          className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ml-2 md:ml-8"
          variants={itemVariants}
        >
          <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
            Testimonials Management
          </motion.h1>

          <motion.section className="mb-8" variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {testimonials.map((testi, index) => (
                <div
                  key={testi._id || index}
                  className="p-4 border rounded shadow-lg flex flex-col"
                >
                  <label className="block font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    value={testi.clientName || ""}
                    onChange={(e) =>
                      updateTestimonialField(index, "clientName", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <label className="block font-semibold mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={testi.clientImage || ""}
                    onChange={(e) =>
                      updateTestimonialField(index, "clientImage", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <label className="block font-semibold mb-1">Message</label>
                  <textarea
                    value={testi.message || ""}
                    onChange={(e) =>
                      updateTestimonialField(index, "message", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <label className="block font-semibold mb-1">Display</label>
                  <input
                    type="checkbox"
                    checked={testi.display || false}
                    onChange={(e) =>
                      updateTestimonialField(index, "display", e.target.checked)
                    }
                    className="mb-2"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => saveTestimonial(index)}
