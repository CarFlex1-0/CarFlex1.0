import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "@services/axios"; // Assuming axios is set up already
import { useForm } from "react-hook-form"; // For form validation
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@contexts/auth_context";
import { CiEdit } from "react-icons/ci";
import { useTheme } from "@contexts/ThemeContext";
import { FiMail, FiPhone } from "react-icons/fi";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth(); // Now includes setUser

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
    <div className={`min-h-screen ${isDarkMode ? "text-white" : "text-gray-800"}`}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="container mx-auto py-8 px-4 max-w-6xl">
          <div className={`rounded-xl shadow-lg overflow-hidden ${
            isDarkMode ? "bg-gray-800/50" : "bg-white"
          } backdrop-blur-sm`}>
            {/* Profile Header */}
            <div className="p-8 pb-4">
              <div className="flex flex-col items-center">
                {/* Profile Image */}
                <div className="relative group mb-6">
                  <div className={`w-32 h-32 rounded-full overflow-hidden border-4 ${
                    isDarkMode ? "border-blue-500" : "border-indigo-500"
                  } shadow-xl`}>
                    <img
                      src={imagePreviewUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label 
                    htmlFor="dropzone-file" 
                    className={`absolute inset-0 flex items-center justify-center rounded-full cursor-pointer
                      bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300`}
                  >
                    <CiEdit className="w-12 h-12 text-white" />
                    <input
                      onChange={handleFileChange}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>

                {/* Basic Info */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    @{user?.username}
                  </p>
                </div>

                {/* Contact Info */}
                <div className={`flex gap-6 mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <div className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  {user?.phoneNum && (
                    <div className="flex items-center gap-2">
                      <FiPhone className="w-4 h-4" />
                      <span>{user.phoneNum}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                {user?.bio && (
                  <div className={`w-full p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                  } mb-6`}>
                    <p className="text-sm leading-relaxed">{user.bio}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Form */}
            <div className={`p-8 pt-4 ${
              isDarkMode ? "border-t border-gray-700" : "border-t border-gray-200"
            }`}>
              <h3 className="text-xl font-bold mb-6">Edit Profile</h3>
              <form onSubmit={handleSubmit(saveChanges)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("firstName")}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDarkMode
                          ? "bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                      } border focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register("lastName")}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDarkMode
                          ? "bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                      } border focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Bio
                  </label>
                  <textarea
                    {...register("bio")}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                    } border focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      {...register("username")}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDarkMode
                          ? "bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                      } border focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      maxLength="11"
                      {...register("phoneNum")}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDarkMode
                          ? "bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                      } border focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className={`w-full py-4 rounded-lg ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white font-medium transition-colors text-lg`}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
