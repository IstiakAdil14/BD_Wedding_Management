import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HeroSection = ({ Editor, EditorState, convertFromRaw }) => {
  const [heroTitleEditorState, setHeroTitleEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [heroSubtitleEditorState, setHeroSubtitleEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [heroCTA, setHeroCTA] = useState("");
  const [backgroundVideoPath, setBackgroundVideoPath] = useState("");

  useEffect(() => {
    async function fetchHeroData() {
      try {
