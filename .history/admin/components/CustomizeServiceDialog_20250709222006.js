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
      const res = await fetch("/api/eventTypes");
      if (res.ok) {
        const data = await res.json();
        if (data.length === 0) {
          setEventTypes(defaultEventTypes);
        } else {
          setEventTypes(data);
        }
      } else {
        setEventTypes(defaultEventTypes);
      }
    } catch (error) {
      console.error("Failed to fetch event types:", error);
      setEventTypes(defaultEventTypes);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "category") {
      const selectedCategory = categories.find((cat) => cat._id === value);
      updatedData.categoryDescription = selectedCategory ? selectedCategory.description : "";
      // Also update editorState accordingly
      const content = ContentState.createFromText(updatedData.categoryDescription);
      setEditorState(EditorState.createWithContent(content));
    }

    if (name === "eventType") {
      const selectedEventType = eventTypes.find((et) => et.name === value);
      updatedData.ratePerGuest = selectedEventType ? selectedEventType.ratePerGuest : 0;
    }

    if (name === "ratePerGuest") {
      updatedData.ratePerGuest = parseFloat(value) || 0;
    }

    setFormData(updatedData);
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    setFormData((prev) => ({
      ...prev,
      categoryDescription: JSON.stringify(raw),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting CustomizeServiceDialog with formData:", formData);
    // Ensure _id is included in the data sent to onSave
    onSave({ ...formData });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
