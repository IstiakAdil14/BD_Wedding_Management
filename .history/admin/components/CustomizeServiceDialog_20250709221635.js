import React, { useState, useEffect } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";

const CustomizeServiceDialog = ({ isOpen, onClose, onSave, service }) => {
  const defaultCategories = [
    { _id: "venue-decoration", name: "Venue Decoration", description: "Services related to venue decoration" },
    { _id: "premium-features", name: "Premium Features", description: "Premium service features" },
    { _id: "full-planning", name: "Full Planning", description: "Complete event planning services" },
  ];

  const defaultEventTypes = [
    { _id: "wedding", name: "WEDDING", ratePerGuest: 1500 },
    { _id: "reception", name: "reception", ratePerGuest: 1200 },
