import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import React, { useState, useEffect } from "react";

const PortfolioCategoryDialog = ({ isOpen, onClose, onSave, category }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEditorState, setDescriptionEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [video, setVideo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      if (category.description) {
        try {
          let contentState;
          if (typeof category.description === "string") {
            contentState = convertFromRaw(JSON.parse(category.description));
          } else {
            contentState = convertFromRaw(category.description);
          }
          setDescriptionEditorState(
            EditorState.createWithContent(contentState)
          );
          setDescription(
            typeof category.description === "string"
              ? category.description
              : JSON.stringify(category.description)
          );
        } catch {
          setDescriptionEditorState(EditorState.createEmpty());
          setDescription("");
        }
      } else {
        setDescriptionEditorState(EditorState.createEmpty());
        setDescription("");
      }
      if (category.video) {
        if (typeof category.video === "string" && !category.video.startsWith("http")) {
          const baseUrl = window.location.origin;
          setVideo(baseUrl + category.video);
        } else {
          setVideo(category.video);
        }
      } else {
        setVideo(null);
      }
    } else {
      setName("");
      setDescriptionEditorState(EditorState.createEmpty());
      setDescription("");
      setVideo(null);
    }
    setError(null);
  }, [category]);

  const handleDescriptionEditorChange = (editorState) => {
    setDescriptionEditorState(editorState);
    const rawContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    setDescription(rawContent);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
    } else {
      setVideo(null);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !description.trim()) {
      setError("Name and description are required.");
      return;
    }
    setSaving(true);
    setError(null);
    let videoUrl = null;
    if (video && typeof video === "object") {
      // Upload video file first
      const formData = new FormData();
      formData.append("video", video);
      try {
        const uploadRes = await fetch("http://localhost:5000/api/uploadVideo", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          // Save only the relative path to the video, not full URL
          videoUrl = uploadData.videoUrl;
        } else {
          setError("Failed to upload video.");
          setSaving(false);
          return;
        }
      } catch (err) {
        setError("Error uploading video.");
        setSaving(false);
        return;
      }
    } else if (typeof video === "string") {
      videoUrl = video;
    }

    try {
      const method = category ? "PUT" : "POST";
      const url = category
        ? `/api/categories/${category._id}`
        : "/api/categories";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description, video: videoUrl }),
      });
      if (res.ok) {
        const savedCategory = await res.json();
        onSave(savedCategory);
        setName("");
        setDescription("");
        setDescriptionEditorState(EditorState.createEmpty());
        setVideo(null);
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save category.");
      }
    } catch (err) {
      setError("Failed to save category.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {category ? "Edit Portfolio Category" : "Add New Portfolio Category"}
        </h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Name *
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Description *
          </label>
          <div
            className="border rounded dark:bg-gray-700 dark:text-gray-100 p-2"
            style={{ minHeight: 80 }}
          >
            <Editor
              editorState={descriptionEditorState}
              onEditorStateChange={handleDescriptionEditorChange}
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
              readOnly={saving}
              spellCheck={true}
              placeholder="Enter description"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Video
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
            disabled={saving}
          />
          {video && typeof video === "object" && (
            <video
              src={URL.createObjectURL(video)}
              controls
              className="mt-2 max-h-40 w-full rounded"
            />
          )}
          {video && typeof video === "string" && (
            <video
              src={video}
              controls
              className="mt-2 max-h-40 w-full rounded"
            />
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
            onClick={() => {
              setName("");
              setDescription("");
              setDescriptionEditorState(EditorState.createEmpty());
              setVideo(null);
              setError(null);
              onClose();
            }}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCategoryDialog;
