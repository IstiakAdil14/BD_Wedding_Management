
import React, { useState, useEffect } from "react";

export default function ServiceDialog({ isOpen, onClose, onSave, initialData }) {
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    price: "",
    iconName: "FaPaintBrush",
    image: "",
    features: [],
    enabled: false,
    category: "", // new field for selected category
    eventType: "", // new field for selected event type
  });

  const [categories, setCategories] = useState([]); // list of categories
  const [eventTypes, setEventTypes] = useState([]); // list of event types

  useEffect(() => {
    // Fetch categories and event types on mount
    async function fetchData() {
      try {
        const categoriesResponse = await fetch("/api/customizeServices/categories");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const eventTypesResponse = await fetch("/api/customizeServices/eventTypes");
        const eventTypesData = await eventTypesResponse.json();
        setEventTypes(eventTypesData);
      } catch (error) {
        console.error("Failed to fetch categories or event types", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setServiceData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        iconName: initialData.iconName || "FaPaintBrush",
        image: initialData.image || "",
        features: initialData.features || [],
        enabled: initialData.enabled || false,
        category: initialData.category || "",
        eventType: initialData.eventType || "",
      });
    } else {
      setServiceData({
        title: "",
        description: "",
        price: "",
        iconName: "FaPaintBrush",
        image: "",
        features: [],
        enabled: false,
        category: "",
        eventType: "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "price") {
      // Remove any non-digit characters except dot for decimals
      const numericValue = value.replace(/[^0-9.]/g, "");
      setServiceData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else if (name === "enabled") {
      setServiceData((prev) => ({
        ...prev,
        enabled: checked,
      }));
    } else {
      setServiceData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...serviceData.features];
    newFeatures[index] = value;
    setServiceData((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const handleAddFeature = () => {
    setServiceData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...serviceData.features];
    newFeatures.splice(index, 1);
    setServiceData((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(serviceData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full shadow-lg overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {initialData ? "Edit Service Package" : "Add New Service Package"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-900 dark:text-white">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={serviceData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={serviceData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Price (BDT)</label>
            <input
              type="text"
              name="price"
              value={serviceData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              inputMode="decimal"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={serviceData.image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              value={serviceData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Event Type</label>
            <select
              name="eventType"
              value={serviceData.eventType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            >
              <option value="" disabled>Select an event type</option>
              {eventTypes.map((et) => (
              <option key={et} value={et}>
                {et}
              </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Features</label>
            {serviceData.features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2 space-x-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  aria-label="Remove feature"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Add Feature
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="enabled"
              checked={serviceData.enabled}
              onChange={handleChange}
              id="enabled"
            />
            <label htmlFor="enabled" className="font-semibold">Enabled</label>
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
