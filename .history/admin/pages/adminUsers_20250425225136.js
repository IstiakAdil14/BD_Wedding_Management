import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import useWindowWidth from "../hooks/useWindowWidth";
import { FiX } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

export default function AdminUsers() {
  const { darkMode } = useContext(DarkModeContext);
  const windowWidth = useWindowWidth();

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Admin One",
      email: "admin@example.com",
      role: "Full Access",
      photo:
        "https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=",
    },
  ]);

  // Mock logged-in admin profile
  const [loggedInAdmin, setLoggedInAdmin] = useState({
    id: 1,
    name: "Istiak Adil",
    email: "admin@example.com",
    role: "Full Access",
    photo:
      "https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=",
    password: "",
  });

  const roles = ["Editor", "Full Access"];

  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [imageViewerPhoto, setImageViewerPhoto] = useState("");
  const [updateForm, setUpdateForm] = useState({
    name: "",
    photo: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOpenUpdateDialog = () => {
    setUpdateForm({
      name: loggedInAdmin.name,
      photo: loggedInAdmin.photo,
    });
    setShowUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setShowUpdateDialog(false);
  };

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = () => {
    setLoggedInAdmin((prev) => ({
      ...prev,
      name: updateForm.name,
      photo: updateForm.photo,
    }));
    setShowUpdateDialog(false);
    alert("Profile updated successfully (mock).");
  };

  const handleOpenResetPasswordDialog = () => {
    setPasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowResetPasswordDialog(true);
  };

  const handleCloseResetPasswordDialog = () => {
    setShowResetPasswordDialog(false);
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitResetPassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    // Mock password reset success
    setShowResetPasswordDialog(false);
    alert("Password reset successfully (mock).");
  };

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  return (
    <motion.div
      className={`flex h-fullscreen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Side Navbar */}
      {windowWidth >= 580 ? (
        <motion.nav
          className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
            darkMode
              ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
              : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
          }`}
          variants={itemVariants}
        >
          <ManagementMenu />
        </motion.nav>
      ) : (
        !showImageViewer && (
          <div className="p-4 sticky top-0 left-0 z-50">
            <HamburgerMenu />
          </div>
        )
      )}

      {/* Main Content */}
      <motion.main
        className={`flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ${
          windowWidth < 580 ? "ml-16" : ""
        }`}
        variants={itemVariants}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100"
          variants={itemVariants}
        >
          Admin Users Management
        </motion.h1>
        {/* Admin Profile View */}
        <motion.div
          className="mb-6 p-4 border rounded shadow max-w-md"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Admin Profile
          </h2>
          <div className="mb-3 flex items-center space-x-4">
            {loggedInAdmin.photo && (
              <img
                src={loggedInAdmin.photo}
                alt={`${loggedInAdmin.name || "Admin"} photo`}
                className="w-20 h-20 rounded-full object-cover cursor-pointer"
                onClick={() => {
                  setImageViewerPhoto(loggedInAdmin.photo);
                  setShowImageViewer(true);
                  setSelectedAdmin(null);
                }}
              />
            )}
            <div>
              <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {loggedInAdmin.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {loggedInAdmin.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Role: {loggedInAdmin.role}
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedAdmin(loggedInAdmin)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              View Details
            </button>
          </div>
        </motion.div>
        =======
        {/* Update Profile Dialog */}
        {showUpdateDialog && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCloseUpdateDialog}
          >
            <div
              className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Update Profile
              </h2>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  value={updateForm.photo}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={updateForm.name}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCloseUpdateDialog}
                  className="px-4 py-2 bg-gray-400 text-gray-900 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Reset Password Dialog */}
        {showResetPasswordDialog && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCloseResetPasswordDialog}
          >
            <div
              className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Reset Password
              </h2>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordFormChange}
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordFormChange}
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordFormChange}
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCloseResetPasswordDialog}
                  className="px-4 py-2 bg-gray-400 text-gray-900 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitResetPassword}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Admins List */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">Existing Admin Users</h2>
          {admins.length === 0 ? (
            <p>No admin users added yet.</p>
          ) : (
            <ul className="space-y-4">
              {admins.map((admin) => (
                <li key={admin.id} className="border p-4 rounded shadow">
                  <p>
                    <strong>Email:</strong> {admin.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {admin.role}
                  </p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => setSelectedAdmin(admin)}
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.main>

      {selectedAdmin && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedAdmin(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Admin Details
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              {selectedAdmin.photo && (
                <img
                  src={selectedAdmin.photo}
                  alt={`${selectedAdmin.name || "Admin"} photo`}
                  className="w-20 h-20 rounded-full object-cover cursor-pointer"
                  onClick={() => {
                    setImageViewerPhoto(selectedAdmin.photo);
                    setShowImageViewer(true);
                    setSelectedAdmin(null);
                  }}
                />
              )}
              <div>
                <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {selectedAdmin.name || "No Name"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedAdmin.email}
                </p>
              </div>
            </div>
            <p className="text-gray-900 dark:text-gray-100">
              <strong>Role:</strong> {selectedAdmin.role}
            </p>
            {selectedAdmin.id === loggedInAdmin.id && (
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => {
                    setShowUpdateDialog(true);
                    setUpdateForm({
                      name: loggedInAdmin.name,
                      photo: loggedInAdmin.photo,
                    });
                    setSelectedAdmin(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Update Profile
                </button>
                <button
                  onClick={() => {
                    setShowResetPasswordDialog(true);
                    setPasswordForm({
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setSelectedAdmin(null);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  Reset Password
                </button>
              </div>
            )}
            <button
              onClick={() => setSelectedAdmin(null)}
              className="absolute top-20 right-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold text-lg"
            >
              X
            </button>
          </div>
        </div>
      )}
      {showImageViewer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-60"
          onClick={() => setShowImageViewer(false)}
        >
          <img
            src={imageViewerPhoto}
            alt="Admin photo"
            className="max-w-full max-h-full rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setShowImageViewer(false)}
            className="absolute top-4 right-4 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition font-bold text-lg"
          >
            X
          </button>
        </div>
      )}
    </motion.div>
  );
}
