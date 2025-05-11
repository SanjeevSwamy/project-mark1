import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, X, FilePlus, FileCheck } from 'lucide-react';

const API_URL = "http://localhost:8000/predict"; // Change if deployed

const ScanUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Fixed scan type
  const scanType = 'echocardiogram';

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('scan', file);
      formData.append('include_gradcam', 'true');

      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Prediction failed');
      }
      const result = await res.json();

      // Store result in localStorage or context (for demo, use localStorage)
      const scanId = Date.now().toString();
      localStorage.setItem(`scan_result_${scanId}`, JSON.stringify(result));

      // Redirect to ScanResults page with scanId
      navigate(`/results/${scanId}`);
    } catch (err) {
      alert('Prediction failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Upload Heart Scan</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload your echocardiogram scan for AI analysis and cardiac assessment
        </p>
      </header>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8 border border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Scan Type
            </label>
            <div className="py-3 px-4 rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
              Echocardiogram
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Upload Scan Image
            </label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors duration-150 ease-in-out ${
                dragging
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900'
                  : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!preview ? (
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-300">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              ) : (
                <div className="relative w-full">
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={clearFile}
                  >
                    <X size={16} className="text-gray-500 dark:text-gray-300" />
                  </button>
                  <div className="flex flex-col items-center">
                    <img
                      src={preview}
                      alt="Scan preview"
                      className="max-h-64 max-w-full object-contain rounded-md"
                    />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300 truncate">
                      {file?.name} ({(file?.size ? file.size / 1024 : 0).toFixed(2)} KB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {file && (
            <div className="mt-4 bg-cyan-50 dark:bg-cyan-900 rounded-md p-4 flex items-start">
              <div className="flex-shrink-0">
                <FileCheck className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-cyan-800 dark:text-cyan-200">
                  File ready for upload
                </h3>
                <div className="mt-1 text-sm text-cyan-700 dark:text-cyan-300">
                  <p>
                    Your echocardiogram scan image has been validated and is ready for analysis.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="mr-3 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="button"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FilePlus className="mr-2 h-4 w-4" />
                  Upload for Analysis
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* ...Guidelines, etc... */}
    </div>
  );
};

export default ScanUpload;
