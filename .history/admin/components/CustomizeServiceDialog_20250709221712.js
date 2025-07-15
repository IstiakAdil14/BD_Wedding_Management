import React, { useState, useEffect } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";

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
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg mx-auto" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Customize Service
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-900 dark:text-white">
          <div>
            <label htmlFor="category" className="block font-semibold mb-1">
              Category
            </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={!!service}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
            placeholder="Enter category"
          />
          </div>
          <div>
            <label htmlFor="eventType" className="block font-semibold mb-1">
              Event Type
            </label>
          <input
            type="text"
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            disabled={!!service}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
            placeholder="Enter event type"
          />
          </div>
          <div>
            <label htmlFor="categoryDescription" className="block font-semibold mb-1">
              Category Description
            </label>
            <div
              id="categoryDescription"
              name="categoryDescription"
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 resize-none min-h-[100px] cursor-text"
              style={{ minHeight: '100px' }}
              onClick={() => {
                // Focus editor on container click
                const editor = document.querySelector('.DraftEditor-root');
                if (editor) editor.focus();
              }}
            >
              <Editor
                editorState={editorState}
                onChange={onEditorStateChange}
                placeholder="Enter category description..."
              />
            </div>
          </div>
          <div>
            <label htmlFor="ratePerGuest" className="block font-semibold mb-1">
              Rate Per Guest (BDT)
            </label>
            <input
              type="number"
              id="ratePerGuest"
              name="ratePerGuest"
              value={formData.ratePerGuest}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizeServiceDialog;
