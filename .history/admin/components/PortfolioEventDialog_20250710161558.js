import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const PortfolioEventDialog = ({ isOpen, onClose, onSave, event }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([""]);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setCategory(event.category || "");
      setImages(event.images && event.images.length > 0 ? event.images : [""]);
      setVideo(event.video || "");
      setDescription(event.description || "");
    } else {
      setTitle("");
      setCategory("");
      setImages([""]);
      setVideo("");
      setDescription("");
    }
  }, [event]);

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };

  const removeImageField = (index) => {
    if (images.length === 1) return; // At least one image field
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...event,
      title,
      category,
      images: images.filter((img) => img.trim() !== ""),
      video,
      description,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Close dialog"
        >
          <CloseIcon />
        </button>
        <h2 className="text-xl font-bold mb-4">
          {event ? "Edit Event" : "New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Images URLs</label>
            {images.map((img, index) => (
              <div key={index} className="flex items-center mb-2 space-x-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-grow px-3 py-2 border rounded"
                  required={index === 0}
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
