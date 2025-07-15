import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const containerRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

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

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          // Filter testimonials to only those with display=true
          const displayedTestimonials = data.filter(t => t.display);
          setTestimonials(displayedTestimonials);
        } else {
          console.error("Failed to fetch testimonials");
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-pink-700 dark:text-pink-300 mb-8">
          What Our Clients Say
        </h2>
        <motion.div
          ref={containerRef}
          className="flex space-x-6 overflow-x-scroll pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          whileTap={{ cursor: "grabbing" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              className="bg-pink-50 dark:bg-pink-800 rounded-lg p-6 shadow-lg w-[300px] flex-shrink-0 cursor-grab mt-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={testimonial.clientImage || "/default-profile.png"}
                alt={testimonial.clientName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-pink-800 dark:text-pink-300 italic mb-4">
                "{testimonial.message}"
              </p>
              <h3 className="text-pink-700 dark:text-pink-200 font-semibold">
                {testimonial.clientName}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
