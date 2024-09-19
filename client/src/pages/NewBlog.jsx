import React, { useState } from "react";
import axios from "@services/axios";
import { useForm } from "react-hook-form";
import { Bounce, Slide, Zoom } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

export default function NewBlog() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // Define a default image URL
  const defaultImageUrl =
    "https://res.cloudinary.com/dortbtymj/image/upload/v1726523224/default_img_blog_bineg4.webp";

  // Convert file to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let imageBase64;

      // Use default image if no file is provided
      if (!imageFile) {
        imageBase64 = defaultImageUrl;
      } else {
        imageBase64 = await convertBase64(imageFile);
      }

      // Send form data along with the image
      const response = await axios.post("/blogs", {
        title: data.title,
        content: data.content,
        blogImageUrl: imageBase64, // Sending image as Base64
      });

      // Assuming response contains the image URL
      const imageUrl = response.data.newBlog.blogImageUrl;

      setImagePreviewUrl(imageUrl); // Optionally update preview URL
      toast.success("Blog Created successfully!", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });

      // Reset the form and state
      reset();
      setImageFile(null);
      setImagePreviewUrl("");
    } catch (error) {
      console.error("Submit failed:", error);
      console.log(error);
      toast.error("Blog creation unsuccessful!", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
      if (error.code === "ECONNRESET") {
        console.error("Connection was reset:", error.message);
      } else {
        console.error("An error occurred:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setImageFile(file);
      setImagePreviewUrl(base64); // Set a preview URL if needed
    }
  };

  // Handle drag events
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Add visual feedback for drag over (optional)
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setImageFile(file);
      setImagePreviewUrl(base64); // Set a preview URL if needed
    }
  };

  // Handle file input click
  const handleFileInputClick = () => {
    document.getElementById("dropzone-file").click();
  };

  return (
    <>
      <div className="flex justify-center flex-col m-8">
        <div>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Upload Blog
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
                  htmlFor="content"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  {...register("content", { required: "Content is required" })}
                  className="border border-gray-300 p-2 w-full hover:bg-white hover:text-black text-white"
                  placeholder="Blog Content"
                />
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleFileInputClick}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
              <div className="mt-4">
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
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
