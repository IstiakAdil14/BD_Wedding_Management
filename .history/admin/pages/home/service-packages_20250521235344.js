import React, { useState, useEffect } from "react";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";
import ServiceDialog from "../../components/ServiceDialog";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddClick = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const handleEditClick = (service) => {
    setEditData(service);
    setDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchServices();
      } else {
        console.error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleSave = async (data) => {
    try {
      const method = data._id ? "PUT" : "POST";
      const url = data._id ? `/api/services/${data._id}` : "/api/services";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setDialogOpen(false);
        fetchServices();
      } else {
        console.error("Failed to save service");
      }
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  return (
    <div className="flex">
      <ManagementMenu />
      <HamburgerMenu />
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4">Service Packages</h1>
        <button
          onClick={handleAddClick}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Service
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service._id}
                className="border rounded p-4 shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                <p className="mb-2">{service.description}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(service)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(service._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <ServiceDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSave}
          initialData={editData}
        />
      </main>
    </div>
  );
};

export default ServicesPage;
