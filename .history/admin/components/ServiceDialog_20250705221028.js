
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
