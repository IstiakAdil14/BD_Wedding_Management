import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ServiceDialog from "../components/ServiceDialog";
const CustomizeServiceDialog = dynamic(
  () => import("../components/CustomizeServiceDialog"),
  { ssr: false }
);
import HamburgerMenu from "../components/HamburgerMenu";
import ManagementMenu from "../components/ManagementMenu";
import useWindowWidth from "../hooks/useWindowWidth";
import { DarkModeContext } from "../context/DarkModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";
import AddBoxIcon from "@mui/icons-material/AddBox";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const ServicesPage = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  // Add CSS styles for draft-js toolbar dark mode (copied from hero-section.js)
  const draftDarkModeStyles = `
    .rdw-editor-toolbar {
      background-color: #1f2937 !important;
      border: 1px solid #374151 !important;
    }
    .rdw-option-wrapper {
      background-color: #374151 !important;
      border: 1px solid #4b5563 !important;
      color: #f9fafb !important;
    }
    .rdw-option-wrapper:hover {
      background-color: #4b5563 !important;
      border-color: #6b7280 !important;
    }
    .rdw-dropdown-wrapper {
      background-color: #374151 !important;
      border: 1px solid #4b5563 !important;
      color: #f9fafb !important;
    }
    .rdw-dropdown-wrapper:hover {
      background-color: #4b5563 !important;
      border-color: #6b7280 !important;
    }
    .rdw-dropdown-optionwrapper {
      background-color: #1f2937 !important;
      color: #f9fafb !important;
    }
    .rdw-dropdownoption-default {
      color: #f9fafb !important;
    }
    .rdw-dropdownoption-active {
      background-color: #2563eb !important;
      color: white !important;
    }
    .rdw-inline-wrapper {
      color: #f9fafb !important;
    }
  `;

  // Inject style tag for dark mode styles if darkMode is true
  useEffect(() => {
    let styleTag = document.getElementById("draft-dark-mode-styles");
    if (darkMode) {
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "draft-dark-mode-styles";
        styleTag.innerHTML = draftDarkModeStyles;
        document.head.appendChild(styleTag);
      }
    } else {
      if (styleTag) {
        styleTag.remove();
      }
    }
  }, [darkMode]);

  const [services, setServices] = useState([]);
  const [customizeServices, setCustomizeServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [customizeDialogOpen, setCustomizeDialogOpen] = useState(false);
  const [customizeEditData, setCustomizeEditData] = useState(null);

  const [showCustomizeServices, setShowCustomizeServices] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // New editor state for client page text
  const [clientTextEditorState, setClientTextEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const windowWidth = useWindowWidth();
  const [hasMounted, setHasMounted] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper function to truncate string to max length with ellipsis
  const truncateString = (str, maxLength = 6) => {
    if (!str) return "";
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "...";
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
    setLoading(false);
  };

  const fetchCustomizeServices = async () => {
    try {
      const res = await fetch("/api/customizeServices");
      if (res.ok) {
        const data = await res.json();
        setCustomizeServices(data);
      } else {
        console.error("Failed to fetch customized services");
      }
    } catch (error) {
      console.error("Error fetching customized services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchCustomizeServices();
  }, []);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch the saved editor content from the database on mount
  useEffect(() => {
    const fetchEditorContent = async () => {
      try {
        const res = await fetch("/api/editorContent"); // Assuming this endpoint returns saved content
        if (res.ok) {
          const data = await res.json();
          if (data && data.content) {
            const contentState = convertFromRaw(JSON.parse(data.content));
            setEditorState(EditorState.createWithContent(contentState));
          }
        } else {
          console.error("Failed to fetch editor content");
        }
      } catch (error) {
        console.error("Error fetching editor content:", error);
      }
    };
    fetchEditorContent();
  }, []);

  // Fetch the saved client page text content from the database on mount
  useEffect(() => {
    const fetchClientTextContent = async () => {
      try {
        const res = await fetch("/api/clientTextContent"); // New endpoint for client text content
        if (res.ok) {
          const data = await res.json();
          if (data && data.content) {
            try {
              const rawContent = JSON.parse(data.content);
              if (
                rawContent &&
                rawContent.blocks &&
                rawContent.entityMap !== undefined
              ) {
                const contentState = convertFromRaw(rawContent);
                setClientTextEditorState(
                  EditorState.createWithContent(contentState)
                );
              } else {
                setClientTextEditorState(EditorState.createEmpty());
              }
            } catch (e) {
              console.error("Error parsing client text content:", e);
              setClientTextEditorState(EditorState.createEmpty());
            }
          } else {
            setClientTextEditorState(EditorState.createEmpty());
          }
        } else {
          console.error("Failed to fetch client text content");
        }
      } catch (error) {
        console.error("Error fetching client text content:", error);
      }
    };
    fetchClientTextContent();
  }, []);

  // Save editor content to database
  const saveEditorContent = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));
    try {
      const res = await fetch("/api/editorContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: rawContent }),
      });
      if (!res.ok) {
        console.error("Failed to save editor content");
      }
    } catch (error) {
      console.error("Error saving editor content:", error);
    }
  };

  // Save client page text content to database
  const saveClientTextContent = async () => {
    const contentState = clientTextEditorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));
    try {
      const res = await fetch("/api/clientTextContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: rawContent }),
      });
      if (res.ok) {
        alert("Client text content saved successfully.");
      } else {
        console.error("Failed to save client text content");
      }
    } catch (error) {
      console.error("Error saving client text content:", error);
    }
  };
  const handleAddClick = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const handleEditClick = (service) => {
    console.log("Editing service:", service);
    setEditData(service);
    setDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchServices();
      } else {
        console.error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleSave = async (data) => {
    console.log("handleSave called with data:", data);
    if (editData && !data._id) {
      console.warn(
        "Editing existing service but data._id is missing. This may cause creation of a new service."
      );
      data._id = editData._id; // Fix: assign _id from editData if missing
    }

    // Convert description to plain text if it is still JSON string
    try {
      if (data.description && typeof data.description === "string") {
        const parsed = JSON.parse(data.description);
        if (parsed && parsed.blocks && parsed.entityMap !== undefined) {
          // It's still raw JSON, convert to plain text
          const { EditorState, convertFromRaw } = await import("draft-js");
          const contentState = convertFromRaw(parsed);
          data.description = contentState.getPlainText();
        }
      }
    } catch (e) {
      // Not JSON, do nothing
    }

    try {
      const method = data._id ? "PUT" : "POST";
      const url = data._id ? `/api/services/${data._id}` : "/api/services";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setDialogOpen(false);
        fetchServices();
      } else {
        console.error("Failed to save service");
      }
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleCustomizeServiceClick = (customizeService = null) => {
    console.log(
      "Opening CustomizeServiceDialog with service:",
      customizeService
    );
    setCustomizeEditData(customizeService);
    setCustomizeDialogOpen(true);
  };

  const handleCustomizeSave = async (data) => {
    try {
      if (data._id) {
        // Update existing entry
        const url = `/api/customizeServices/${data._id}`;
        const res = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setCustomizeDialogOpen(false);
          fetchCustomizeServices();
        } else {
          const errorData = await res.json();
          alert(
            `Failed to save customized service: ${
              errorData.error || "Unknown error"
            }`
          );
          console.error("Failed to save customized service:", errorData);
        }
      } else {
        // Create new entry
        const url = "/api/customizeServices";
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setCustomizeDialogOpen(false);
          fetchCustomizeServices();
        } else {
          const errorData = await res.json();
          alert(
            `Failed to create customized service: ${
              errorData.error || "Unknown error"
            }`
          );
          console.error("Failed to create customized service:", errorData);
        }
      }
    } catch (error) {
      console.error("Error saving customized service:", error);
    }
  };

  const handleAddCustomizeServiceClick = () => {
    setCustomizeEditData(null);
    setCustomizeDialogOpen(true);
  };
  if (!hasMounted) return null;

  return (
    <motion.div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-1 ">
        {windowWidth <= 768 ? (
          <HamburgerMenu />
        ) : (
          isMounted && (
            <nav
              className={`flex flex-col w-60 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
                darkMode
                  ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
                  : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
              }`}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <ManagementMenu />
            </nav>
          )
        )}
        <div className="flex-1 ml-12 p-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Service Packages</h1>
          </div>
          <div className="mb-4 flex items-center space-x-2">
            <button
              onClick={handleAddClick}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-1"
            >
              <AddBoxIcon />
              <span>New Service</span>
            </button>
            <button
              onClick={handleAddCustomizeServiceClick}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-1"
            >
              <CategoryIcon />
              <span>New Service Category</span>
            </button>
            <button
              onClick={() => setShowCustomizeServices(!showCustomizeServices)}
              aria-label={
                showCustomizeServices
                  ? "Hide Customized Services"
                  : "Show Customized Services"
              }
              className="p-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              {showCustomizeServices ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : services.length === 0 ? (
            <p>No services found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="border rounded p-4 shadow hover:shadow-lg transition"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h2>
                    <div
                      className="mb-2 text-gray-900 dark:text-gray-300"
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          try {
                            // Try parsing JSON only if it looks like JSON (starts with '{' or '[')
                            if (
                              service.description &&
                              (service.description.trim().startsWith("{") ||
                                service.description.trim().startsWith("["))
                            ) {
                              const rawContent = JSON.parse(
                                service.description
                              );
                              if (
                                rawContent &&
                                rawContent.blocks &&
                                rawContent.entityMap !== undefined
                              ) {
                                const draftToHtml = require("draftjs-to-html");
                                return draftToHtml(rawContent);
                              }
                            }
                          } catch (e) {
                            console.error(
                              "Error parsing service description:",
                              e
                            );
                          }
                          return service.description || "";
                        })(),
                      }}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(service)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
                        aria-label="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(service._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center"
                        aria-label="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label
                  className="block mb-1 font-semibold"
                  htmlFor="clientTextEditor"
                >
                  Client Service Page Moto
                </label>
                <div
                  className={`border rounded p-2 min-h-[150px] ${
                    darkMode
                      ? "bg-gray-800 text-gray-100"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <Editor
                    editorState={clientTextEditorState}
                    toolbarClassName={
                      darkMode ? "toolbar-dark" : "toolbar-light"
                    }
                    wrapperClassName={
                      darkMode ? "wrapper-dark" : "wrapper-light"
                    }
                    editorClassName={darkMode ? "editor-dark" : "editor-light"}
                    onEditorStateChange={(newState) => {
                      try {
                        setClientTextEditorState(newState);
                      } catch (e) {
                        console.error("Invalid editor state:", e, newState);
                        setClientTextEditorState(EditorState.createEmpty());
                      }
                    }}
                    toolbar={
                      darkMode
                        ? {
                            options: [
                              "inline",
                              "blockType",
                              "list",
                              "textAlign",
                              "colorPicker",
                              "link",
                              "remove",
                              "history",
                            ],
                            inline: {
                              options: [
                                "bold",
                                "italic",
                                "underline",
                                "strikethrough",
                              ],
                            },
                            blockType: {
                              options: [
                                "Normal",
                                "H1",
                                "H2",
                                "H3",
                                "H4",
                                "H5",
                                "H6",
                                "Blockquote",
                                "Code",
                              ],
                            },
                            list: {
                              options: [
                                "unordered",
                                "ordered",
                                "indent",
                                "outdent",
                              ],
                            },
                            // Custom toolbar styles for dark mode
                            style: {
                              backgroundColor: "#1f2937",
                              color: "#f9fafb",
                            },
                          }
                        : {
                            options: [
                              "inline",
                              "blockType",
                              "list",
                              "textAlign",
                              "colorPicker",
                              "link",
                              "remove",
                              "history",
                            ],
                            inline: {
                              options: [
                                "bold",
                                "italic",
                                "underline",
                                "strikethrough",
                              ],
                            },
                            blockType: {
                              options: [
                                "Normal",
                                "H1",
                                "H2",
                                "H3",
                                "H4",
                                "H5",
                                "H6",
                                "Blockquote",
                                "Code",
                              ],
                            },
                            list: {
                              options: [
                                "unordered",
                                "ordered",
                                "indent",
                                "outdent",
                              ],
                            },
                            // Custom toolbar styles for light mode
                            style: {
                              backgroundColor: "#f3f4f6",
                              color: "#111827",
                            },
                          }
                    }
                  />
                </div>
                <button
                  onClick={saveClientTextContent}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Client Text
                </button>
              </div>
              {showCustomizeServices && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold">Customized Services</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded dark:border-gray-700">
                      <thead>
                        <tr className="bg-gray-300 dark:bg-gray-700">
                          <th className="border px-4 py-2 text-gray-900 dark:text-gray-300">
                            Category
                          </th>
                          <th className="border px-4 py-2 text-gray-900 dark:text-gray-300">
                            Event Type
                          </th>
                          <th className="border px-0 py-1 text-gray-900 dark:text-gray-300">
                            Description
                          </th>
                          <th className="border px-4 py-1 text-gray-900 dark:text-gray-300">
                            Rate Per Guest (BDT)
                          </th>
                          <th className="border px-4 py-2 text-gray-900 dark:text-gray-300">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {customizeServices.length === 0 ? (
                          <tr>
                            <td
                              colSpan="5"
                              className="text-center p-4 text-gray-900 dark:text-gray-300"
                            >
                              No customized services found.
                            </td>
                          </tr>
                        ) : null}
                        {customizeServices.length > 0 &&
                          customizeServices.map((cs) => (
                            <tr
                              key={cs._id}
                              className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <td className="border px-2 py-2 text-gray-900 dark:text-gray-300 truncate-cell">
                                {truncateString(cs.category)}
                              </td>
                              <td className="border px-2 py-2 text-gray-900 dark:text-gray-300 truncate-cell">
                                {truncateString(cs.eventType)}
                              </td>
                              <td className="border px-2 py-2 text-gray-900 dark:text-gray-300 truncate-cell">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: (() => {
                                      try {
                                        if (
                                          cs.categoryDescription &&
                                          (cs.categoryDescription
                                            .trim()
                                            .startsWith("{") ||
                                            cs.categoryDescription
                                              .trim()
                                              .startsWith("["))
                                        ) {
                                          const rawContent = JSON.parse(
                                            cs.categoryDescription
                                          );
                                          if (
                                            rawContent &&
                                            rawContent.blocks &&
                                            rawContent.entityMap !== undefined
                                          ) {
                                            return draftToHtml(rawContent);
                                          }
                                        }
                                      } catch (e) {
                                        console.error(
                                          "Error parsing categoryDescription:",
                                          e
                                        );
                                      }
                                      return cs.categoryDescription || "";
                                    })(),
                                  }}
                                />
                              </td>
                              <td className="border px-2 py-2 text-gray-900 dark:text-gray-300 truncate-cell">
                                {truncateString(String(cs.ratePerGuest))}
                              </td>
                              <td className="border px-2 py-2">
                                <button
                                  onClick={() =>
                                    handleCustomizeServiceClick(cs)
                                  }
                                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
                                  aria-label="Edit"
                                >
                                  <EditIcon />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
          <ServiceDialog
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onSave={handleSave}
            initialData={editData}
          />
          <CustomizeServiceDialog
            isOpen={customizeDialogOpen}
            onClose={() => setCustomizeDialogOpen(false)}
            onSave={handleCustomizeSave}
            service={customizeEditData}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;

<style jsx>{`
  /* Day/Night mode styles */
  :global(body) {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  :global(body) {
    background-color: white;
    color: black;
  }
  :global(.dark) body {
    background-color: #1f2937; /* Tailwind gray-800 */
    color: #d1d5db; /* Tailwind gray-300 */
  }
  /* Additional styles for the services page */
  .services-container {
    min-height: 100vh;
  }
  :global(.dark) .services-container {
    background-color: #111827; /* Tailwind gray-900 */
  }
  /* Add hover scale effect to sidebar buttons to match HamburgerMenu */
  nav button {
    transition-property: transform;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }
  nav button:hover {
    transform: scale(1.05);
  }
  /* Truncate table cell text to max 5 characters on small screens */
  @media (max-width: 640px) {
    .truncate-cell {
      max-width: 5ch;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      vertical-align: bottom;
    }
  }
`}</style>;
