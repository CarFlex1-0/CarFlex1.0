import React, { useState, useRef } from "react";
import axios from "@services/axios";
import { useForm } from "react-hook-form";
import { Slide } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useAuth } from "@contexts/auth_context";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ThemeProvider, useTheme } from "@contexts/ThemeContext";

const NewBlogContent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [plagPercentage, setPlagPercentage] = useState(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const { drawerState } = useAuth();
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  const defaultImageUrl =
    "https://res.cloudinary.com/dortbtymj/image/upload/v1726523224/default_img_blog_bineg4.webp";

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const checkPlagiarism = async () => {
    const title = watch("title");
    const textContent = quillRef.current.getEditor().getText();

    if (!title || !textContent) {
      toast.error("Title and content are required for plagiarism check", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    try {
      setLoading(true);
      // console.log("Sending plagiarism check request:", { title, content: textContent });

      const response = await axios.post("/blogs/plagiarism", {
        title,
        content: textContent,
      });

      // console.log("Plagiarism check response:", response.data);

      setLoading(false);
      const percentage = response.data.plagPercentage;
      setPlagPercentage(percentage);
      setIsSubmitEnabled(percentage < 30);

      if (percentage > 30) {
        toast.info(
          `Please note that Plagiarism Percentage: ${percentage}% is over Allowed Value`,
          {
            position: "top-left",
            autoClose: 5000,
            theme: "dark",
            transition: Slide,
          }
        );
      } else {
        toast.info(`Plagiarism Percentage: ${percentage}% within range`, {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error) {
      console.error("Error checking plagiarism:", error);
      console.error("Error response:", error.response);
      setLoading(false);
      toast.error("Failed to check plagiarism. Please try again.", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageBase64 = imageFile
        ? await convertBase64(imageFile)
        : defaultImageUrl;

      const user = JSON.parse(Cookies.get("user"));
      const response = await axios.post("/blogs", {
        title: data.title,
        subtitle: data.subtitle,
        content: content,
        blogImageUrl: imageBase64,
        author: user._id,
        plagPercentage: plagPercentage,
      });

      const imageUrl = response.data.newBlog.blogImageUrl;
      setImagePreviewUrl(imageUrl);
      toast.success("Blog Created successfully!", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });

      reset();
      setImageFile(null);
      setImagePreviewUrl("");
      setPlagPercentage(null);
      setIsSubmitEnabled(false);
      setContent('');
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error("Blog creation unsuccessful!", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setImageFile(file);
      setImagePreviewUrl(base64);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setImageFile(file);
      setImagePreviewUrl(base64);
    }
  };

  return (
    <div className={`flex-1 ${isDarkMode ? 'bg-gradient-to-br from-blue-950 to-indigo-950' : 'bg-gray-100'} rounded-lg p-8`}>
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 rounded-full ${
          isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
        }`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <div className={`max-w-3xl mx-auto ${isDarkMode ? 'bg-white bg-opacity-10' : 'bg-white'} backdrop-filter backdrop-blur-lg rounded-xl shadow-xl overflow-hidden`}>
        <div className="p-8">
          <h2 className={`text-4xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Create New Article
          </h2>

          {loading ? (
            <div className="flex justify-center items-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className={`w-full px-3 py-2 ${isDarkMode ? 'bg-white bg-opacity-20 text-white' : 'bg-gray-50 text-gray-900'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Article Title"
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                  htmlFor="subtitle"
                >
                  Subtitle (Optional, Max 50 characters)
                </label>
                <input
                  id="subtitle"
                  name="subtitle"
                  type="text"
                  {...register("subtitle", { maxLength: 50 })}
                  className={`w-full px-3 py-2 ${isDarkMode ? 'bg-white bg-opacity-20 text-white' : 'bg-gray-50 text-gray-900'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Article Subtitle"
                />
              </div>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                  isDarkMode ? 'border-gray-300 hover:border-indigo-500' : 'border-gray-400 hover:border-indigo-600'
                } transition-colors duration-300`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  onChange={handleFileChange}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
                <label htmlFor="dropzone-file" className="cursor-pointer">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-300">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </label>
              </div>
              {imagePreviewUrl && (
                <div className="mt-4">
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                  htmlFor="content"
                >
                  Content
                </label>
                <ReactQuill
                  ref={quillRef}
                  value={content}
                  onChange={setContent}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline', 'strike'],
                      ['blockquote', 'code-block'],
                      [{ 'header': 1 }, { 'header': 2 }],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'script': 'sub'}, { 'script': 'super' }],
                      [{ 'indent': '-1'}, { 'indent': '+1' }],
                      [{ 'direction': 'rtl' }],
                      [{ 'size': ['small', false, 'large', 'huge'] }],
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'font': [] }],
                      [{ 'align': [] }],
                      ['clean']
                    ],
                  }}
                  className={`${isDarkMode ? 'bg-white bg-opacity-20 text-white' : 'bg-white text-gray-900'} rounded-md`}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={!isSubmitEnabled}
                  className={`px-4 py-2 rounded ${
                    isSubmitEnabled
                      ? isDarkMode
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-300 cursor-not-allowed"
                  } text-white`}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={checkPlagiarism}
                  className={`px-4 py-2 rounded ${
                    isDarkMode
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                >
                  Check Plagiarism
                </button>
              </div>
              {plagPercentage !== null && (
                <div
                  className={`mt-2 text-xl ${
                    plagPercentage < 30 
                      ? isDarkMode ? "text-green-400" : "text-green-600"
                      : isDarkMode ? "text-red-400" : "text-red-600"
                  }`}
                >
                  Plagiarism Percentage: {plagPercentage}%
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default function NewBlog() {
  return (
    <ThemeProvider>
      <NewBlogContent />
    </ThemeProvider>
  );
}