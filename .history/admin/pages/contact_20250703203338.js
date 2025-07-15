import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import useWindowWidth from "../hooks/useWindowWidth";

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

export default function Contact() {
  const { darkMode } = useContext(DarkModeContext);
  const width = useWindowWidth();

  const [contactInfo, setContactInfo] = useState({
    phoneNumbers: ["+1 234 567 890"],
    email: "info@weddingplanner.com",
    businessHours: "Mon-Fri 9am - 6pm",
    officeLocation: "123 Wedding St, City, Country",
    mapEmbedUrl: "",
    faqs: [
      {
        question: "What is your cancellation policy?",
        answer: "You can cancel up to 7 days before the event.",
      },
      {
        question: "Do you offer custom packages?",
        answer: "Yes, we tailor packages to your needs.",
      },
    ],
    socialLinks: {
      facebook: "https://facebook.com/weddingplanner",
      instagram: "https://instagram.com/weddingplanner",
    },
  });

  const [newPhone, setNewPhone] = useState("");
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/homepage");
        if (!res.ok) throw new Error("Failed to fetch homepage data");
        const data = await res.json();
        setContactInfo((prev) => ({
