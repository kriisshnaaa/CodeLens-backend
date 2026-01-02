import { useState } from "react";

export default function UploadBox({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a zip file");

    const formData = new FormData();
    formData.append("codebase", file);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("UPLOAD RESPONSE:", data);

      // 🔑 Backend returns ARRAY → pass directly
      onUploadSuccess(data);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Upload Codebase</h3>

      <input
        type="file"
        accept=".zip"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
