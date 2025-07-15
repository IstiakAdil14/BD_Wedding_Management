import React, { useState, useEffect } from "react";
import CustomizeServiceDialog from "../components/CustomizeServiceDialog";

const CustomizeServicesPage = () => {
  const [customizeServices, setCustomizeServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchCustomizeServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/customizeBookings");
      if (res.ok) {
        const data = await res.json();
        setCustomizeServices(data);
      } else {
        console.error("Failed to fetch customize services");
      }
    } catch (error) {
      console.error("Error fetching customize services:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomizeServices();
  }, []);

  const handleAddClick = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const handleEditClick = (customService) => {
    setEditData(customService);
    setDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (!confirm("Are you sure you want to delete this customize service?")) return;
    try {
      const res = await fetch(`/api/customizeBookings/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchCustomizeServices();
      } else {
        console.error("Failed to delete customize service");
      }
    } catch (error) {
      console.error("Error deleting customize service:", error);
    }
  };

  const handleSave = async (data) => {
    try {
      const method = data._id ? "PUT" : "POST";
      const url = data._id ? `/api/customizeBookings/${data._id}` : "/api/customizeBookings";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setDialogOpen(false);
        fetchCustomizeServices();
      } else {
        console.error("Failed to save customize service");
      }
    } catch (error) {
      console.error("Error saving customize service:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Customize Services</h1>
      <button
        onClick={handleAddClick}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Add New Customize Service
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : customizeServices.length === 0 ? (
        <p>No customize services found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {customizeServices.map((customService) => (
            <div
              key={customService._id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{customService.category}</h2>
              <p className="mb-2 text-gray-900 dark:text-gray-300">{customService.categoryDescription}</p>
              <p className="mb-2 font-semibold">Rate Per Guest: BDT {customService.ratePerGuest.toFixed(2)}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(customService)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(customService._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <CustomizeServiceDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        service={editData}
      />
    </div>
  );
};

export default CustomizeServicesPage;
