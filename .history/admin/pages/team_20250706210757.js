import React, { useState, useRef, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import { DarkModeContext } from "../context/DarkModeContext";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

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

export default function Team() {
  const { darkMode } = useContext(DarkModeContext);
  const width = useWindowWidth();

  const [teamMembers, setTeamMembers] = useState([]);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    bio: "",
    image: null,
    facebook: "",
    instagram: "",
    visible: true,
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch team members from API on mount
  useEffect(() => {
    fetch("/api/admin/team")
      .then((res) => res.json())
      .then((data) => {
        setTeamMembers(data);
      })
      .catch((err) => {
        console.error("Failed to fetch team members:", err);
      });
