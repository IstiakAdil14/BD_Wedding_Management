import React, { useState, useEffect } from "react";

export default function EventGalleryDialog({ isOpen, onClose, onSave, initialData }) {
  const [eventData, setEventData] = useState({
    title: "",
    imagePath: "",
    description: "",
    video: null,
  });

  useEffect(() => {
    if (initialData) {
      setEventData(initialData);
    } else {
      setEventData({
        title: "",
        imagePath: "",
        description: "",
        video: null,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
      setEventData((prev) => ({
        ...prev,
        video: files && files.length > 0 ? files[0] : null,
      }));
    } else {
      setEventData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(eventData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {initialData ? "Edit Event Gallery Item" : "Add New Event Gallery Item"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-900 dark:text-white">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
