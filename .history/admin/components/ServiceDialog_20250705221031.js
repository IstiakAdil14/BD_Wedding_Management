
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
