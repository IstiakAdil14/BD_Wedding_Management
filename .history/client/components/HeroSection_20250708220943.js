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

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <section className="relative py-20">
      {/* Background video */}
      {backgroundVideoPath && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        >
          <source src={backgroundVideoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <motion.div
        className="relative max-w-7xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-pink-400 dark:via-red-400 dark:to-yellow-400 mb-4">
          <Editor
            editorState={heroTitleEditorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbarHidden
            readOnly
          />
        </h1>
        <p className="text-xl text-pink-800 dark:text-pink-200 mb-8">
          <Editor
            editorState={heroSubtitleEditorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbarHidden
            readOnly
          />
        </p>
        <button
          onClick={() => window.location.href = "/services"}
          className="inline-block bg-gradient-to-r from-pink-600 via-red-600 to-yellow-600 hover:from-pink-700 hover:via-red-700 hover:to-yellow-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
        >
          {heroCTA}
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
