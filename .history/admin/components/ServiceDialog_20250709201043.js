import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from "react-icons/fa";

export default function ServiceDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    price: "",
    iconName: "FaPaintBrush",
    image: [], // changed from string to array for multiple images
    features: [],
    enabled: false,
    category: "", // new field for selected category
    eventType: "", // new field for selected event type
  });

  const [categories, setCategories] = useState([]); // list of categories
  const [eventTypes, setEventTypes] = useState([]); // list of event types
  const [allCustomizeServices, setAllCustomizeServices] = useState([]); // all customize services
  const [filteredEventTypes, setFilteredEventTypes] = useState([]); // event types filtered by category

  useEffect(() => {
    // Fetch categories, event types, and all customize services on mount
    async function fetchData() {
      try {
        const categoriesResponse = await fetch(
          "/api/customizeServices/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const eventTypesResponse = await fetch(
          "/api/customizeServices/eventTypes"
        );
        const eventTypesData = await eventTypesResponse.json();
        setEventTypes(eventTypesData);

        const allServicesResponse = await fetch("/api/customizeServices");
          <div>
            <label className="block font-semibold mb-1">Image URLs</label>
            {serviceData.image.map((img, index) => (
              <div key={index} className="flex items-center mb-2 space-x-2">
                <input
                  type="text"
                  name={`image-${index}`}
                  value={img}
                  onChange={(e) => {
                    const newImages = [...serviceData.image];
                    newImages[index] = e.target.value;
                    setServiceData((prev) => ({
                      ...prev,
                      image: newImages,
                    }));
                  }}
                  className="flex-grow p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newImages = [...serviceData.image];
                    newImages.splice(index, 1);
                    setServiceData((prev) => ({
                      ...prev,
                      image: newImages,
                    }));
                  }}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  aria-label="Remove image"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setServiceData((prev) => ({
                  ...prev,
                  image: [...prev.image, ""],
                }));
              }}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Add Image
            </button>
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
              <option value="" disabled>
                Select a category
              </option>
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
              <option value="" disabled>
                Select an event type
              </option>
              {filteredEventTypes.map((et) => (
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
            <label htmlFor="enabled" className="font-semibold">
              Enabled
            </label>
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
