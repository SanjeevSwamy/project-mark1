import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Make sure this points to your Supabase client setup!

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".dcm", ".pdf"];

function isAllowed(filename) {
  return ALLOWED_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext));
}

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [error, setError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch all uploaded files on mount
  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setUploadUrl("");
  };

  const handleUpload = async () => {
    if (!file) return setError("No file selected.");
    if (!isAllowed(file.name)) return setError("Unsupported file type.");

    const { data, error: uploadError } = await supabase
      .storage
      .from("your-bucket-name") // <-- replace with your actual bucket name!
      .upload(`uploads/${Date.now()}_${file.name}`, file, { upsert: false });

    if (uploadError) return setError(uploadError.message);

    // Get public URL (if bucket is public)
    const { data: urlData } = supabase
      .storage
      .from("your-bucket-name")
      .getPublicUrl(data.path);

    setUploadUrl(urlData.publicUrl);
    fetchFiles();
  };

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .storage
      .from("your-bucket-name")
      .list("uploads");
    if (!error && data) setUploadedFiles(data);
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Your Scan or Document</h2>
      <input type="file" accept=".jpg,.jpeg,.png,.dcm,.pdf" onChange={handleFileChange} />
      <button
        className="ml-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        onClick={handleUpload}
      >
        Upload
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {uploadUrl && (
        <div className="mt-2">
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline">
            View Uploaded File
          </a>
        </div>
      )}

      <h3 className="mt-6 font-semibold">Your Uploaded Files</h3>
      <ul className="mt-2">
        {uploadedFiles.map(f => (
          <li key={f.name}>
            {f.name}
            {/* Optionally, add a download/view link if public */}
          </li>
        ))}
      </ul>
    </div>
  );
}

