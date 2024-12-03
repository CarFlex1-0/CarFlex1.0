import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@contexts/ThemeContext";
import { useAuth } from "@contexts/auth_context";
import { toast } from "react-toastify";
import axios from "@services/axios";
import Cookies from "js-cookie";
import BackgroundIcons from "@components/BackgroundIcons";
import { BiCar } from "react-icons/bi";
import { FaShareAlt, FaCogs, FaTachometerAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { GiSpeedometer } from "react-icons/gi";
import { motion } from "framer-motion";

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
      const response = await axios.get(`/car-configs/${id}`);
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
    } else if (modelType === "swift") {
      navigate(`/user/customize-3d-model-swift`, { state: { config } });
    }
  };

  const handleDelete = async () => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`/car-configs/${id}`);
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
      const token = Cookies.get("token");
      const response = await axios.get(`/user/search?email=${searchTerm}`);

      if (response.data.success) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Failed to search users");
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
    <div className={`min-h-screen relative ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#2b4e7e] to-black' 
        : 'bg-gray-100'
    } ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <BackgroundIcons />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${
              config.customization.modelType === 'civic' 
                ? 'bg-blue-500/10' 
                : config.customization.modelType === 'corolla'
                ? 'bg-emerald-500/10'
                : 'bg-purple-500/10'
            }`}>
              <BiCar className={`w-8 h-8 ${
                config.customization.modelType === 'civic' 
                  ? 'text-blue-500' 
                  : config.customization.modelType === 'corolla'
                  ? 'text-emerald-500'
                  : 'text-purple-500'
              }`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{config.name}</h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {getModelName(config.customization.modelType)}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShareModal(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl ${
                isDarkMode 
                  ? 'bg-gray-800/50 hover:bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 shadow-lg shadow-blue-500/10' 
                  : 'bg-blue-500/10 hover:bg-blue-500/20 shadow-sm hover:shadow-blue-500/25'
              } transition-all duration-300`}
            >
              <FaShareAlt className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Share</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl ${
                isDarkMode 
                  ? 'bg-gray-800/50 hover:bg-emerald-900/20 backdrop-blur-sm border border-emerald-500/20 shadow-lg shadow-emerald-500/10' 
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 shadow-sm hover:shadow-emerald-500/25'
              } transition-all duration-300`}
            >
              <CiEdit className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span className={`font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Edit</span>
            </motion.button>

            {config.creator._id === user._id && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteModal(true)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl ${
                  isDarkMode 
                    ? 'bg-gray-800/50 hover:bg-red-900/20 backdrop-blur-sm border border-red-500/20 shadow-lg shadow-red-500/10' 
                    : 'bg-red-500/10 hover:bg-red-500/20 shadow-sm hover:shadow-red-500/25'
                } transition-all duration-300`}
              >
                <MdDeleteForever className={`w-4 h-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                <span className={`font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Delete</span>
              </motion.button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`card ${
              isDarkMode 
                ? 'bg-gray-800/50  border border-blue-500/20' 
                : 'bg-white'
            } shadow-xl`}
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-500/10">
                  <FaTachometerAlt className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="card-title">Acceleration</h3>
                  <p className="text-3xl font-bold">
                    {config.performanceMetrics.metrics.acceleration}s
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    0-60 mph
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`card ${
              isDarkMode 
                ? 'bg-gray-800/50  border border-emerald-500/20' 
                : 'bg-white'
            } shadow-xl`}
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-emerald-500/10">
                  <GiSpeedometer className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="card-title">Max Speed</h3>
                  <p className="text-3xl font-bold">
                    {config.performanceMetrics.metrics.maxSpeed}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    km/h
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`card ${
              isDarkMode 
                ? 'bg-gray-800/50  border border-purple-500/20' 
                : 'bg-white'
            } shadow-xl`}
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-purple-500/10">
                  <FaTachometerAlt className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="card-title">Horsepower</h3>
                  <p className="text-3xl font-bold">
                    {config.performanceMetrics.metrics.horsepower}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    hp
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`card ${
              isDarkMode 
                ? 'bg-gray-800/50  border border-purple-500/20' 
                : 'bg-white'
            } shadow-xl`}
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-purple-500/10">
                  <FaTachometerAlt className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="card-title">Torque</h3>
                  <p className="text-3xl font-bold">
                    {config.performanceMetrics.metrics.torque}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Nm
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`card ${
            isDarkMode 
              ? 'bg-gray-800/50  border border-purple-500/20' 
              : 'bg-white'
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
        </motion.div>

        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md transform transition-all ${
                isDarkMode 
                  ? 'bg-gray-800/90 backdrop-blur-sm border border-blue-500/20' 
                  : 'bg-white'
              } rounded-lg p-6 shadow-xl`}
            >
              <h3 className="text-xl font-bold mb-2">Share Configuration</h3>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } mb-4`}
              >
                Enter the email address of the user you want to share with
              </p>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className={`input input-bordered w-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                  value={shareEmail}
                  onChange={(e) => {
                    setShareEmail(e.target.value);
                    setSelectedUser(null);
                  }}
                />

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && !selectedUser && (
                  <div
                    className={`absolute w-full mt-1 rounded-lg shadow-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-white"
                    } border ${
                      isDarkMode ? "border-gray-600" : "border-gray-200"
                    }`}
                  >
                    {searchResults.map((user) => (
                      <div
                        key={user._id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:${
                          isDarkMode ? "bg-gray-600" : "bg-gray-50"
                        } transition-colors duration-150`}
                        onClick={() => {
                          setShareEmail(user.email);
                          setSelectedUser(user);
                          setSearchResults([]);
                        }}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isDarkMode ? "bg-gray-500" : "bg-gray-200"
                          }`}
                        >
                          {user.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
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
                <div
                  className={`mt-4 p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  } flex items-center gap-3`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-gray-600" : "bg-gray-200"
                    }`}
                  >
                    {selectedUser.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-xl ${
                    isDarkMode
                      ? 'bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-500/20 shadow-lg shadow-gray-500/10' 
                      : 'bg-gray-200 hover:bg-gray-300 shadow-sm hover:shadow-gray-500/25'
                  } transition-all duration-300`}
                  onClick={() => setShowShareModal(false)}
                >
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cancel</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-xl ${
                    isDarkMode 
                      ? 'bg-gray-800/50 hover:bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 shadow-lg shadow-blue-500/10' 
                      : 'bg-blue-500/10 hover:bg-blue-500/20 shadow-sm hover:shadow-blue-500/25'
                  } transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={handleShare}
                  disabled={!shareEmail.trim()}
                >
                  <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Share</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`modal-box ${
                isDarkMode 
                  ? 'bg-gray-800/90 backdrop-blur-sm border border-red-500/20' 
                  : 'bg-white'
              } p-6 rounded-lg max-w-md mx-auto`}
            >
              <h3 className="font-bold text-lg mb-4">Delete Configuration</h3>
              <p className="mb-6">
                Are you sure you want to delete this configuration? This action
                cannot be undone.
              </p>
              <div className="modal-action flex justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-xl ${
                    isDarkMode
                      ? 'bg-gray-800/50 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-500/20' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  } transition-all duration-300`}
                  onClick={() => setShowDeleteModal(false)}
                >
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cancel</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-xl ${
                    isDarkMode 
                      ? 'bg-gray-800/50 hover:bg-gray-700/60 backdrop-blur-sm border border-red-500/20' 
                      : 'bg-red-500/10 hover:bg-red-500/20'
                  } transition-all duration-300`}
                  onClick={() => {
                    handleDelete();
                    setShowDeleteModal(false);
                  }}
                >
                  <span className={`font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Delete</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationViewer;
