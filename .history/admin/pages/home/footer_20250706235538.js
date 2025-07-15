import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";
import CloseIcon from '@mui/icons-material/Close';

export default function Footer() {
  const { darkMode } = useContext(DarkModeContext);

  const [aboutUs, setAboutUs] = useState(
    "BD Wedding Planner is your trusted partner for creating unforgettable wedding experiences. We bring your dream wedding to life with passion and precision."
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

  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  });

  const handleQuickLinkChange = (index, field, value) => {
    const newLinks = [...quickLinks];
    newLinks[index][field] = value;
    setQuickLinks(newLinks);
  };

  const addQuickLink = () => {
    const newId = quickLinks.length
      ? quickLinks[quickLinks.length - 1].id + 1
      : 1;
    setQuickLinks([...quickLinks, { id: newId, text: "", url: "" }]);
  };

  const removeQuickLink = (index) => {
    const newLinks = [...quickLinks];
    newLinks.splice(index, 1);
    setQuickLinks(newLinks);
  };

  const handleSocialLinkChange = (field, value) => {
    setSocialLinks((prev) => ({ ...prev, [field]: value }));
  };

  const containerVariants = {
