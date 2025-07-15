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
