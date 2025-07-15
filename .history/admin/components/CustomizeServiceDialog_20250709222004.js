import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CustomizeServiceDialog = ({ isOpen, onClose, onSave, service }) => {
  const defaultCategories = [
    { _id: "venue-decoration", name: "Venue Decoration", description: "Services related to venue decoration" },
    { _id: "premium-features", name: "Premium Features", description: "Premium service features" },
    { _id: "full-planning", name: "Full Planning", description: "Complete event planning services" },
  ];

  const defaultEventTypes = [
    { _id: "wedding", name: "WEDDING", ratePerGuest: 1500 },
    { _id: "reception", name: "reception", ratePerGuest: 1200 },
    { _id: "engagement", name: "Engagement", ratePerGuest: 1000 },
    { _id: "other", name: "OTHER", ratePerGuest: 800 },
  ];

  const [categories, setCategories] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    category: "",
    categoryDescription: "",
    eventType: "",
    ratePerGuest: 0,
  });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchEventTypes();
      if (service) {
        setFormData({
          _id: service._id || "",
          category: service.category || "",
          categoryDescription: service.categoryDescription || "",
          eventType: service.eventType || "",
          ratePerGuest: service.ratePerGuest || 0,
        });
        // Initialize editorState from service.categoryDescription
        try {
          const content = service.categoryDescription
            ? convertFromRaw(JSON.parse(service.categoryDescription))
            : ContentState.createFromText("");
          setEditorState(EditorState.createWithContent(content));
        } catch (e) {
          // If parsing fails, treat as plain text
          const content = ContentState.createFromText(service.categoryDescription || "");
          setEditorState(EditorState.createWithContent(content));
        }
      } else {
        setFormData({
          _id: "",
          category: "",
          categoryDescription: "",
          eventType: "",
          ratePerGuest: 0,
        });
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [isOpen, service]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        if (data.length === 0) {
          setCategories(defaultCategories);
        } else {
          setCategories(data);
        }
      } else {
        setCategories(defaultCategories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories(defaultCategories);
    }
  };

  const fetchEventTypes = async () => {
    try {
