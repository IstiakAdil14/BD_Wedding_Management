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
    <div className="flex relative dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="hidden md:block">
        <ManagementMenu />
      </div>
      <div className="md:hidden w-12">
        <HamburgerMenu />
      </div>
    </div>
  );
};

export default ServicesPage;
