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
            {/* About Us */}
            <div className="w-1/2 pr-4">
              <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm leading-relaxed">{aboutUs}</p>
            </div>
            {/* Separator line */}
            <div className="w-px bg-gray-700 h-20"></div>
            {/* Follow Us */}
            <div className="w-1/2 pl-4">
              <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
                >
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
