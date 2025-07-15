import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const PortfolioEventDialog = ({ isOpen, onClose, onSave, event }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([""]);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setCategory(event.category || "");
      setImages(event.images && event.images.length > 0 ? event.images : [""]);
      setVideo(event.video || "");
      setDescription(event.description || "");
    } else {
      setTitle("");
      setCategory("");
      setImages([""]);
      setVideo("");
      setDescription("");
    }
  }, [event]);

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, ""]);
