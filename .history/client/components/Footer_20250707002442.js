import React, { useEffect, useState } from "react";

const Footer = () => {
  const [aboutUs, setAboutUs] = useState("");
  const [contactInfo, setContactInfo] = useState({
    address: "",
    email: "",
    phone: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch("/api/footer");
        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }
        const data = await response.json();
        setAboutUs(data.aboutUs || "");
        setContactInfo(data.contactInfo || { address: "", email: "", phone: "" });
        setSocialLinks(
          data.socialLinks || { facebook: "", twitter: "", instagram: "", linkedin: "" }
        );
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mobile two side content container */}
        <div className="flex flex-col sm:hidden border-b border-gray-700 pb-6 mb-6">
          <div className="flex flex-row justify-between items-center">
