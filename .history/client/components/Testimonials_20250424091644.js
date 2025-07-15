import React from "react";
import { motion } from "framer-motion";

const testimonials = [
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
    photo: "",
    message: "Professional and attentive service. Everything was perfect!",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCjKKe8_NAJkgfQuR0PA4lhyGMtkC62ZmWf1eH9CW4KpnDvaCrFKVLCfW30KMOXLAEpZ0&usqp=CAU",
    message: "The team handled everything smoothly. We enjoyed every moment.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-pink-700 dark:text-pink-300 mb-8">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-pink-50 dark:bg-pink-800 rounded-lg p-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-pink-800 dark:text-pink-300 italic mb-4">
                "{testimonial.message}"
              </p>
              <h3 className="text-pink-700 dark:text-pink-200 font-semibold">
                {testimonial.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
