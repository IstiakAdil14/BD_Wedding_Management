import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

export default function Footer() {
  const { darkMode } = useContext(DarkModeContext);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [quickLinks, setQuickLinks] = useState([
    { id: 1, text: "About", url: "/about" },
    { id: 2, text: "Services", url: "/services" },
    { id: 3, text: "Portfolio", url: "/portfolio" },
    { id: 4, text: "Contact", url: "/contact" },
  ]);

  const [contactInfo, setContactInfo] = useState({
    address: "123 Wedding St, Dhaka, Bangladesh",
    email: "info@bdweddingplanner.com",
    phone: "+880 1234 567890",
  });

