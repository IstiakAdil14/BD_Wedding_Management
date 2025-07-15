import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

export default function Footer() {
  const { darkMode } = useContext(DarkModeContext);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect window width on client side
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Fetch footer data on component mount
    const fetchFooterData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/footer");
        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }
        const data = await response.json();
        if (data.aboutUs) {
          try {
            const contentState = convertFromRaw(JSON.parse(data.aboutUs));
            setEditorState(EditorState.createWithContent(contentState));
          } catch {
            setEditorState(EditorState.createEmpty());
          }
        } else {
          setEditorState(EditorState.createEmpty());
        }
        setQuickLinks(
          data.quickLinks && data.quickLinks.length > 0
            ? data.quickLinks.map((link, index) => ({
                id: index + 1,
                text: link.text,
                url: link.url,
              }))
            : []
        );
        setContactInfo(
          data.contactInfo || { address: "", email: "", phone: "" }
        );
        setSocialLinks(
          data.socialLinks || {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
          }
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFooterData();
  }, []);

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

  const saveFooterData = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const contentState = editorState.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));
      const response = await fetch("/api/footer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aboutUs: rawContent,
          quickLinks,
          contactInfo,
          socialLinks,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save footer data");
      }
      setSuccess("Footer data saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <motion.div
      className={`flex h-screen ${
