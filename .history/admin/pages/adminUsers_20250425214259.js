import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import useWindowWidth from "../hooks/useWindowWidth";

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
      photo: "https://via.placeholder.com/80?text=Admin+1",
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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setLoggedInAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    alert("Profile updated successfully (mock).");
  };

  const handleResetPassword = () => {
    alert("Password reset functionality is not implemented in this mock.");
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
        <div className="p-4 sticky top-0 left-0 z-50">
          <HamburgerMenu />
        </div>
      )}

      {/* Main Content */}
      <motion.main
        className={`flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ${
          windowWidth < 580 ? "ml-16" : ""
        }`}
        variants={itemVariants}
      >
        <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
          Admin Users Management
        </motion.h1>

        {/* Admin Profile Form */}
        <motion.div
          className="mb-6 p-4 border rounded shadow max-w-md"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Admin Profile</h2>
          <div className="mb-3 flex items-center space-x-4">
            {loggedInAdmin.photo && (
              <img
                src={loggedInAdmin.photo}
                alt={`${loggedInAdmin.name || "Admin"} photo`}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <input
              type="text"
              name="photo"
              value={loggedInAdmin.photo}
              onChange={handleProfileChange}
              placeholder="Photo URL"
              className="flex-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">Name</label>
            <input
              type="text"
              name="name"
              value={loggedInAdmin.name}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">Email</label>
            <input
              type="email"
              name="email"
              value={loggedInAdmin.email}
              readOnly
          <div className="flex space-x-4">
            <button
              onClick={handleUpdateProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
            <button
              onClick={handleResetPassword}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Reset Password
            </button>
          </div>
        </motion.div>

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
            <h2 className="text-xl font-bold mb-4">Admin Details</h2>
            <div className="flex items-center space-x-4 mb-4">
              {selectedAdmin.photo && (
                <img
                  src={selectedAdmin.photo}
                  alt={`${selectedAdmin.name || "Admin"} photo`}
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-lg">
                  {selectedAdmin.name || "No Name"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedAdmin.email}
                </p>
              </div>
            </div>
            <p>
              <strong>Role:</strong> {selectedAdmin.role}
            </p>
            <button
              onClick={() => setSelectedAdmin(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
