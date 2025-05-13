import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const BUCKET_NAME = "user-files"; // <-- Replace with your bucket name!
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".dcm", ".pdf"];

function isAllowed(filename: string) {
  return ALLOWED_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext));
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError("");
      setUploadUrl("");
    }
  };

  const handleUpload = async () => {
    if (!file) return setError("No file selected.");
    if (!isAllowed(file.name)) return setError("Unsupported file type.");

    setLoading(true);
    const { data, error: uploadError } = await supabase
      .storage
      .from(BUCKET_NAME)
      .upload(`uploads/${Date.now()}_${file.name}`, file, { upsert: false });

    setLoading(false);

    if (uploadError) return setError(uploadError.message);

    // Get public URL (if bucket is public)
    const { data: urlData } = supabase
      .storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    setUploadUrl(urlData.publicUrl);
    setFile(null);
    fetchFiles();
  };

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .storage
      .from(BUCKET_NAME)
      .list("uploads");
    if (!error && data) setUploadedFiles(data);
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-white dark:bg-gray-800 shadow rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">Upload Scan or Document</h2>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.dcm,.pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded shadow disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {uploadUrl && (
        <div className="mb-4">
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline">
            View Uploaded File
          </a>
        </div>
      )}

      <h3 className="text-lg font-semibold mt-8 mb-2 text-gray-800 dark:text-gray-200">Uploaded Files</h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {uploadedFiles.length === 0 && (
          <li className="py-2 text-gray-500 dark:text-gray-400">No files uploaded yet.</li>
        )}
        {uploadedFiles.map(f => (
          <li key={f.name} className="py-2 flex items-center justify-between">
            <span>{f.name}</span>
            <a
              href={supabase.storage.from(BUCKET_NAME).getPublicUrl(`uploads/${f.name}`).data.publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-700 hover:underline text-sm"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
