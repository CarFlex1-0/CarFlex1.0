import React, { useState, useRef } from "react";
import axiosInstance from "@services/axios"; // Assuming axios is set up already
import { useForm } from "react-hook-form"; // For form validation
import { Bounce, Slide, Zoom } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useAuth} from "../contexts/auth_context"

const ProfilePage = () => {
  const {user} = useAuth();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("overview");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "https://via.placeholder.com/150"
  ); // Default image

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
      let imageBase64;

      if (imageFile) {
        imageBase64 = await convertBase64(imageFile);
        console.log("Image converted to Base64:", imageBase64);
      } else {
        console.log("No image file selected.");
      }

      // Prepare the payload with only necessary data
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        location: data.location,
        email: data.email,
        profileImage: imageBase64,
      };

      // Log user details
      console.log("User from cookies:", user);
      const parsedUser = user ? JSON.parse(user) : null;
      const userId = parsedUser ? parsedUser._id : null;

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

      toast.success("Profile updated successfully", {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });

      // Clear image file state after saving
      setImageFile(null);
      setImagePreviewUrl(imageBase64 || "https://via.placeholder.com/150");
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
      console.log("new user", user);
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-500 to-purple-700 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden" // Hide the input
              ref={fileInputRef} // Create a ref for the input
            />
            <img
              src={imagePreviewUrl} // Updated to use preview URL
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-blue-500 cursor-pointer" // Add cursor pointer
              onClick={() => fileInputRef.current.click()} // Trigger file input on click
            />

            <div>
              <h1 className="text-2xl font-bold text-blue-700">John Doe</h1>
              <p className="text-gray-500">Full Stack Developer</p>
            </div>
          </div>
          <button
            onClick={saveChanges}
            className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex border-b border-gray-200 mb-4">
          {["overview", "personal", "account"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${
                activeTab === tab
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : ""
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
              <p className="text-gray-500 mt-2">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("firstName", { required: false })}
                      className="input mt-1 bg-gray-300 text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        First name is required.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register("lastName", { required: false })}
                      className="input mt-1 bg-gray-300 text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        Last name is required.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      {...register("phone", { required: false })}
                      className="input mt-1 bg-gray-300 text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        Phone number is required.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      {...register("location", { required: false })}
                      className="input mt-1 bg-gray-300 text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm">
                        Location is required.
                      </p>
                    )}
                  </div>
                </div>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
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
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: false })}
                    className="input mt-1 bg-gray-300 text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">Email is required.</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium  text-gray-700">
                    Change Password
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: false })}
                    className="input mt-1 bg-gray-300 text-black block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      Password is required.
                    </p>
                  )}
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
