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
              value={eventData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Image Path</label>
            <input
              type="text"
              name="imagePath"
              value={eventData.imagePath}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Video</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {eventData.video && typeof eventData.video === "object" && (
              <video
                src={URL.createObjectURL(eventData.video)}
                controls
                className="mt-2 max-h-40 w-full rounded"
              />
            )}
            {eventData.video && typeof eventData.video === "string" && (
              <video
                src={eventData.video}
                controls
                className="mt-2 max-h-40 w-full rounded"
              />
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
