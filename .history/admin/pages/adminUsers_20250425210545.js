
import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../context/DarkModeContext';
import ManagementMenu from '../components/ManagementMenu';
import HamburgerMenu from '../components/HamburgerMenu';
import useWindowWidth from '../hooks/useWindowWidth';

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
  const windowWidth = useWindowWidth();

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
