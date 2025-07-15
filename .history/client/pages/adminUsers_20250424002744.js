import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../../admin/context/DarkModeContext';
import ManagementMenu from '../../admin/components/ManagementMenu';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 10 },
  },
};

export default function AdminUsers() {
  const { darkMode } = useContext(DarkModeContext);

  const [admins, setAdmins] = useState([
    {
      id: 1,
      email: 'admin@example.com',
      role: 'Full Access',
    },
  ]);

  const [newAdmin, setNewAdmin] = useState({
    email: '',
    role: 'Editor',
    password: '',
  });

  const [editingId, setEditingId] = useState(null);

  const roles = ['Editor', 'Full Access'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAdmin = () => {
    if (!newAdmin.email || !newAdmin.password) {
      alert('Please fill in all required fields.');
      return;
    }
    const id = admins.length ? Math.max(...admins.map((a) => a.id)) + 1 : 1;
    setAdmins([...admins, { id, email: newAdmin.email, role: newAdmin.role }]);
    setNewAdmin({
      email: '',
      role: 'Editor',
      password: '',
    });
  };

  const handleEditAdmin = (id) => {
    const admin = admins.find((a) => a.id === id);
    if (admin) {
      setNewAdmin({ ...admin, password: '' });
      setEditingId(id);
    }
  };

  const handleUpdateAdmin = () => {
    setAdmins(admins.map((a) => (a.id === editingId ? { ...newAdmin, id: editingId } : a)));
    setNewAdmin({
      email: '',
      role: 'Editor',
      password: '',
    });
    setEditingId(null);
  };

  const handleDeleteAdmin = (id) => {
    if (confirm('Are you sure you want to delete this admin user?')) {
      setAdmins(admins.filter((a) => a.id !== id));
    }
  };

  const handleResetPassword = (id) => {
    alert('Password reset functionality is not implemented in this mock.');
  };

  return (
    <motion.div
      className={`flex h-fullscreen ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Side Navbar */}
      <motion.nav
        className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
          darkMode
            ? 'bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800'
            : 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600'
        }`}
        variants={itemVariants}
      >
        <ManagementMenu />
      </motion.nav>

      {/* Main Content */}
      <motion.main className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen" variants={itemVariants}>
        <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
          Admin Users Management
        </motion.h1>

        {/* Admin Form */}
        <motion.div className="mb-6 p-4 border rounded shadow" variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Admin User' : 'Add New Admin User'}</h2>
          <div className="mb-3">
            <label className="block font-semibold mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={newAdmin.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {!editingId && (
            <div className="mb-3">
              <label className="block font-semibold mb-1">Password *</label>
              <input
                type="password"
                name="password"
                value={newAdmin.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          )}
          <div className="mb-3">
            <label className="block font-semibold mb-1">Role</label>
            <select
              name="role"
              value={newAdmin.role}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div>
            {editingId ? (
              <button
                onClick={handleUpdateAdmin}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Update Admin
              </button>
            ) : (
              <button
                onClick={handleAddAdmin}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Add Admin
              </button>
            )}
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
                  <p><strong>Email:</strong> {admin.email}</p>
                  <p><strong>Role:</strong> {admin.role}</p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleEditAdmin(admin.id)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleResetPassword(admin.id)}
                      className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                    >
                      Reset Password
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
