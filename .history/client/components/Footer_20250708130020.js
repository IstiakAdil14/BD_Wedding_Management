

import React, { useEffect, useState } from "react";
import { convertFromRaw, EditorState, Editor } from "draft-js";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
            const contentState = convertFromRaw(JSON.parse(data.aboutUs));
            setEditorState(EditorState.createWithContent(contentState));
          } catch (error) {
            setEditorState(EditorState.createEmpty());
          }
        } else {
          setEditorState(EditorState.createEmpty());
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
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">Failed to load footer data.</div>
      </footer>
    );
  }

  const { quickLinks, contactInfo, socialLinks } = footerData;

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mobile two side content container */}
        <div className="flex flex-col sm:hidden border-b border-gray-700 pb-6 mb-6">
          <div className="flex flex-row justify-between items-center">
            {/* About Us */}
            <div className="w-1/2 pr-4">
              <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
              <div className="text-sm leading-relaxed border p-2 rounded bg-gray-800 text-white">
                <Editor editorState={editorState} readOnly={true} onChange={() => {}} />
              </div>
            </div>
            {/* Separator line */}
            <div className="w-px bg-gray-700 h-20"></div>
            {/* Follow Us */}
            <div className="w-1/2 pl-4">
              <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                {socialLinks?.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
                  >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
      </div>
