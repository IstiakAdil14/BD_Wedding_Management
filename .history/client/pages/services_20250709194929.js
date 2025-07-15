import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from "react-icons/fa";

import { Editor, EditorState, convertFromRaw } from "draft-js";

const iconMap = {
  FaPaintBrush: (
    <FaPaintBrush className="w-12 h-12 text-pink-500 mb-4 mx-auto" />
  ),
  FaUtensils: <FaUtensils className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  FaCamera: <FaCamera className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
  FaMusic: <FaMusic className="w-12 h-12 text-pink-500 mb-4 mx-auto" />,
};

const eventTypes = ["WEDDING", "reception", "Engagement", "OTHER"];

// Rate per guest based on event type
const ratePerGuestByEventType = {
  WEDDING: 500,
  reception: 400,
  Engagement: 300,
  OTHER: 200,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
