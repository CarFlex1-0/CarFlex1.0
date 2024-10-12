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

const EditBlog = () => {
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
        console.log("Fetched blog data:", response.data);
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

      console.log("Sending update data:", updateData);

      const response = await axios.put(`blogs/${id}`, updateData);

      console.log("Update response:", response.data);

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
    <div className="flex justify-center flex-col m-8">
      <div>
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Edit Blog
        </h2>
      </div>

      <div>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="border border-gray-300 p-2 w-full hover:bg-white hover:text-black text-white"
                placeholder="Blog Title"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subtitle"
              >
                Subtitle (Optional, Max 50 characters)
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                {...register("subtitle", { maxLength: 50 })}
                className="border border-gray-300 p-2 w-full hover:bg-white hover:text-black text-white"
                placeholder="Blog Subtitle"
              />
            </div>
            <div
              className="flex items-center justify-center w-full mb-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
                <input
                  onChange={handleFileChange}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <div>
              {imagePreviewUrl && !loading && (
                <div>
                  Preview:{" "}
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="max-w-xs mx-auto"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
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
                    ['bold', 'italic'],
                    ['blockquote'],
                  ],
                }}
                className="bg-white text-black"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditBlog;
