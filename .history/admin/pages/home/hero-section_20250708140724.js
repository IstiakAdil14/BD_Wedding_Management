import { useState, useEffect, useCallback, useContext } from "react";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

export default function HeroSection() {
  const { darkMode } = useContext(DarkModeContext);

  const [heroTitle, setHeroTitle] = useState(() => EditorState.createEmpty());
  const [heroSubtitle, setHeroSubtitle] = useState(() => EditorState.createEmpty());
  const [heroCTA, setHeroCTA] = useState("");
  const [heroVideo, setHeroVideo] = useState(null);
  const [heroVideoURL, setHeroVideoURL] = useState("");

  useEffect(() => {
    // Fetch existing hero section data from backend
    async function fetchHeroData() {
      try {
        const res = await fetch("http://localhost:5000/home/hero-section");
        if (res.ok) {
          const data = await res.json();
          if (data.heroTitle) {
            try {
              const contentState = convertFromRaw(JSON.parse(data.heroTitle));
              setHeroTitle(EditorState.createWithContent(contentState));
            } catch {
              setHeroTitle(EditorState.createEmpty());
            }
          } else {
            setHeroTitle(EditorState.createEmpty());
          }
          if (data.heroSubtitle) {
            try {
              const contentState = convertFromRaw(JSON.parse(data.heroSubtitle));
              setHeroSubtitle(EditorState.createWithContent(contentState));
            } catch {
              setHeroSubtitle(EditorState.createEmpty());
            }
          } else {
            setHeroSubtitle(EditorState.createEmpty());
          }
          setHeroCTA(data.heroCTA || "");
          // Prepend backend base URL to video path if not empty
          const videoPath = data.backgroundVideoPath || "";
          const baseUrl = "http://localhost:5000";
          setHeroVideoURL(videoPath ? baseUrl + videoPath : "");
        } else {
          console.error("Failed to fetch hero section data");
        }
      } catch (error) {
        console.error("Error fetching hero section data:", error);
      }
    }
    fetchHeroData();
  }, []);

  const handleHeroVideoChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        if (heroVideoURL) URL.revokeObjectURL(heroVideoURL);
        setHeroVideo(file);
        setHeroVideoURL(URL.createObjectURL(file));
      }
    },
    [heroVideoURL]
  );

  const handleSave = async () => {
    // Frontend validation for required fields
    if (
      !heroTitle.getCurrentContent().hasText() ||
      !heroSubtitle.getCurrentContent().hasText() ||
      !heroCTA.trim()
    ) {
      alert("Please fill in all required fields: Title, Subtitle, and Call to Action Text.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("heroTitle", JSON.stringify(convertToRaw(heroTitle.getCurrentContent())));
      formData.append("heroSubtitle", JSON.stringify(convertToRaw(heroSubtitle.getCurrentContent())));
      formData.append("heroCTA", heroCTA);
      if (heroVideo) {
        formData.append("backgroundVideo", heroVideo);
      }

      const res = await fetch("http://localhost:5000/home/hero-section", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Hero section update response:", data);
        // Update heroVideoURL with the saved video path from backend
        if (data.heroSection && data.heroSection.backgroundVideoPath) {
          setHeroVideoURL(data.heroSection.backgroundVideoPath);
        }
        alert("Hero section updated successfully");
      } else {
        const errorData = await res.json();
        console.error("Failed to update hero section:", errorData);
        alert("Failed to update hero section: " + (errorData.error || ""));
      }
    } catch (error) {
      console.error("Error saving hero section:", error);
      alert("Error saving hero section");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
