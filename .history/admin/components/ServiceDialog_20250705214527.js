
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
        const categoriesResponse = await fetch("/api/categories");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const eventTypesResponse = await fetch("/api/eventTypes");
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
