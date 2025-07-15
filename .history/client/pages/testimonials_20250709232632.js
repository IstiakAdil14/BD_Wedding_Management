import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Editor, EditorState, RichUtils, Modifier, CompositeDecorator, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

function decodeJwt(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const payload = parts[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding if missing
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  const jsonPayload = decodeURIComponent(
    atob(paddedBase64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  const decoded = JSON.parse(jsonPayload);
  return decoded;
}

const Testimonials = () => {
  const { isAuthenticated, user, accessToken, loading } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  // Decorator for link entities
  const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === "LINK"
        );
      },
      callback
    );
  };

  const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} style={{ color: "#3b82f6", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  };

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/testimonials");
      if (!res.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      const data = await res.json();
      setTestimonials(data.filter((t) => t.display));
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchProfileData = async (email) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/client-personal-details?email=${encodeURIComponent(
          email
        )}`
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch profile data: ${errorText}`);
      }
      const data = await res.json();
      setProfile(data);
      setProfileError(null);
    } catch (error) {
      setProfile(null);
      setProfileError(error.message);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!loading && isAuthenticated && accessToken) {
      let email = null;
      try {
        const decoded = decodeJwt(accessToken);
        email =
          decoded.email ||
          decoded.user_email ||
          decoded.sub ||
          decoded.username ||
          null;
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
      if (email && email.toLowerCase().endsWith("@gmail.com")) {
        fetchProfileData(email);
      } else {
        setProfile(null);
        setProfileError(null);
      }
    }
  }, [loading, isAuthenticated, accessToken]);

  const openDialog = () => {
    setEditorState(EditorState.createEmpty(decorator));
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setError(null);
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError("You must be logged in to add a testimonial.");
      return;
    }
    setLoadingSubmit(true);
    setError(null);
    try {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      const message = JSON.stringify(rawContent);
      const res = await fetch("http://localhost:5000/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName:
            profile?.fullName || user?.name || user?.email || "Anonymous",
          email: profile?.email || user?.email || null,
          clientImage:
            profile?.profilePicture || user?.photoURL || "/default-profile.png",
          message: message,
          display: true,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to add testimonial");
      }
      await fetchTestimonials();
      closeDialog();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const promptForLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      let url = window.prompt("Enter a URL:", "https://");
      if (url) {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          "LINK",
          "MUTABLE",
          { url }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newContentState = Modifier.applyEntity(
          contentStateWithEntity,
          selection,
          entityKey
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "apply-entity"
        );
        setEditorState(newEditorState);
      }
    }
  };

  const removeLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const newContentState = Modifier.applyEntity(contentState, selection, null);
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "apply-entity"
      );
      setEditorState(newEditorState);
    }
  };

  const StyleButton = ({ onToggle, style, active, label }) => {
    return (
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle(style);
        }}
        className={`px-2 py-1 rounded text-sm font-semibold mr-1 ${
          active ? "bg-pink-600 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
        }`}
      >
        {label}
      </button>
    );
  };

  const INLINE_STYLES = [
    { label: "B", style: "BOLD" },
    { label: "I", style: "ITALIC" },
    { label: "U", style: "UNDERLINE" },
    { label: "S", style: "STRIKETHROUGH" },
  ];

  const BLOCK_TYPES = [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
  ];

  const currentStyle = editorState.getCurrentInlineStyle();

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col px-2 sm:px-4">
      <motion.main
        className="flex-grow max-w-full md:max-w-7xl lg:max-w-6xl xl:max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center mt-10">
          Client Testimonials
        </h1>
        {isAuthenticated && (
          <button
            onClick={openDialog}
            className="mb-6 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
          >
            Add Testimonial
          </button>
        )}
        {error && (
          <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
        )}
        <motion.div
          className="flex space-x-2 overflow-x-scroll pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          whileTap={{ cursor: "grabbing" }}
          onMouseMove={(e) => {
            const container = e.currentTarget;
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the container
            const scrollWidth = container.scrollWidth - container.clientWidth;
            const scrollPos = (x / container.clientWidth) * scrollWidth;
            container.scrollLeft = scrollPos;
          }}
          // Responsive styles for mobile
          initial={false}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center w-[calc((100vw-64px)/5)] min-w-[300px] flex-shrink-0 cursor-grab mt-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={testimonial.clientImage || "/default-profile.png"}
                alt={testimonial.clientName}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                "{testimonial.message}"
              </p>
              <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-200">
                {testimonial.clientName}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-full w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Add Testimonial
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 text-gray-900 dark:text-white"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={
                      profile?.profilePicture ||
                      user?.photoURL ||
                      "/default-profile.png"
                    }
                    alt={
                      profile?.fullName || user?.name || user?.email || "User"
                    }
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">
                      {profile?.fullName || user?.name || user?.email || "User"}
                    </p>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block font-semibold mb-1">
                    Testimonial
                  </label>
                  <div className="mb-2">
                    {/* Inline style controls */}
                    {INLINE_STYLES.map((type) => (
                      <StyleButton
                        key={type.label}
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={toggleInlineStyle}
                        style={type.style}
                      />
                    ))}
                    {/* Block style controls */}
                    {BLOCK_TYPES.map((type) => (
                      <StyleButton
                        key={type.label}
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={toggleBlockType}
                        style={type.style}
                      />
                    ))}
                    {/* Link controls */}
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        promptForLink();
                      }}
                      className="px-2 py-1 rounded text-sm font-semibold mr-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      Link
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        removeLink();
                      }}
                      className="px-2 py-1 rounded text-sm font-semibold mr-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      Remove Link
                    </button>
                  </div>
                  <div
                    className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 min-h-[96px]"
                    style={{ cursor: "text" }}
                    onClick={() => {
                      // Focus the editor on container click
                      const editor = document.getElementById("editor-container");
                      if (editor) editor.focus();
                    }}
                  >
                    <Editor
                      editorState={editorState}
                      onChange={handleEditorChange}
                      placeholder="Write your testimonial..."
                      spellCheck={true}
                      id="editor-container"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                    disabled={loadingSubmit}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                    disabled={loadingSubmit}
                  >
                    {loadingSubmit ? "Saving..." : "Submit"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Testimonials;
