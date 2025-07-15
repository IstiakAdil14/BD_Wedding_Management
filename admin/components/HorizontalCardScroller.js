import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function HorizontalCardScroller({ cards }) {
  return (
    <motion.div
      className="flex overflow-x-auto space-x-4 py-4 px-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ scrollbarWidth: "thin" }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id || index}
          className="min-w-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex-shrink-0"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          {card.icon && (
            <div className="text-3xl mb-2 text-center">{card.icon}</div>
          )}
          {card.title && (
            <h3 className="text-lg font-semibold mb-1 text-center">
              {card.title}
            </h3>
          )}
          {card.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              {card.description}
            </p>
          )}
          {card.image && (
            <img
              src={card.image}
              alt={card.title || "card image"}
              className="mt-2 rounded object-cover w-full h-32"
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
