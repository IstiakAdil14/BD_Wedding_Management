import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { convertFromRaw, EditorState } from "draft-js";

const HeroSection = () => {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroCTA, setHeroCTA] = useState("");
  const [backgroundVideoPath, setBackgroundVideoPath] = useState("");

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const res = await fetch("http://localhost:5000/home/hero-section");
        if (res.ok) {
          const data = await res.json();

          // Parse heroTitle from draft.js raw content JSON string to plain text
          if (data.heroTitle) {
            try {
              const contentState = convertFromRaw(JSON.parse(data.heroTitle));
              const editorState = EditorState.createWithContent(contentState);
              setHeroTitle(editorState.getCurrentContent().getPlainText());
            } catch {
              setHeroTitle("BD Wedding Planner");
            }
          } else {
            setHeroTitle("BD Wedding Planner");
          }

          // Parse heroSubtitle from draft.js raw content JSON string to plain text
          if (data.heroSubtitle) {
            try {
              const contentState = convertFromRaw(JSON.parse(data.heroSubtitle));
              const editorState = EditorState.createWithContent(contentState);
              setHeroSubtitle(editorState.getCurrentContent().getPlainText());
            } catch {
              setHeroSubtitle("Your dream wedding, perfectly planned and beautifully executed.");
            }
          } else {
            setHeroSubtitle("Your dream wedding, perfectly planned and beautifully executed.");
          }

          setHeroCTA(data.heroCTA || "Explore Our Services");
          const baseUrl = "http://localhost:5000";
