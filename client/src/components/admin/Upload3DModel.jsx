import React, { useState } from "react";
import { FaLink, FaUpload, FaFile, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "@contexts/auth_context";
export default function Upload3DModel() {
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { drawerState } = useAuth();
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".jsx")) {
      setFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".jsx")) {
      setFile(selectedFile);
    }
  };

  return (
     <div className={drawerState ? "blur bg-blue-950" : ""}>
    <div className="min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 rounded-lg shadow-xl p-6 w-full max-w-md space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="link"
            className="block text-sm font-medium text-white"
          >
            Enter Link
          </label>
          <div className="relative">
            <input
              id="link"
              type="url"
              placeholder="https://example.com"
              value={link}
              onChange={handleLinkChange}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <FaLink
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ease-in-out space-y-2 ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
        >
          {file ? (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <FaCheckCircle size={24} />
              <span className="font-medium">{file.name} uploaded</span>
            </div>
          ) : (
            <>
              <FaUpload size={48} className="mx-auto text-gray-400" />
              <p className="text-sm text-gray-200">
                Drag and drop your .jsx file here, or click to select
              </p>
              <input
                type="file"
                accept=".jsx"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <button
                onClick={() => document.getElementById("file-upload").click()}
                className="mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaFile className="inline mr-2" size={18} />
                Select .jsx file
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
