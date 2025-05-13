import { useState } from "react";
import { supabase } from "../supabaseClient"; // see below

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".dcm", ".pdf"];

function isAllowed(filename) {
  return ALLOWED_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext));
}

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [error, setError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
      .from("your-bucket-name") // replace with your bucket name!
      .upload(`uploads/${Date.now()}_${file.name}`, file, { upsert: false });

    if (uploadError) return setError(uploadError.message);

    // Get public URL (if bucket is public)
    const { data: urlData } = supabase
      .storage
      .from("your-bucket-name")
      .getPublicUrl(data.path);

    setUploadUrl(urlData.publicUrl);
    fetchFiles(); // Refresh file list
  };

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .storage
      .from("your-bucket-name")
      .list("uploads");
    if (!error) setUploadedFiles(data);
  };

  // Fetch files on mount
  useState(() => { fetchFiles(); }, []);

  return (
    <div>
      <h2>Upload Your Scan or Document</h2>
      <input type="file" accept=".jpg,.jpeg,.png,.dcm,.pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{color:"red"}}>{error}</p>}
      {uploadUrl && <a href={uploadUrl} target="_blank" rel="noopener noreferrer">View Uploaded File</a>}

      <h3>Uploaded Files</h3>
      <ul>
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
