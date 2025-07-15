
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
