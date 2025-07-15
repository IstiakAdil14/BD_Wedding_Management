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
        className="mt-4 flex-grow max-w-7xl mx-auto p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Story */}
        <section className="mb-12 px-4 sm:px-6 md:px-0">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            BD Wedding Planner was founded with the vision to create
            unforgettable wedding experiences that blend the rich traditions of
            Bangladeshi culture with modern elegance. Our dedicated team works
            closely with clients to bring their dream weddings to life, ensuring
            every detail is perfect.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-12 px-4 sm:px-6 md:px-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Mission & Values
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Our mission is to provide exceptional wedding planning services that
            celebrate cultural heritage while embracing innovation and style. We
            value integrity, creativity, and personalized service, striving to
            exceed our clients' expectations at every step.
          </p>
        </section>

        {/* Team */}
        <section className="relative">
