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
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          aria-label="Close Recent Activity Dialog"
        >
          <CloseIcon />
        </button>
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-blue-600 dark:text-blue-400">{icon}</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {activity.title}
          </h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Type:</strong> {activity.type}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Date:</strong> {activity.date}
        </p>
        {(activity.message || activity.description) && (
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Message:</strong> {activity.message || activity.description}
          </p>
        )}
      </div>
    </div>
  );
}
