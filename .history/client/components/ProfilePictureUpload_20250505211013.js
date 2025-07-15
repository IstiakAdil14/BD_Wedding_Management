import React, { useState } from "react";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 5MB

const ProfilePictureUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedUrl("");
    setError("");
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5MB limit.");
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch("/api/auth/upload-profile-picture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Upload failed");
      }
      const data = await res.json();
      setUploadedUrl(data.url);
    } catch (err) {
      setError(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Profile Picture</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || !selectedFile}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {uploadedUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={uploadedUrl} alt="Profile" style={{ maxWidth: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
