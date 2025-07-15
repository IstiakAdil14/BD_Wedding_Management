import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch team members from API
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/admin/team");
        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }
        const data = await response.json();
        setTeamMembers(data.filter((member) => member.visible !== false));
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const openDialog = (member) => {
    setSelectedMember(member);
  };

  const closeDialog = () => {
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <motion.main
