import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CustomizeServiceDialog = ({ isOpen, onClose, onSave, service }) => {
  const defaultCategories = [
    { _id: "venue-decoration", name: "Venue Decoration", description: "Services related to venue decoration" },
    { _id: "premium-features", name: "Premium Features", description: "Premium service features" },
