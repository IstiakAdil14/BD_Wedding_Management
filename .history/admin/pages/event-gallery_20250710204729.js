import React, { useState, useEffect } from "react";
import EventGalleryDialog from "../components/EventGalleryDialog";

const EventGalleryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/eventGallery");
      if (res.ok) {
        const data = await res.json();
        const baseUrl = window.location.origin;
        const updatedData = data.map(item => {
          if (item.video && !item.video.startsWith("http")) {
            return { ...item, video: baseUrl + item.video };
          }
          return item;
        });
        setItems(updatedData);
      } else {
        console.error("Failed to fetch event gallery items");
      }
    } catch (error) {
      console.error("Error fetching event gallery items:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddClick = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const handleEditClick = (item) => {
    const baseUrl = window.location.origin;
    const updatedItem = { ...item };
    if (item.video && !item.video.startsWith("http")) {
      updatedItem.video = baseUrl + item.video;
    }
    setEditData(updatedItem);
    setDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (!confirm("Are you sure you want to delete this event gallery item?")) return;
    try {
      const res = await fetch(`/api/eventGallery/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchItems();
      } else {
        console.error("Failed to delete event gallery item");
      }
    } catch (error) {
      console.error("Error deleting event gallery item:", error);
    }
  };

  const handleSave = async (data) => {
    try {
      let videoUrl = "";
      if (data.video && typeof data.video === "object") {
        // Upload video file first
        const formData = new FormData();
        formData.append("video", data.video);
        const uploadRes = await fetch("/api/uploadVideo", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          const baseUrl = window.location.origin;
          videoUrl = baseUrl + uploadData.videoUrl;
        } else {
          alert("Failed to upload video.");
          return;
        }
      } else if (typeof data.video === "string") {
        videoUrl = data.video;
      }

      const updatedData = { ...data, video: videoUrl };

      const method = data._id ? "PUT" : "POST";
      const url = data._id ? `/api/eventGallery/${data._id}` : "/api/eventGallery";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        setDialogOpen(false);
        fetchItems();
      } else {
        console.error("Failed to save event gallery item");
      }
    } catch (error) {
      console.error("Error saving event gallery item:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Event Gallery</h1>
      <button
        onClick={handleAddClick}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add New Event Gallery Item
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No event gallery items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="mb-2">{item.description}</p>
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <EventGalleryDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editData}
      />
    </div>
  );
};

export default EventGalleryPage;
