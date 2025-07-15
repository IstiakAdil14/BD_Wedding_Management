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
