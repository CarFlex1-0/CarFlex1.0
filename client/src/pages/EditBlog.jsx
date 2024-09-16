import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditBlog = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate(); // For navigation after submission
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );
        setBlogData(response.data);
        reset({
          title: response.data.title,
          content: response.data.content,
        });
        setImagePreviewUrl(response.data.blogImageUrl.url);
        console.log(imagePreviewUrl);
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      }
    };

    fetchBlog();
  }, [id, reset]);

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

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let imageBase64;

      if (imageFile) {
        imageBase64 = await convertBase64(imageFile);
      } else {
        imageBase64 = ""; // Keep this if you want to clear image URL when no file is provided
      }

      const response = await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        {
          title: data.title,
          content: data.content,
          blogImageUrl: imageBase64,
        }
      );

      alert("Blog post updated successfully");
      navigate(`/blog/${id}`); // Redirect to the single blog page or any other page
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setImageFile(file);
      setImagePreviewUrl(base64); // Update preview URL
    }
  };

  // Handle drag and drop events
  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setImageFile(file);
      setImagePreviewUrl(base64); // Update preview URL
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
