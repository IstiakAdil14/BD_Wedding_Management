import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const PortfolioEventDialog = ({ isOpen, onClose, onSave, event }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([""]);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEditorState, setDescriptionEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();

    if (event) {
      setTitle(event.title || "");
      setCategory(event.category || "");
      setImages(event.images && event.images.length > 0 ? event.images : [""]);
      if (event.video) {
        // If video is a URL string, set as is, else prepend base URL if relative path
        if (
          typeof event.video === "string" &&
          !event.video.startsWith("http")
        ) {
          const baseUrl = window.location.origin;
          setVideo(baseUrl + event.video);
        } else {
          setVideo(event.video);
        }
      } else {
        setVideo("");
      }
      if (event.description) {
        try {
          let contentState;
          if (typeof event.description === "string") {
            contentState = convertFromRaw(JSON.parse(event.description));
          } else {
            contentState = convertFromRaw(event.description);
          }
          setDescriptionEditorState(
            EditorState.createWithContent(contentState)
          );
          setDescription(
            typeof event.description === "string"
              ? event.description
              : JSON.stringify(event.description)
          );
        } catch {
          setDescriptionEditorState(EditorState.createEmpty());
          setDescription("");
        }
      } else {
        setDescriptionEditorState(EditorState.createEmpty());
        setDescription("");
      }
    } else {
      setTitle("");
      setCategory("");
      setImages([""]);
      setVideo("");
      setDescriptionEditorState(EditorState.createEmpty());
      setDescription("");
    }
  }, [event]);

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };

  const removeImageField = (index) => {
    if (images.length === 1) return; // At least one image field
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleDescriptionEditorChange = (editorState) => {
    setDescriptionEditorState(editorState);
    const rawContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    setDescription(rawContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let videoUrl = "";
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
          const baseUrl = "http://localhost:5000";
          videoUrl = baseUrl + uploadData.videoUrl;
        } else {
          alert("Failed to upload video.");
          return;
        }
      } catch (error) {
        alert("Error uploading video.");
        console.error("Error uploading video", error);
        return;
      }
    } else if (typeof video === "string") {
      videoUrl = video;
    }

    onSave({
      ...event,
      title,
      category,
      images: images.filter((img) => img.trim() !== ""),
      video: videoUrl,
      description,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <CloseIcon />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {event ? "Edit Event" : "New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
              Images URLs
            </label>
            {images.map((img, index) => (
              <div key={index} className="flex items-center mb-2 space-x-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-grow px-3 py-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required={index === 0}
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={images.length === 1}
                  aria-label="Remove image URL"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Image
            </button>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
              Description
            </label>
            <div
              className="border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2"
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
                readOnly={false}
                spellCheck={true}
                placeholder="Enter description"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioEventDialog;
