import React, { useState, useRef, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import { DarkModeContext } from "../context/DarkModeContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Add hasMounted state to avoid hydration errors
  const [hasMounted, setHasMounted] = useState(false);

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

  // New state for About content
  const [aboutContent, setAboutContent] = useState({
    ourStory: "",
    missionAndValues: "",
  });

  const [aboutLoading, setAboutLoading] = useState(true);

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

  // Fetch about content on mount
  useEffect(() => {
    fetch("/api/admin/about")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch about content: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setAboutContent({
          ourStory: data.ourStory || "",
          missionAndValues: data.missionAndValues || "",
        });
        setAboutLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
        setAboutLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle input change for About content
  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setAboutContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save About content
  const handleSaveAbout = () => {
    fetch("/api/admin/about", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aboutContent),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save about content");
        return res.json();
      })
      .then((data) => {
        alert("About content saved successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving about content");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        // 20MB limit
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
  if (!hasMounted) return null;

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
              className={`w-full p-2 border rounded ${
                darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
              }`}
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">
              Position / Role *
            </label>
            <input
              type="text"
              name="role"
              value={newMember.role}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${
                darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
              }`}
              placeholder="Enter role or position"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">
              Short Biography *
            </label>
            <textarea
              name="bio"
              value={newMember.bio}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${
                darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
              }`}
              rows={4}
              placeholder="Write a brief bio"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">
              Facebook Profile URL
            </label>
            <input
              type="url"
              name="facebook"
              value={newMember.facebook}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${
                darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
              }`}
              placeholder="https://facebook.com/username"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">
              Instagram Profile URL
            </label>
            <input
              type="url"
              name="instagram"
              value={newMember.instagram}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${
                darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
              }`}
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

        

        {/* About Content Management Section */}
        <motion.div
          className="mb-6 p-4 border rounded shadow"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold mb-4">Manage About Page Content</h2>
          {aboutLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Our Story</label>
                <textarea
                  name="ourStory"
                  value={aboutContent.ourStory}
                  onChange={handleAboutChange}
                  className={`w-full p-2 border rounded ${
                    darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
                  }`}
                  rows={6}
                  placeholder="Enter the Our Story content"
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Mission & Values</label>
                <textarea
                  name="missionAndValues"
                  value={aboutContent.missionAndValues}
                  onChange={handleAboutChange}
                  className={`w-full p-2 border rounded ${
                    darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
                  }`}
                  rows={6}
                  placeholder="Enter the Mission & Values content"
                />
              </div>
              <button
                onClick={handleSaveAbout}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Save About Content
              </button>
            </>
          )}
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
