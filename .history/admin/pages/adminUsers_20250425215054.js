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
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Admin Details</h2>
            <div className="flex items-center space-x-4 mb-4">
              {selectedAdmin.photo && (
                <img
                  src={selectedAdmin.photo}
                  alt={`${selectedAdmin.name || "Admin"} photo`}
                  className="w-20 h-20 rounded-full object-cover"
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
