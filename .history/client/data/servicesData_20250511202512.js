import React from "react";
import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Venue Decoration",
    description:
      "Beautiful and elegant decoration tailored to your wedding theme.",
    price: "Starting at BDT 30,000",
    icon: <FaPaintBrush className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  },
  {
    id: 2,
    title: "Catering",
    description:
      "Delicious traditional and modern cuisine to delight your guests.",
    price: "Starting at BDT 50,000",
    icon: <FaUtensils className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  },
  {
    id: 3,
    title: "Photography",
    description: "Professional photography capturing every precious moment.",
    price: "Starting at BDT 40,000",
    icon: <FaCamera className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  },
  {
    id: 4,
    title: "Entertainment",
    description:
      "Live music, DJs, and cultural performances to keep the celebration lively.",
    price: "Starting at BDT 35,000",
    icon: <FaMusic className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  },
];

export default services;
