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

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function draftRawToHtml(raw) {
  if (!raw) return "";
  try {
    // Try parse as JSON draft.js raw content
    const parsed = JSON.parse(raw);
    if (parsed && parsed.blocks && Array.isArray(parsed.blocks)) {
      const contentState = convertFromRaw(parsed);
      return stateToHTML(contentState);
    } else {
      // Not draft.js raw, treat as plain text
      return raw;
    }
  } catch (e) {
    // Not JSON, treat as plain text
    return raw;
  }
}

// Helper function to convert draft.js raw content to plain text
function draftRawToText(raw) {
  if (!raw) return "";
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.blocks && Array.isArray(parsed.blocks)) {
      return parsed.blocks.map(block => block.text).join("\n");
    } else {
      return raw;
    }
  } catch (e) {
    return raw;
  }
}

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

  // Editor state for bio using draft.js
  const [bioEditorState, setBioEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [editingId, setEditingId] = useState(null);

  // New state for About content
  const [aboutContent, setAboutContent] = useState({
    ourStory: "",
    missionAndValues: "",
  });

  const [aboutLoading, setAboutLoading] = useState(true);

  // Editor states for Draft.js
  const [ourStoryEditorState, setOurStoryEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [missionEditorState, setMissionEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    setHasMounted(true);
  }, []);
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

  // Fetch about content on mount and initialize EditorStates
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
        try {
          const ourStoryContent = data.ourStory
            ? convertFromRaw(JSON.parse(data.ourStory))
            : null;
          const missionContent = data.missionAndValues
            ? convertFromRaw(JSON.parse(data.missionAndValues))
            : null;
          setOurStoryEditorState(
            ourStoryContent
              ? EditorState.createWithContent(ourStoryContent)
              : EditorState.createEmpty()
          );
          setMissionEditorState(
            missionContent
              ? EditorState.createWithContent(missionContent)
              : EditorState.createEmpty()
          );
        } catch (e) {
          // If parsing fails, fallback to empty editor
          setOurStoryEditorState(EditorState.createEmpty());
          setMissionEditorState(EditorState.createEmpty());
        }
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

  // Handle bio editor state change
  const handleBioEditorChange = (editorState) => {
    setBioEditorState(editorState);
    const rawContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    setNewMember((prev) => ({
      ...prev,
      bio: rawContent,
    }));
  };

  // Remove handleAboutChange since Draft.js editors will handle content

  // Save About content
  const handleSaveAbout = () => {
    const ourStoryRaw = JSON.stringify(
      convertToRaw(ourStoryEditorState.getCurrentContent())
    );
    const missionRaw = JSON.stringify(
      convertToRaw(missionEditorState.getCurrentContent())
    );
    fetch("/api/admin/about", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ourStory: ourStoryRaw,
        missionAndValues: missionRaw,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save about content");
        return res.json();
      })
      .then((data) => {
        alert("About content saved successfully");
        setAboutContent({
          ourStory: ourStoryRaw,
          missionAndValues: missionRaw,
        });
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

  // When editing a member, initialize bioEditorState from raw bio content
  useEffect(() => {
    if (editingId) {
      try {
        const contentState = newMember.bio
          ? convertFromRaw(JSON.parse(newMember.bio))
          : null;
        setBioEditorState(
          contentState
            ? EditorState.createWithContent(contentState)
            : EditorState.createEmpty()
        );
      } catch (e) {
        setBioEditorState(EditorState.createEmpty());
      }
    } else {
      setBioEditorState(EditorState.createEmpty());
    }
  }, [editingId]);

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
            <div className="mb-3">
              <label className="block font-semibold mb-1">
                Short Biography *
              </label>
              <div
                className={`w-full p-2 border rounded ${
                  darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
                }`}
                style={{ minHeight: 100, cursor: "text" }}
              >
                <Editor
                  editorState={bioEditorState}
                  onEditorStateChange={handleBioEditorChange}
                  placeholder="Write a brief bio"
                  spellCheck={true}
                  toolbarClassName="rdw-storybook-toolbar"
                  wrapperClassName="rdw-storybook-wrapper"
                  editorClassName="rdw-storybook-editor"
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "fontSize",
                      "list",
                      "textAlign",
                      "colorPicker",
                      "link",
                      "emoji",
                      "image",
                      "remove",
                      "history",
                    ],
                    inline: {
                      options: [
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "monospace",
                      ],
                    },
                    list: {
                      options: ["unordered", "ordered"],
                    },
                    textAlign: {
                      options: ["left", "center", "right", "justify"],
                    },
                    image: {
                      urlEnabled: true,
                      uploadEnabled: false,
                      previewImage: true,
                      alt: { present: true, mandatory: false },
                    },
                  }}
                />
              </div>
            </div>
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
          <h2 className="text-xl font-semibold mb-4">
            Manage About Page Content
          </h2>
          {aboutLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Our Story</label>
                <div
                  className={`w-full p-2 border rounded ${
                    darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
                  }`}
                  style={{ minHeight: 150, cursor: "text" }}
                >
                  <Editor
                    editorState={ourStoryEditorState}
                    onEditorStateChange={setOurStoryEditorState}
                    placeholder="Enter the Our Story content"
                    spellCheck={true}
                    toolbarClassName="rdw-storybook-toolbar"
                    wrapperClassName="rdw-storybook-wrapper"
                    editorClassName="rdw-storybook-editor"
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "emoji",
                        "image",
                        "remove",
                        "history",
                      ],
                      inline: {
                        options: [
                          "bold",
                          "italic",
                          "underline",
                          "strikethrough",
                          "monospace",
                        ],
                      },
                      list: {
                        options: ["unordered", "ordered"],
                      },
                      textAlign: {
                        options: ["left", "center", "right", "justify"],
                      },
                      image: {
                        urlEnabled: true,
                        uploadEnabled: false,
                        previewImage: true,
                        alt: { present: true, mandatory: false },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1">
                  Mission & Values
                </label>
                <div
                  className={`w-full p-2 border rounded ${
                    darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
                  }`}
                  style={{ minHeight: 150, cursor: "text" }}
                >
                  <Editor
                    editorState={missionEditorState}
                    onEditorStateChange={setMissionEditorState}
                    placeholder="Enter the Mission & Values content"
                    spellCheck={true}
                    toolbarClassName="rdw-storybook-toolbar"
                    wrapperClassName="rdw-storybook-wrapper"
                    editorClassName="rdw-storybook-editor"
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "emoji",
                        "image",
                        "remove",
                        "history",
                      ],
                      inline: {
                        options: [
                          "bold",
                          "italic",
                          "underline",
                          "strikethrough",
                          "monospace",
                        ],
                      },
                      list: {
                        options: ["unordered", "ordered"],
                      },
                      textAlign: {
                        options: ["left", "center", "right", "justify"],
                      },
                      image: {
                        urlEnabled: true,
                        uploadEnabled: false,
                        previewImage: true,
                        alt: { present: true, mandatory: false },
                      },
                    }}
                  />
                </div>
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

        {/* Team Members List */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">Existing Team Members</h2>
          {teamMembers.length === 0 ? (
            <p>No team members added yet.</p>
          ) : (
            <div
              className="overflow-x-auto w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
{width >= 580 ? (
  <table className="min-w-full w-full table-auto border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
    <thead className="bg-gray-200 dark:bg-gray-700">
      <tr>
            </div>
          )}
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
