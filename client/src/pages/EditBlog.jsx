import React, { useState, useEffect, useRef } from "react";
import axios from "@services/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Slide } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { ThemeProvider, useTheme } from "@contexts/ThemeContext";

const EditBlogContent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [blogData, setBlogData] = useState(null);
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`blogs/${id}`);
        // console.log("Fetched blog data:", response.data);
        setBlogData(response.data);
        reset({
          title: response.data.title,
          subtitle: response.data.subtitle,
        });
        setContent(response.data.content);
        setImagePreviewUrl(response.data.blogImageUrl.url);
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
        toast.error("Failed to fetch blog data. Please try again.", {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
          transition: Slide,
        });
      }
    };

    fetchBlog();
  }, [id, reset]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let imageBase64 = imageFile ? await convertBase64(imageFile) : imagePreviewUrl;

      const sanitizedContent = DOMPurify.sanitize(content);

      const updateData = {
        title: data.title,
        subtitle: data.subtitle,
        content: sanitizedContent,
        blogImageUrl: imageBase64,
      };

      // console.log("Sending update data:", updateData);

      const response = await axios.put(`blogs/${id}`, updateData);

      // console.log("Update response:", response.data);

      toast.success("Blog post updated successfully!", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
      navigate(`/user/blog/${id}`);
    } catch (error) {
      console.error("Update failed:", error);
      console.error("Error response:", error.response);
      let errorMessage = "Failed to update blog post. Please try again.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      toast.error(errorMessage, {
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

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  if (!blogData) return <div>Loading...</div>;

  return (
    <div className={`flex-1 ${isDarkMode ? 'bg-gradient-to-br from-[#2b4e7e] to-black' : 'bg-gray-100'} rounded-lg p-8`}>
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
            Edit Blog
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
                  placeholder="Blog Title"
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
                  placeholder="Blog Subtitle"
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
              <div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  Update Blog
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const EditBlog = () => {
  return (
    <ThemeProvider>
      <EditBlogContent />
    </ThemeProvider>
  );
};

export default EditBlog;
