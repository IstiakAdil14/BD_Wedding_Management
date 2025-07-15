import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';

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
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <CloseIcon />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {event ? "Edit Event" : "New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">Images URLs</label>
            {images.map((img, index) => (
              <div key={index} className="flex items-center mb-2 space-x-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-grow px-3 py-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required={index === 0}
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={images.length === 1}
                  aria-label="Remove image URL"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Image
            </button>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">Video URL</label>
            <input
              type="url"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              className="w-full px-3 py-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioEventDialog;
