import React, { useRef, useEffect } from "react";
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
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtsdkF_04HrGNXX6NWJyFm5f2BlcG6ONyGg&s",
    message: "Professional and attentive service. Everything was perfect!",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    photo:
