import React, { useState, useRef, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import { DarkModeContext } from "../context/DarkModeContext";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

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

export default function Team() {
  const { darkMode } = useContext(DarkModeContext);
  const width = useWindowWidth();

  const [teamMembers, setTeamMembers] = useState([]);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    bio: "",
    image: null,
    facebook: "",
    instagram: "",
    visible: true,
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch team members from API on mount
  useEffect(() => {
    fetch("/api/admin/team")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch team members: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setTeamMembers(data);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        alert("Image size must be less than 20MB.");
        e.target.value = null; // Reset file input
        return;
      }
      // For simplicity, convert image to base64 string to send to backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetNewMember = () => {
    setNewMember({
      name: "",
      role: "",
      bio: "",
      image: null,
      facebook: "",
      instagram: "",
      visible: true,
    });
    setEditingId(null);
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.bio) {
      alert("Please fill in all required fields.");
      return;
    }
    fetch("/api/admin/team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add team member");
        return res.json();
      })
      .then((addedMember) => {
        setTeamMembers((prev) => [...prev, addedMember]);
        resetNewMember();
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding team member");
      });
  };

  const handleEditMember = (id) => {
    const member = teamMembers.find((m) => m._id === id);
    if (member) {
      setNewMember(member);
      setEditingId(id);
    }
  };

  const handleUpdateMember = () => {
    fetch(`/api/admin/team/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update team member");
        return res.json();
      })
      .then((updatedMember) => {
        setTeamMembers((prev) =>
          prev.map((m) => (m._id === editingId ? updatedMember : m))
        );
        resetNewMember();
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating team member");
      });
  };

  const handleDeleteMember = (id) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      fetch(`/api/admin/team/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete team member");
          setTeamMembers((prev) => prev.filter((m) => m._id !== id));
        })
        .catch((err) => {
          console.error(err);
          alert("Error deleting team member");
        });
    }
  };

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
      {width >= 580 ? (
        <motion.nav
          className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
            darkMode
              ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
              : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
          }`}
        >
          <ManagementMenu />
        </motion.nav>
      ) : (
        <div className="p-4 sticky top-0 left-0">
          <HamburgerMenu />
        </div>
      )}

      {/* Main Content */}
      <motion.main
        className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen"
        variants={itemVariants}
        style={{ marginLeft: "2rem" }}
      >
        <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
          Team Members Management
        </motion.h1>

        {/* Team Member Form */}
        <motion.div
          className="mb-6 p-4 border rounded shadow"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Update Team Member Details" : "Add a New Team Member"}
          </h2>
          <div className="mb-3">
            <label className="block font-semibold mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={newMember.name}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : ''}`}
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">Position / Role *</label>
            <input
              type="text"
              name="role"
              value={newMember.role}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : ''}`}
              placeholder="Enter role or position"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">Short Biography *</label>
            <textarea
              name="bio"
              value={newMember.bio}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : ''}`}
              rows={4}
              placeholder="Write a brief bio"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">Facebook Profile URL</label>
            <input
              type="url"
              name="facebook"
              value={newMember.facebook}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : ''}`}
              placeholder="https://facebook.com/username"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">Instagram Profile URL</label>
            <input
              type="url"
              name="instagram"
              value={newMember.instagram}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : ''}`}
              placeholder="https://instagram.com/username"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">Profile Photo</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {newMember.image && (
              <img
                src={newMember.image}
                alt={newMember.name}
                className="mt-2 max-h-40 object-cover rounded"
              />
            )}
          </div>
          <div className="mb-3 flex items-center space-x-3">
            <input
              type="checkbox"
              name="visible"
              checked={newMember.visible}
              onChange={handleInputChange}
              id="visible"
            />
            <label htmlFor="visible" className="font-semibold">
              Display this member on the team page
            </label>
          </div>
          <div>
            {editingId ? (
              <button
                onClick={handleUpdateMember}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Add Member
              </button>
            )}
          </div>
        </motion.div>

        {/* Team Members List */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">Existing Team Members</h2>
          {teamMembers.length === 0 ? (
            <p>No team members added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Name</th>
                    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Role</th>
                    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Bio</th>
                    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Image</th>
                    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Facebook</th>
                    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Instagram</th>
                    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Visibility</th>
                    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100">{member.name}</td>
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100">{member.role}</td>
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100">{member.bio}</td>
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-center">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="h-16 w-16 object-cover rounded" />
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">No Image</span>
                        )}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm text-blue-600 dark:text-blue-400">
                        {member.facebook ? (
                          <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="underline">
                            Facebook
                          </a>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm text-pink-600 dark:text-pink-400">
                        {member.instagram ? (
                          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="underline">
                            Instagram
                          </a>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {member.visible ? "Visible" : "Hidden"}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-center space-x-2">
                        <button
                          onClick={() => handleEditMember(member._id)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member._id)}
      </motion.main>
    </motion.div>
  );
}
