import React, { useState, useRef, useEffect } from "react";
import axios from "@services/axios";
import { useForm } from "react-hook-form";
import { Slide } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useAuth } from "@contexts/auth_context";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NewBlog() {
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

  const checkPlagiarism = async (title, subtitle, content) => {
    try {
      if (title !== "" && content !== "") {
        setLoading(true);
        const textContent = content.replace(/<[^>]+>/g, '');
        const response = await axios.post("/blogs/plagiarism", {
          title,
          subtitle,
          content: textContent,
        });
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
      } else {
        toast.error("A title and Content is required", {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error) {
      console.error("Error checking plagiarism:", error);
      toast.error("Failed to check plagiarism.", {
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

  const handleFileInputClick = () => {
    document.getElementById("dropzone-file").click();
  };

  return (
    <div className={drawerState ? "blur bg-blue-950" : ""}>
      <div className="flex justify-center flex-col m-8">
        <div>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Create New Article
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
                  placeholder="Article Title"
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
                  placeholder="Article Subtitle"
                />
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleFileInputClick}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mb-4"
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
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  onChange={handleFileChange}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <div className="mt-4 mb-4">
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
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={!isSubmitEnabled}
                  className={`px-4 py-2 mt-4 rounded ${
                    isSubmitEnabled ? "bg-blue-500" : "bg-gray-300"
                  } text-white`}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    checkPlagiarism(
                      watch("title"),
                      watch("subtitle"),
                      content
                    )
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4"
                >
                  Check Plagiarism
                </button>
              </div>
              {plagPercentage !== null && (
                <div
                  className={`mt-2 text-xl ${
                    plagPercentage < 30 ? "text-green-500" : "text-red-500"
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
}