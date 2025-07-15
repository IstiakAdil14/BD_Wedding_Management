import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../context/DarkModeContext';
import ManagementMenu from '../components/ManagementMenu';

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
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Users Management</h1>

      {/* Admin Form */}
      <div className="mb-6 p-4 border rounded shadow">
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
      </div>

      {/* Admins List */}
      <div>
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
      </div>
    </div>
  );
}
