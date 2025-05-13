 import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const BUCKET_NAME = "user-files";
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
const [userId, setUserId] = useState<string | null>(null);

useEffect(() => {
const getUser = async () => {
const { data: { user } } = await supabase.auth.getUser();
setUserId(user?.id || null);
};
getUser();
fetchFiles();
}, []);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
if (e.target.files?.[0]) {
setFile(e.target.files[0]);
setError("");
setUploadUrl("");
}
};

const handleUpload = async () => {
if (!file || !userId) {
setError("Please select a file and ensure you're logged in");
return;
}

if (!isAllowed(file.name)) {
setError("Unsupported file type");
return;
}

setLoading(true);
try {
const filePath = `uploads/${userId}/${Date.now()}_${file.name}`;

const { data, error: uploadError } = await supabase.storage
.from(BUCKET_NAME)
.upload(filePath, file);

if (uploadError) throw uploadError;

const { data: urlData } = supabase.storage
.from(BUCKET_NAME)
.getPublicUrl(data.path);

setUploadUrl(urlData.publicUrl);
fetchFiles();
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
};

const fetchFiles = async () => {
if (!userId) return;

try {
const { data, error } = await supabase.storage
.from(BUCKET_NAME)
.list(`uploads/${userId}`);

if (!error) setUploadedFiles(data || []);
} catch (err) {
setError("Failed to fetch files");
}
};

return (
<div className="max-w-xl mx-auto my-10 bg-white dark:bg-gray-800 shadow rounded-lg p-8">
<h2 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">
Upload Scan or Document
</h2>

<div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
<input
type="file"
accept={ALLOWED_EXTENSIONS.join(",")}
onChange={handleFileChange}
className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
/>
<button
onClick={handleUpload}
disabled={loading || !userId}
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

<h3 className="text-lg font-semibold mt-8 mb-2 text-gray-800 dark:text-gray-200">
Your Uploaded Files
</h3>

<ul className="divide-y divide-gray-200 dark:divide-gray-700">
{uploadedFiles.length === 0 ? (
<li className="py-2 text-gray-500 dark:text-gray-400">
No files uploaded yet
</li>
) : (
uploadedFiles.map(f => (
<li key={f.name} className="py-2 flex items-center justify-between">
<span>{f.name}</span>
<a
href={supabase.storage
.from(BUCKET_NAME)
.getPublicUrl(`uploads/${userId}/${f.name}`).data.publicUrl}
target="_blank"
rel="noopener noreferrer"
className="text-cyan-700 hover:underline text-sm"
>
View
</a>
</li>
))
)}
</ul>
</div>
);
};
