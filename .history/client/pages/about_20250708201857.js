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
};

export default About;
