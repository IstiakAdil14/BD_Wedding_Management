import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { convertFromRaw, EditorState } from "draft-js";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const HeroSection = () => {
  const router = useRouter();

  const [heroTitleEditorState, setHeroTitleEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [heroSubtitleEditorState, setHeroSubtitleEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [heroCTA, setHeroCTA] = useState("");
  const [backgroundVideoPath, setBackgroundVideoPath] = useState("");

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

        setHeroCTA(data.heroCTA || "Explore Our Services");
        const baseUrl = "http://localhost:5000";
        setBackgroundVideoPath(data.backgroundVideoPath ? baseUrl + data.backgroundVideoPath : "");
      } else {
        console.error("Failed to fetch hero section data");
      }
    } catch (error) {
      console.error("Error fetching hero section data:", error);
    }
  }

  useEffect(() => {
    fetchHeroData();

    const handleRouteChange = (url) => {
      if (url === "/") {
        fetchHeroData();
      }
    };

