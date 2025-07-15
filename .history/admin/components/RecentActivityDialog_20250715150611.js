import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MessageIcon from "@mui/icons-material/Message";
import CommentIcon from "@mui/icons-material/Comment";

const activityTypeIcons = {
  Portfolio: <PhotoLibraryIcon fontSize="large" />,
  Message: <MessageIcon fontSize="large" />,
  Testimonial: <CommentIcon fontSize="large" />,
};

export default function RecentActivityDialog({ isOpen, onClose, activity }) {
  if (!isOpen || !activity) return null;

  const icon = activityTypeIcons[activity.type] || null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
