import { useState, useEffect, useContext } from "react";
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

  // Add CSS styles for draft-js toolbar dark mode
  const draftDarkModeStyles = `
    .rdw-editor-toolbar {
      background-color: #1f2937 !important;
      border: 1px solid #374151 !important;
    }
    .rdw-option-wrapper {
      background-color: #374151 !important;
      border: 1px solid #4b5563 !important;
      color: #f9fafb !important;
    }
    .rdw-option-wrapper:hover {
      background-color: #4b5563 !important;
      border-color: #6b7280 !important;
    }
    .rdw-dropdown-wrapper {
      background-color: #374151 !important;
      border: 1px solid #4b5563 !important;
      color: #f9fafb !important;
    }
    .rdw-dropdown-wrapper:hover {
      background-color: #4b5563 !important;
      border-color: #6b7280 !important;
    }
    .rdw-dropdown-optionwrapper {
      background-color: #1f2937 !important;
      color: #f9fafb !important;
    }
    .rdw-dropdownoption-default {
      color: #f9fafb !important;
    }
    .rdw-dropdownoption-active {
      background-color: #2563eb !important;
      color: white !important;
    }
    .rdw-inline-wrapper {
      color: #f9fafb !important;
    }
  `;

  // Inject style tag for dark mode styles if darkMode is true
  useEffect(() => {
    let styleTag = document.getElementById("draft-dark-mode-styles");
    if (darkMode) {
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "draft-dark-mode-styles";
        styleTag.innerHTML = draftDarkModeStyles;
        document.head.appendChild(styleTag);
      }
    } else {
      if (styleTag) {
        styleTag.remove();
      }
    }
  }, [darkMode]);
  
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

  // Stronger validation function for social media URLs
  const validateSocialLinks = (links) => {
    // Define regex patterns for each social media platform
    const patterns = {
      facebook: /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.-]+\/?$/i,
      twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_]+\/?$/i,
      instagram: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/i,
      linkedin: /^https?:\/\/(www\.)?linkedin\.com\/.*$/i,
    };

    for (const [key, url] of Object.entries(links)) {
      if (url.trim() === "") continue; // Allow empty URLs
      const pattern = patterns[key];
      if (!pattern) continue; // Skip unknown keys
      if (!pattern.test(url)) {
        return `Invalid URL format for ${key}`;
      }
    }
    return null;
  };

  const saveFooterData = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate social links before saving
    const validationError = validateSocialLinks(socialLinks);
    if (validationError) {
      setLoading(false);
      setError(validationError);
      return;
    }

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
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-1">
        {/* Sidebar */}
        {isMobile ? (
          <div className="p-4 mr-5 sticky top-0 left-0 z-50">
            <HamburgerMenu />
          </div>
        ) : (
          <motion.nav
            className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-visible rounded-r-lg ${
              darkMode
                ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
                : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
            }`}
            variants={itemVariants}
          >
            <ManagementMenu />
          </motion.nav>
        )}

        <motion.main
          className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ml-0 md:ml-70"
          variants={itemVariants}
        >
          <motion.h1
            className="text-3xl font-bold mb-6"
            variants={itemVariants}
          >
            Footer Management
          </motion.h1>

          <motion.section className="mb-8" variants={itemVariants}>
            {loading && (
              <p className="mb-4 text-blue-600 font-semibold">
                Loading footer data...
              </p>
            )}
            <div className="mb-4">
              <label className="block font-semibold mb-1">About Us</label>
              <div
                style={{
                  minHeight: "150px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "4px",
                  backgroundColor: darkMode ? "#374151" : "white",
                }}
              >
                <div
                  style={{
                    minHeight: "150px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    backgroundColor: darkMode ? "#374151" : "white",
                    cursor: "text",
                  }}
                >
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbarClassName={
                      darkMode ? "toolbarClassName dark" : "toolbarClassName"
                    }
                    wrapperClassName={
                      darkMode ? "wrapperClassName dark" : "wrapperClassName"
                    }
                    editorClassName={
                      darkMode ? "editorClassName dark" : "editorClassName"
                    }
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "embedded",
                        "emoji",
                        "image",
                        "remove",
                        "history",
                      ],
                      inline: {
                        options: [
                          "bold",
                          "italic",
                          "underline",
                          "strikethrough",
                        ],
                      },
                      blockType: {
                        options: [
                          "Normal",
                          "H1",
                          "H2",
                          "H3",
                          "H4",
                          "H5",
                          "H6",
                          "Blockquote",
                          "Code",
                        ],
                      },
                      list: {
                        options: ["unordered", "ordered", "indent", "outdent"],
                      },
                    }}
                    placeholder="Enter about us content here..."
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Contact Info</h3>
              <label className="block font-semibold mb-1">Address</label>
              <input
                type="text"
                value={contactInfo.address}
                onChange={(e) =>
                  setContactInfo((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded mb-2 bg-white text-black dark:bg-gray-700 dark:text-gray-100"
              />
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded mb-2 bg-white text-black dark:bg-gray-700 dark:text-gray-100"
              />
              <label className="block font-semibold mb-1">Phone</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Social Media Links</h3>
              {Object.entries(socialLinks).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <label className="block font-semibold mb-1 capitalize">
                    {key}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleSocialLinkChange(key, e.target.value)
                    }
                    className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={saveFooterData}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              {error && (
                <p className="mt-2 text-red-600 font-semibold">{error}</p>
              )}
              {success && (
                <p className="mt-2 text-green-600 font-semibold">{success}</p>
              )}
            </div>
          </motion.section>
        </motion.main>
      </div>
    </motion.div>
  );
}
