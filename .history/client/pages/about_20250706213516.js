import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch team members from API
    const fetchTeamMembers = async () => {
      try {
