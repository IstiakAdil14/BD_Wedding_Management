import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import CloseIcon from "@mui/icons-material/Close";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [aboutContent, setAboutContent] = useState({ ourStory: "", missionAndValues: "" });
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
    // Fetch about content from API
    const fetchAboutContent = async () => {
      try {
        const response = await fetch("/api/admin/about");
        if (!response.ok) {
          throw new Error("Failed to fetch about content");
        }
        const data = await response.json();
        setAboutContent(data);
      } catch (error) {
        console.error("Error fetching about content:", error);
      }
    };

    fetchAboutContent();
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

  // Helper to convert draftjs raw JSON string to HTML
  const renderDraftJsContent = (rawContent) => {
    if (!rawContent) return null;
    try {
      const contentState = convertFromRaw(JSON.parse(rawContent));
      return { __html: stateToHTML(contentState) };
    } catch (e) {
      console.error("Error parsing draftjs content", e);
      return null;
    }
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
          <div
            className="text-base sm:text-lg md:text-xl leading-relaxed"
            dangerouslySetInnerHTML={renderDraftJsContent(aboutContent.ourStory)}
          />
        </section>

        {/* Mission */}
        <section className="mb-12 px-4 sm:px-6 md:px-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Mission & Values
          </h2>
          <div
            className="text-base sm:text-lg md:text-xl leading-relaxed"
            dangerouslySetInnerHTML={renderDraftJsContent(aboutContent.missionAndValues)}
          />
        </section>

        {/* Team */}
        <section className="relative">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth space-x-6 pb-4
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member._id}
                onClick={() => openDialog(member)}
                className="cursor-pointer max-w-[270px] flex-shrink-0 snap-start bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={member.image || "https://via.placeholder.com/96"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-pink-600 dark:text-pink-400 font-medium mb-2 text-sm">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dialog Box */}
        {selectedMember && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeDialog}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full relative mx-4 sm:mx-6 md:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
};

export default About;
