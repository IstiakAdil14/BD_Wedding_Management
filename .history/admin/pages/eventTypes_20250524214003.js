import React, { useState, useEffect } from "react";

const EventTypesPage = () => {
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({ name: "", ratePerGuest: "" });
  const [formOpen, setFormOpen] = useState(false);

  const fetchEventTypes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/eventTypes");
      if (res.ok) {
        const data = await res.json();
        setEventTypes(data);
      } else {
        console.error("Failed to fetch event types");
      }
    } catch (error) {
      console.error("Error fetching event types:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const openForm = (eventType = null) => {
    if (eventType) {
      setEditData(eventType);
      setFormData({ name: eventType.name, ratePerGuest: eventType.ratePerGuest });
    } else {
      setEditData(null);
      setFormData({ name: "", ratePerGuest: "" });
    }
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditData(null);
    setFormData({ name: "", ratePerGuest: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event type?")) return;
    try {
      const res = await fetch(`/api/eventTypes/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchEventTypes();
      } else {
        console.error("Failed to delete event type");
      }
    } catch (error) {
      console.error("Error deleting event type:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editData ? "PUT" : "POST";
    const url = editData ? `/api/eventTypes/${editData._id}` : "/api/eventTypes";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          ratePerGuest: parseFloat(formData.ratePerGuest),
        }),
      });
      if (res.ok) {
        closeForm();
        fetchEventTypes();
      } else {
        console.error("Failed to save event type");
      }
    } catch (error) {
      console.error("Error saving event type:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Event Types</h1>
      <button
        onClick={() => openForm()}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add New Event Type
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : eventTypes.length === 0 ? (
        <p>No event types found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {eventTypes.map((eventType) => (
            <div
              key={eventType._id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{eventType.name}</h2>
              <p className="mb-2 text-gray-900 dark:text-gray-300">
                Rate Per Guest: BDT {eventType.ratePerGuest.toFixed(2)}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => openForm(eventType)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(eventType._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {editData ? "Edit Event Type" : "Add New Event Type"}
            </h2>
