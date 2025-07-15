import React, { useState } from "react";

import { EditorState, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

const PortfolioCategoryDialog = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEditorState, setDescriptionEditorState] = useState(() => EditorState.createEmpty());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleDescriptionEditorChange = (editorState) => {
    setDescriptionEditorState(editorState);
    const rawContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    setDescription(rawContent);
  };

  const handleSave = async () => {
    if (!name.trim() || !description.trim()) {
      setError("Name and description are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description }),
      });
      if (res.ok) {
        const newCategory = await res.json();
        onSave(newCategory);
        setName("");
        setDescription("");
        setDescriptionEditorState(EditorState.createEmpty());
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save category.");
      }
    } catch (err) {
      setError("Failed to save category.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-full">
