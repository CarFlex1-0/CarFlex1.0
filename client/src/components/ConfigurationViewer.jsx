import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@contexts/ThemeContext";
import { useAuth } from "@contexts/auth_context";
import { toast } from "react-toastify";
import axios from "@services/axios";
import Cookies from "js-cookie";
import BackgroundIcons from "@components/BackgroundIcons";

const ConfigurationViewer = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchConfiguration();
  }, [id]);

  const fetchConfiguration = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`/car-configs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConfig(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch configuration");
      navigate("/user/models");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      const token = Cookies.get("token");
      await axios.post(
        "/car-configs/share",
        {
          configId: id,
          userEmail: shareEmail,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Configuration shared successfully");
      setShowShareModal(false);
      setShareEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to share configuration"
      );
    }
  };

  const handleEdit = () => {
    // Determine which model to edit based on configuration
    const modelType = config.customization.modelType; // You'll need to add this to your schema
    if (modelType === "civic") {
      navigate(`/user/customize-3d-model`, { state: { config } });
    } else if (modelType === "corolla") {
      navigate(`/user/customize-3d-model-corolla`, { state: { config } });
    }
  };

  const handleDelete = async () => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`/car-configs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Configuration deleted successfully");
      navigate("/user/models");
    } catch (error) {
      toast.error("Failed to delete configuration");
    }
  };

  const getModelName = (modelType) => {
    switch (modelType) {
      case "civic":
        return "Honda Civic";
      case "corolla":
        return "Toyota Corolla";
      case "swift":
        return "Suzuki Swift";
      default:
        return "Unknown Model";
    }
  };

  const searchUsers = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const token = Cookies.get('token');
      const response = await axios.get(`/user/search?email=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Failed to search users');
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchUsers(shareEmail);
    }, 300);

    return () => clearTimeout(timer);
  }, [shareEmail]);

  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        } flex items-center justify-center`}
      >
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <BackgroundIcons />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{config.name}</h1>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {getModelName(config.customization.modelType)}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowShareModal(true)}
              className="btn btn-primary gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Share
            </button>
            <button onClick={handleEdit} className="btn btn-secondary gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </button>
            {config.creator._id === user._id && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-error gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Performance Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Acceleration Card */}
          <div
            className={`card ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-xl`}
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="card-title">Acceleration</h3>
                  <p className="text-3xl font-bold">
                    {config.performanceMetrics.metrics.acceleration}s
                  </p>
                  <p className="text-sm opacity-70">0-60 mph</p>
                </div>
              </div>
            </div>
          </div>

          {/* Max Speed Card */}
          <div
            className={`card ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-xl`}
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-secondary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="card-title">Max Speed</h3>
                  <p className="text-3xl font-bold">
                    {config.performanceMetrics.metrics.maxSpeed}
                  </p>
                  <p className="text-sm opacity-70">km/h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horsepower Card */}
          <div
            className={`card ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-xl`}
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="card-title">Horsepower</h3>
                  <p className="text-3xl font-bold">
                    {config.performanceMetrics.metrics.horsepower}
                  </p>
                  <p className="text-sm opacity-70">hp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Torque Card */}
          <div
            className={`card ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-xl`}
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 12L16 8" />
                  <path d="M12 8v4" />
                </svg>
                <div>
                  <h3 className="card-title">Torque</h3>
                  <p className="text-3xl font-bold">
                    {config.performanceMetrics.metrics.torque}
                  </p>
                  <p className="text-sm opacity-70">Nm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engine Specifications */}
        <div
          className={`card ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-xl mb-8`}
        >
          <div className="card-body">
            <h2 className="card-title mb-4">Engine Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm opacity-70">Engine Size</p>
                <p className="text-xl font-bold">
                  {config.performanceMetrics.metrics.cc} cc
                </p>
              </div>
              <div>
                <p className="text-sm opacity-70">Cylinders</p>
                <p className="text-xl font-bold">
                  {config.performanceMetrics.bodyData.nOC}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-70">Bore × Stroke</p>
                <p className="text-xl font-bold">
                  {config.performanceMetrics.bodyData.bD} ×{" "}
                  {config.performanceMetrics.bodyData.pS} mm
                </p>
              </div>
              <div>
                <p className="text-sm opacity-70">Max RPM</p>
                <p className="text-xl font-bold">
                  {config.performanceMetrics.bodyData.brpm}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className={`w-full max-w-md transform transition-all ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-xl`}>
              <h3 className="text-xl font-bold mb-2">Share Configuration</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Enter the email address of the user you want to share with
              </p>
              
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className={`input input-bordered w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                  value={shareEmail}
                  onChange={(e) => {
                    setShareEmail(e.target.value);
                    setSelectedUser(null);
                  }}
                />
                
                {/* Search Results Dropdown */}
                {searchResults.length > 0 && !selectedUser && (
                  <div className={`absolute w-full mt-1 rounded-lg shadow-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                  } border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    {searchResults.map((user) => (
                      <div
                        key={user._id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:${
                          isDarkMode ? 'bg-gray-600' : 'bg-gray-50'
                        } transition-colors duration-150`}
                        onClick={() => {
                          setShareEmail(user.email);
                          setSelectedUser(user);
                          setSearchResults([]);
                        }}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-gray-500' : 'bg-gray-200'
                        }`}>
                          {user.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {user.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Loading Indicator */}
                {isSearching && (
                  <div className="absolute right-3 top-3">
                    <div className="w-5 h-5 border-2 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                  </div>
                )}
              </div>

              {selectedUser && (
                <div className={`mt-4 p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                } flex items-center gap-3`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    {selectedUser.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-150`}
                  onClick={() => {
                    setShowShareModal(false);
                    setShareEmail('');
                    setSelectedUser(null);
                    setSearchResults([]);
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={handleShare}
                  disabled={!shareEmail.trim()}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className={`modal-box ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } p-6 rounded-lg max-w-md mx-auto`}
            >
              <h3 className="font-bold text-lg mb-4">Delete Configuration</h3>
              <p className="mb-6">
                Are you sure you want to delete this configuration? This action
                cannot be undone.
              </p>
              <div className="modal-action flex justify-end gap-4">
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    handleDelete();
                    setShowDeleteModal(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationViewer;
