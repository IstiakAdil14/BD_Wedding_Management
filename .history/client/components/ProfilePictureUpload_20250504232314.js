import React, { useState } from "react";

const ProfilePictureUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadedUrl("");
    setError("");
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
      const res = await fetch("/api/auth/upload-profile-picture", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Upload failed");
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
      <button onClick={handleUpload} disabled={uploading}>
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
