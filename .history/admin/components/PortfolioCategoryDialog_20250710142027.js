import React, { useState } from "react";

const PortfolioCategoryDialog = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!name.trim() || !description.trim()) {
      setError("Name and description are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });
      if (res.ok) {
        const newCategory = await res.json();
        onSave(newCategory);
        setName("");
        setDescription("");
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save category.");
      }
    } catch (err) {
      setError("Failed to save category.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add New Portfolio Category</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Name *</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Description *</label>
          <textarea
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={saving}
            rows={3}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
            onClick={() => {
              setName("");
              setDescription("");
              setError(null);
              onClose();
            }}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCategoryDialog;
