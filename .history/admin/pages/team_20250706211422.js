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
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to add team member: ${text}`);
        }
        return res.json();
      })
      .then((addedMember) => {

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
            <ul className="space-y-4">
              {teamMembers.map((member) => (
                <li key={member._id} className="border p-4 rounded shadow">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="italic">{member.role}</p>
                  <p>{member.bio}</p>
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="mt-2 max-h-40 object-cover rounded"
                    />
                  )}
                  <p className="mt-2">
                    {member.facebook && (
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-4 text-blue-600 underline"
                      >
                        Facebook
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 underline"
                      >
                        Instagram
                      </a>
                    )}
                  </p>
                  <p className="mt-2 font-semibold">
                    {member.visible ? "Visible" : "Hidden"}
                  </p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleEditMember(member._id)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member._id)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
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
