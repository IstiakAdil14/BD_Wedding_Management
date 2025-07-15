
import { useState, useEffect, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function HeroSection() {
  const { darkMode } = useContext(DarkModeContext);

  const [heroTitleEditorState, setHeroTitleEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [heroSubtitleEditorState, setHeroSubtitleEditorState] = useState(() =>
    EditorState.createEmpty()
  );
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
              setHeroTitleEditorState(EditorState.createWithContent(contentState));
            } catch {
              setHeroTitleEditorState(EditorState.createEmpty());
            }
          } else {
            setHeroTitleEditorState(EditorState.createEmpty());
          }

          if (data.heroSubtitle) {
            try {
              const contentState = convertFromRaw(JSON.parse(data.heroSubtitle));
              setHeroSubtitleEditorState(EditorState.createWithContent(contentState));
            } catch {
              setHeroSubtitleEditorState(EditorState.createEmpty());
            }
          } else {
            setHeroSubtitleEditorState(EditorState.createEmpty());
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
    const heroTitleText = heroTitleEditorState.getCurrentContent().getPlainText().trim();
    const heroSubtitleText = heroSubtitleEditorState.getCurrentContent().getPlainText().trim();

    if (!heroTitleText || !heroSubtitleText || !heroCTA.trim()) {
      alert("Please fill in all required fields: Title, Subtitle, and Call to Action Text.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("heroTitle", JSON.stringify(convertToRaw(heroTitleEditorState.getCurrentContent())));
      formData.append("heroSubtitle", JSON.stringify(convertToRaw(heroSubtitleEditorState.getCurrentContent())));
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
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-1">
        {/* Sidebar */}
        {window.innerWidth <= 768 ? (
          <div className="p-4 sticky top-0 left-0 z-50">
            <HamburgerMenu />
          </div>
        ) : (
          <motion.nav
            className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-visible rounded-r-lg ${
              darkMode
                ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
                : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
            }`}
            variants={itemVariants}
          >
            <ManagementMenu />
          </motion.nav>
        )}

        <motion.main
          className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ml-0 md:ml-72"
          variants={itemVariants}
        >
          <motion.h1
            className="text-3xl font-bold mb-6"
            variants={itemVariants}
          >
            Hero Section Management
          </motion.h1>

          <motion.section className="mb-8" variants={itemVariants}>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Title</label>
              <div
                style={{
                  minHeight: "40px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "4px",
                  backgroundColor: darkMode ? "#374151" : "white",
                }}
              >
                <Editor
                  editorState={heroTitleEditorState}
                  onEditorStateChange={setHeroTitleEditorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={{
                    options: ["inline", "blockType", "list", "textAlign", "colorPicker", "link", "remove", "history"],
                    inline: { options: ["bold", "italic", "underline", "strikethrough"] },
                    blockType: { options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote", "Code"] },
                    list: { options: ["unordered", "ordered", "indent", "outdent"] },
                  }}
                  placeholder="Enter title here..."
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Subtitle</label>
              <div
                style={{
                  minHeight: "40px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "4px",
                  backgroundColor: darkMode ? "#374151" : "white",
                }}
              >
                <Editor
                  editorState={heroSubtitleEditorState}
                  onEditorStateChange={setHeroSubtitleEditorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={{
                    options: ["inline", "blockType", "list", "textAlign", "colorPicker", "link", "remove", "history"],
                    inline: { options: ["bold", "italic", "underline", "strikethrough"] },
                    blockType: { options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote", "Code"] },
                    list: { options: ["unordered", "ordered", "indent", "outdent"] },
                  }}
                  placeholder="Enter subtitle here..."
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="heroCTA" className="block font-semibold mb-1">
                Call to Action Text
              </label>
              <input
                id="heroCTA"
                type="text"
                value={heroCTA}
                onChange={(e) => setHeroCTA(e.target.value)}
                className={`w-full p-2 border rounded transition focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-yellow-400"
                    : "bg-white text-gray-900 border-gray-300 focus:ring-purple-500"
                }`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="heroVideo" className="block font-semibold mb-1">
                Background Video
              </label>
              <input
                id="heroVideo"
                type="file"
                accept="video/*"
                onChange={handleHeroVideoChange}
                className="block"
              />
              {heroVideoURL && (
                <video
                  src={heroVideoURL}
                  controls
                  className="mt-2 max-h-48 rounded shadow-lg"
                />
              )}
            </div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Save
            </button>
          </motion.section>
        </motion.main>
      </div>
    </motion.div>
  );
}
