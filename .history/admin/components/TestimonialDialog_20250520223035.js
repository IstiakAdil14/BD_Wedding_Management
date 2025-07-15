import React, { useState, useEffect } from "react";

export default function TestimonialDialog({ isOpen, onClose, onSave, initialData }) {
  const [testimonialData, setTestimonialData] = useState({
    clientName: "",
    message: "",
    clientImage: "",
    display: false,
  });

  useEffect(() => {
    if (initialData) {
      setTestimonialData(initialData);
    } else {
      setTestimonialData({
        clientName: "",
        message: "",
        clientImage: "",
        display: false,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTestimonialData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(testimonialData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {initialData ? "Edit Testimonial" : "Add New Testimonial"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-900 dark:text-white">
          <div>
            <label className="block font-semibold mb-1">Client Name</label>
            <input
              type="text"
              name="clientName"
              value={testimonialData.clientName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              name="message"
              value={testimonialData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Client Image URL</label>
            <input
              type="text"
              name="clientImage"
              value={testimonialData.clientImage}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="display"
              checked={testimonialData.display}
              onChange={handleChange}
              id="display"
            />
            <label htmlFor="display" className="font-semibold">Display</label>
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
