
import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';

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
  const [allCustomizeServices, setAllCustomizeServices] = useState([]); // all customize services
  const [filteredEventTypes, setFilteredEventTypes] = useState([]); // event types filtered by category

  useEffect(() => {
    // Fetch categories, event types, and all customize services on mount
    async function fetchData() {
      try {
        const categoriesResponse = await fetch("/api/customizeServices/categories");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const eventTypesResponse = await fetch("/api/customizeServices/eventTypes");
        const eventTypesData = await eventTypesResponse.json();
        setEventTypes(eventTypesData);

        const allServicesResponse = await fetch("/api/customizeServices");
        const allServicesData = await allServicesResponse.json();
        setAllCustomizeServices(allServicesData);
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
      // Filter event types based on initial category
      const filtered = allCustomizeServices
        .filter((service) => service.category === (initialData.category || ""))
        .map((service) => service.eventType);
