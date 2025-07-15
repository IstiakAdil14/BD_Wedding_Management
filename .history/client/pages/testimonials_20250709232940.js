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
    { label: "Sup", style: "SUPERSCRIPT" },
    { label: "Sub", style: "SUBSCRIPT" },
    { label: "Code", style: "CODE" },
  ];
  
  const BLOCK_TYPES = [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Left", style: "left" },
    { label: "Center", style: "center" },
    { label: "Right", style: "right" },
    { label: "Justify", style: "justify" },
  ];
  
  const FONT_FAMILIES = [
    { label: "Arial", style: "font-arial" },
    { label: "Georgia", style: "font-georgia" },
    { label: "Impact", style: "font-impact" },
    { label: "Tahoma", style: "font-tahoma" },
    { label: "Times New Roman", style: "font-times" },
    { label: "Verdana", style: "font-verdana" },
  ];
  
  const FONT_SIZES = [
    { label: "12", style: "font-size-12" },
    { label: "14", style: "font-size-14" },
    { label: "16", style: "font-size-16" },
    { label: "18", style: "font-size-18" },
    { label: "24", style: "font-size-24" },
    { label: "32", style: "font-size-32" },
  ];
  
  // Additional handlers for font family and size
  const toggleFontFamily = (fontFamily) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, fontFamily));
  };
  
  const toggleFontSize = (fontSize) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, fontSize));
  };
  
  // Undo and redo handlers
  const undo = () => {
    setEditorState(EditorState.undo(editorState));
  };
  
  const redo = () => {
    setEditorState(EditorState.redo(editorState));
  };
  
  // Emoji insertion handler (basic)

export default Testimonials;
