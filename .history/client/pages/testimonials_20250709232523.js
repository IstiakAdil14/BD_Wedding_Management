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

export default Testimonials;
