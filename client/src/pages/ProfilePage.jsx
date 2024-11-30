import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "@services/axios"; // Assuming axios is set up already
import { useForm } from "react-hook-form"; // For form validation
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/auth_context";
import { CiEdit } from "react-icons/ci";
import { useTheme } from "../contexts/ThemeContext";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth(); // Now includes setUser

  const [activeTab, setActiveTab] = useState("overview");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Set form field values
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    user?.imageUrl?.url ||
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" // Default image
  );
  console.log("USer on Mount", user);

  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("phoneNum", user.phoneNum);
      setValue("bio", user.bio);
      setValue("username", user.username);
      setImagePreviewUrl(
        user?.imageUrl?.url ||
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      );
      setLoading(false); // Stop loading once user is set
    }
  }, [user, setValue]);

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

  const saveChanges = async (data) => {
    try {
      setLoading(true);
      let imageBase64 = user.imageUrl?.url || "";

      if (imageFile) {
        imageBase64 = await convertBase64(imageFile);
        console.log("Image converted to Base64:", imageBase64);
      }

      // Prepare the payload with updated data
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        phoneNum: data.phoneNum, // Include phoneNum if you want to update it
        imageUrl: imageBase64 || user.imageUrl.url,
        username: data.username, // Include username if you want to update it
        email: data.email,
      };

      // Log user details
      console.log("User from useAuth:", user);
      const userId = user?._id;

      if (!userId) {
        console.error("User ID is not available.");
        toast.error("User ID is missing!", {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
          transition: Slide,
        });

        return;
      }

      console.log("Sending PUT request to /profile/update", userId);
      const response = await axiosInstance.put(
        `user/profile/${userId}`,
        payload
      );
      console.log("Response from server:", response.data);

      // Update user context
      const updatedUser = { ...user, ...response.data }; // Merge the old user with the new data
      await setUser(updatedUser); // Update the context with new user data

      console.log("New User data", updatedUser);

      // Clear image file state after saving
      // setImageFile(null);
      // Update preview after save
      setImagePreviewUrl(updatedUser.imageUrl?.url);

      toast.success("Profile updated successfully", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
      toast.error("Update Profile unsuccessful!", {
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
      console.log("Image preview is", base64);
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

  return (
    <div
      className={`${
        isDarkMode ? "bg-gradient-to-br from-[#2b4e7e] to-black" : "bg-gray-100"
      }`}
    >
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 rounded-full ${
          isDarkMode
            ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            : "bg-gray-800 text-white hover:bg-gray-700"
        } transition-colors duration-200 z-50`}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="min-h-screen w-full flex flex-col items-center p-6">
          <div
            className={`w-full max-w-4xl ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white"
            } shadow-lg rounded-lg p-6 mb-4`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex-0 space-x-4 border-2 ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 hover:bg-gray-600"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                } border-dashed rounded-full cursor-pointer`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-full"
                >
                  <div className="relative flex flex-col items-center justify-center p-1">
                    {imagePreviewUrl && !loading && (
                      <div className="group relative">
                        <img
                          src={imagePreviewUrl}
                          alt="Preview"
                          className="w-20 h-20 rounded-full border-4 border-blue-500 cursor-pointer"
                        />
                        <CiEdit className="absolute top-0 text-white bg-blue-500 opacity-0 group-hover:opacity-80 transition-opacity duration-300 w-20 h-20 rounded-full" />
                      </div>
                    )}
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

              <div className="flex-1 px-3">
                <h1
                  className={`text-2xl font-bold ${
                    isDarkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-700 hover:text-indigo-700"
                  }`}
                >
                  Name: {user?.firstName} {user?.lastName}
                </h1>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  @{user?.username}
                </p>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Email: {user?.email}
                </p>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Bio: {user?.bio}
                </p>
              </div>

              <button
                onClick={handleSubmit(saveChanges)}
                className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div
            className={`w-full max-w-4xl ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white"
            } shadow-lg rounded-lg p-6`}
          >
            <div
              className={`flex border-b border-gray-200 mb-4 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {["overview", "personal", "account"].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 ${
                    activeTab === tab
                      ? isDarkMode
                        ? "border-b-4 border-blue-400 text-blue-400"
                        : "border-b-4 border-blue-600 text-blue-600"
                      : isDarkMode
                      ? "text-gray-200"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-xl font-bold text-blue-600">
                    Profile Overview
                  </h2>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    } mt-2`}
                  >
                    View your recent activities, ratings, and other statistics.
                  </p>
                </div>
              )}

              {activeTab === "personal" && (
                <div>
                  <h2 className="text-xl font-bold text-blue-600">
                    Personal Information
                  </h2>
                  <form
                    onSubmit={handleSubmit(saveChanges)}
                    className="mt-4 space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          Bio
                        </label>
                        <input
                          type="text"
                          {...register("bio", { required: false })}
                          className={`input mt-1 block w-full rounded-md shadow-sm ${
                            isDarkMode
                              ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400 focus:border-blue-400"
                              : "bg-gray-100 text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                        />
                        {errors.bio && (
                          <p className="text-red-500 text-sm">
                            Bio is required.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          {...register("firstName", { required: false })}
                          className={`input mt-1 block w-full rounded-md shadow-sm ${
                            isDarkMode
                              ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400 focus:border-blue-400"
                              : "bg-gray-100 text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm">
                            First name is required.
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          {...register("lastName", { required: false })}
                          className={`input mt-1 block w-full rounded-md shadow-sm ${
                            isDarkMode
                              ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400 focus:border-blue-400"
                              : "bg-gray-100 text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm">
                            Last name is required.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          maxLength="11"
                          // pattern=" ^\d{11}"
                          {...register("phoneNum", { required: false })}
                          className={`input mt-1 block w-full rounded-md shadow-sm ${
                            isDarkMode
                              ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400 focus:border-blue-400"
                              : "bg-gray-100 text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                        />
                        {errors.phoneNum && (
                          <p className="text-red-500 text-sm">
                            11 digit Phone # is required.
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          {...register("username", { required: false })}
                          className={`input mt-1 block w-full rounded-md shadow-sm ${
                            isDarkMode
                              ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400 focus:border-blue-400"
                              : "bg-gray-100 text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                        />
                        {errors.username && (
                          <p className="text-red-500 text-sm">
                            Username is required.
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      className={`mt-4 py-2 px-4 rounded-lg ${
                        isDarkMode
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white`}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "account" && (
                <div>
                  <h2 className="text-xl font-bold text-blue-600">
                    Account Settings
                  </h2>
                  <form onSubmit={handleSubmit(saveChanges)} className="mt-4">
                    <div className="mb-4">
                      <label
                        className={`block text-sm font-medium ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email", { required: false })}
                        className={`input mt-1 block w-full rounded-md shadow-sm ${
                          isDarkMode
                            ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400 focus:border-blue-400"
                            : "bg-gray-100 text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          Email is required.
                        </p>
                      )}
                    </div>
                    <button
                      className={`mt-4 py-2 px-4 rounded-lg ${
                        isDarkMode
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white`}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
