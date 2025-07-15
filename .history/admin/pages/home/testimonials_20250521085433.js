import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

export default function Testimonials() {
  const { darkMode } = useContext(DarkModeContext);

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Ayesha Rahman",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKx64sTh3pznO3x6wuViyf8WnSDJM263kDQ&s",
      message:
        "BD Wedding Planner made our special day unforgettable. Highly recommended!",
    },
    {
      id: 2,
      name: "Rafiq Ahmed",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtsdkF_04HrGNXX6NWJyFm5f2BlcG6ONyGg&s",
      message: "Professional and attentive service. Everything was perfect!",
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCjKKe8_NAJkgfQuR0PA4lhyGMtkC62ZmWf1eH9CW4KpnDvaCrFKVLCfW30KMOXLAEpZ0&usqp=CAU",
      message: "The team handled everything smoothly. We enjoyed every moment.",
    },
  ]);

  const addTestimonial = () => {
    const newId = testimonials.length
      ? testimonials[testimonials.length - 1].id + 1
      : 1;
    setTestimonials([
      ...testimonials,
      { id: newId, name: "", photo: "", message: "" },
    ]);
  };

  const removeTestimonial = (index) => {
    const newTestimonials = [...testimonials];
    newTestimonials.splice(index, 1);
    setTestimonials(newTestimonials);
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index][field] = value;
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
          <motion.h1
            className="text-3xl font-bold mb-6"
            variants={itemVariants}
          >
            Testimonials Management
          </motion.h1>

          <motion.section className="mb-8" variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {testimonials.map((testi, index) => (
                <div
                  key={testi.id}
                  className="p-4 border rounded shadow-lg flex flex-col"
                >
                  <label className="block font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    value={testi.name}
                    onChange={(e) =>
                      handleTestimonialChange(index, "name", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <label className="block font-semibold mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={testi.photo}
                    onChange={(e) =>
                      handleTestimonialChange(index, "photo", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <label className="block font-semibold mb-1">Message</label>
                  <textarea
                    value={testi.message}
                    onChange={(e) =>
                      handleTestimonialChange(index, "message", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={() => removeTestimonial(index)}
                    className="mt-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addTestimonial}
                className="col-span-full px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
              >
                Add Testimonial
              </button>
            </div>
          </motion.section>
        </motion.main>
      </div>
    </motion.div>
  );
}
