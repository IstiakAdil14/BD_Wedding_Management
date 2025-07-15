import React, { useEffect, useState } from "react";
import { convertFromRaw, EditorState, Editor } from "draft-js";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [aboutUsPlainText, setAboutUsPlainText] = useState("");

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch("/api/footer");
        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }
        const data = await response.json();
        setFooterData(data);

        if (data.aboutUs) {
          try {
            // Try to parse aboutUs as draft.js raw JSON
            const contentState = convertFromRaw(JSON.parse(data.aboutUs));
            setEditorState(EditorState.createWithContent(contentState));
            setAboutUsPlainText("");
          } catch (error) {
            // If parsing fails, treat aboutUs as plain text
            setAboutUsPlainText(data.aboutUs);
            setEditorState(EditorState.createEmpty());
          }
        } else {
          setEditorState(EditorState.createEmpty());
          setAboutUsPlainText("");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);


  if (loading) {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">Loading footer...</div>
      </footer>
    );
  }

  if (!footerData) {
    return (
