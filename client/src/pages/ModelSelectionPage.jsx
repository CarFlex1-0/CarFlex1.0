import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@contexts/ThemeContext";
import { toast } from "react-toastify";
import axios from "@services/axios";
import { useAuth } from "@contexts/auth_context";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCar,
  FaShare,
  FaPlus,
  FaTachometerAlt,
  FaCog,
  FaShareAlt,
  FaCalendarAlt,
  FaCogs,
  FaPaintBrush,
  FaGasPump,
} from "react-icons/fa";
import { RiCarWashingFill, RiCarLine } from "react-icons/ri";
import {
  GiCarWheel,
  GiSteeringWheel,
  GiCarDoor,
  GiSpeedometer,
} from "react-icons/gi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillLightningFill } from "react-icons/bs";
import BackgroundIcons from "@components/BackgroundIcons";
import { BiCar } from "react-icons/bi";

const MotionLink = motion(Link);
const MotionDiv = motion.div;

const CardWrapper = ({ children, delay }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02 }}
    className="h-full"
  >
    {children}
  </MotionDiv>
);

const HoverCard = ({ children }) => (
  <motion.div
    whileHover={{
      scale: 1.03,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    }}
    whileTap={{ scale: 0.98 }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const ModelSelectionPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, drawerState } = useAuth();
  const navigate = useNavigate();
  const [myModels, setMyModels] = useState([]);
  const [sharedModels, setSharedModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchConfigurations();
    }
  }, [user]);

  const fetchConfigurations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/car-configs");
      // console.log(response.data);

      if (response.data.success) {
        const created = response.data.data.created.filter(
          (model) => model.creator._id === user._id
        );
        const shared = response.data.data.shared.filter(
          (model) => model.creator._id !== user._id
        );

        setMyModels(created);
        setSharedModels(shared);
      }
    } catch (error) {
      console.error("Error fetching configurations:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        navigate("/sign-in");
      } else {
        toast.error("Failed to fetch configurations");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode
            ? "bg-gradient-to-br from-[#2b4e7e] to-black"
            : "bg-gray-100"
        } flex items-center justify-center`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <AiOutlineLoading3Quarters className="w-12 h-12 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className={drawerState ? "blur bg-blue-950 cursor-none" : ""}>
      <div
        className={`min-h-screen relative ${
          isDarkMode
            ? "bg-gradient-to-br from-[#2b4e7e] to-black"
            : "bg-gray-100"
        } ${isDarkMode ? "text-white" : "text-gray-900"}`}
      >
        <BackgroundIcons />

        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div className="flex items-center gap-3">
              <GiSteeringWheel className="w-10 h-10 text-blue-500" />
              <h1 className="text-4xl font-bold">Car Customization Hub</h1>
            </div>
            <div className="flex gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="btn btn-circle btn-ghost"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
              {/* Refresh Button */}
              <button
                onClick={() => fetchConfigurations()}
                className="btn btn-circle btn-ghost"
                aria-label="Refresh configurations"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* New Model Section */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <FaPlus className="w-6 h-6 text-emerald-500" />
              <h2 className="text-2xl font-semibold">Create New Model</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Civic Card */}
              <CardWrapper delay={0.1}>
                <HoverCard>
                  <MotionLink
                    to="/user/customize-3d-model"
                    className={`card ${
                      isDarkMode
                        ? "bg-gray-800/50 hover:bg-gray-700/60  border border-blue-500/20"
                        : "bg-white hover:bg-gray-50"
                    } shadow-xl transition-all duration-300`}
                  >
                    <div className="card-body relative overflow-hidden">
                      <div className="absolute inset-0 opacity-5">
                        <motion.div
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500"
                        />
                      </div>

                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-full bg-blue-500/10">
                            <RiCarLine className="w-8 h-8 text-blue-500" />
                          </div>
                          <h3 className="card-title">Honda Civic</h3>
                        </div>

                        <div className="space-y-4">
                          <p
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }
                          >
                            Customize your Honda Civic with our advanced 3D
                            configurator
                          </p>

                          <div className="flex flex-wrap gap-2 my-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500">
                              <FaTachometerAlt className="inline mr-1" />{" "}
                              Performance
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-500">
                              <GiCarDoor className="inline mr-1" /> Exterior
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-500">
                              <FaCog className="inline mr-1" /> Custom Parts
                            </span>
                          </div>

                          <div className="card-actions justify-end mt-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`btn gap-2 ${
                                isDarkMode
                                  ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white border-0"
                                  : "btn-primary"
                              }`}
                            >
                              <BsFillLightningFill className="w-4 h-4" />
                              Start Customizing
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MotionLink>
                </HoverCard>
              </CardWrapper>

              {/* Corolla Card - with different color scheme */}
              <CardWrapper delay={0.2}>
                <HoverCard>
                  <MotionLink
                    to="/user/customize-3d-model-corolla"
                    className={`card ${
                      isDarkMode
                        ? "bg-gray-800/50 hover:bg-gray-700/60  border border-emerald-500/20"
                        : "bg-white hover:bg-gray-50"
                    } shadow-xl transition-all duration-300`}
                  >
                    <div className="card-body relative overflow-hidden">
                      <div className="absolute inset-0 opacity-5">
                        <motion.div
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          className="w-full h-full bg-gradient-to-br from-emerald-500 to-green-500"
                        />
                      </div>

                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-full bg-emerald-500/10">
                            <RiCarWashingFill className="w-8 h-8 text-emerald-500" />
                          </div>
                          <h3 className="card-title">Toyota Corolla</h3>
                        </div>

                        <div className="space-y-4">
                          <p
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }
                          >
                            Create your perfect Toyota Corolla with custom
                            modifications
                          </p>

                          <div className="flex flex-wrap gap-2 my-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-500">
                              <FaTachometerAlt className="inline mr-1" />{" "}
                              Performance
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                              <GiCarDoor className="inline mr-1" /> Exterior
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-teal-500/10 text-teal-500">
                              <FaCog className="inline mr-1" /> Custom Parts
                            </span>
                          </div>

                          <div className="card-actions justify-end mt-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`btn gap-2 ${
                                isDarkMode
                                  ? "bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white border-0"
                                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
                              }`}
                            >
                              <BsFillLightningFill className="w-4 h-4" />
                              Start Customizing
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MotionLink>
                </HoverCard>
              </CardWrapper>

              {/* Swift Card - with purple theme */}
              <CardWrapper delay={0.3}>
                <HoverCard>
                  <MotionLink
                    to="/user/customize-3d-model-swift"
                    className={`card ${
                      isDarkMode
                        ? "bg-gray-800/50 hover:bg-gray-700/60  border border-purple-500/20"
                        : "bg-white hover:bg-gray-50"
                    } shadow-xl transition-all duration-300`}
                  >
                    <div className="card-body relative overflow-hidden">
                      <div className="absolute inset-0 opacity-5">
                        <motion.div
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500"
                        />
                      </div>

                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-full bg-purple-500/10">
                            <RiCarWashingFill className="w-8 h-8 text-purple-500" />
                          </div>
                          <h3 className="card-title">Suzuki Swift</h3>
                        </div>

                        <div className="space-y-4">
                          <p
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }
                          >
                            Create your perfect Suzuki Swift with custom
                            modifications
                          </p>

                          <div className="flex flex-wrap gap-2 my-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-500">
                              <FaTachometerAlt className="inline mr-1" />{" "}
                              Performance
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-pink-500/10 text-pink-500">
                              <GiCarDoor className="inline mr-1" /> Exterior
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-pink-500/10 text-pink-500">
                              <FaCog className="inline mr-1" /> Custom Parts
                            </span>
                          </div>

                          <div className="card-actions justify-end mt-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`btn gap-2 ${
                                isDarkMode
                                  ? "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white border-0"
                                  : "btn-primary"
                              }`}
                            >
                              <BsFillLightningFill className="w-4 h-4" />
                              Start Customizing
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MotionLink>
                </HoverCard>
              </CardWrapper>
            </div>
          </section>

          {/* My Models Section */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <FaCar className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-semibold">My Models</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myModels.length > 0 ? (
                myModels.map((model, index) => (
                  <CardWrapper key={model._id} delay={0.1 * (index + 1)}>
                    <div
                      className={`card ${
                        isDarkMode
                          ? "bg-gray-800/50 hover:bg-gray-700/60  border border-purple-500/20"
                          : "bg-white hover:bg-gray-50"
                      } shadow-xl transition-all duration-300`}
                    >
                      <div className="card-body">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-full bg-purple-500/10">
                            {model.customization.modelType === "civic" ? (
                              <BiCar className="w-6 h-6 text-blue-500" />
                            ) : model.customization.modelType === "corolla" ? (
                              <BiCar className="w-6 h-6 text-emerald-500" />
                            ) : (
                              <BiCar className="w-6 h-6 text-purple-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="card-title capitalize">
                              {model.name}
                            </h3>
                            <span className="text-xs text-gray-500 capitalize">
                              {model.customization.modelType}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          {/* Performance Metrics */}
                          <div className="flex items-center gap-2 text-sm">
                            <FaTachometerAlt className="text-blue-500" />
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {model.performanceMetrics.metrics.maxSpeed.toFixed(
                                1
                              )}{" "}
                              km/h
                            </span>
                          </div>

                          {/* Customization Summary */}
                          <div className="flex items-center gap-2 text-sm">
                            <FaPaintBrush className="text-emerald-500" />
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {model.customization.carBodyColor.name}
                            </span>
                          </div>

                          {/* Share Count */}
                          <div className="flex items-center gap-2 text-sm">
                            <FaShareAlt className="text-purple-500" />
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              Shared with {model.sharedWith.length} users
                            </span>
                          </div>

                          {/* Creation Date */}
                          <div className="flex items-center gap-2 text-sm">
                            <FaCalendarAlt className="text-pink-500" />
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {new Date(model.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="card-actions justify-end mt-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              navigate(`/user/models/${model._id}`)
                            }
                            className={`btn gap-2 ${
                              isDarkMode
                                ? "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white border-0"
                                : "bg-purple-500 hover:bg-purple-600 text-white"
                            }`}
                          >
                            <FaCogs className="w-4 h-4" />
                            View Model
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </CardWrapper>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`col-span-3 text-center p-8 ${
                    isDarkMode ? "bg-gray-800/50 " : "bg-gray-200"
                  } rounded-lg`}
                >
                  <GiCarWheel className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    No custom models created yet. Start by creating a new model!
                  </p>
                </motion.div>
              )}
            </div>
          </section>

          {/* Shared Models Section */}
          <section>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <FaShareAlt className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-semibold">Shared Models</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sharedModels.length > 0 ? (
                sharedModels.map((model, index) => (
                  <CardWrapper key={model._id} delay={0.1 * index}>
                    <div
                      className={`card ${
                        isDarkMode
                          ? "bg-gray-800/50 hover:bg-gray-700/60  border border-blue-500/20"
                          : "bg-white hover:bg-gray-50"
                      } shadow-xl transition-all duration-300`}
                    >
                      <div className="card-body">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-full bg-blue-500/10">
                            {model.customization.modelType === "civic" ? (
                              <BiCar className="w-6 h-6 text-blue-500" />
                            ) : model.customization.modelType === "corolla" ? (
                              <BiCar className="w-6 h-6 text-emerald-500" />
                            ) : (
                              <BiCar className="w-6 h-6 text-purple-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="card-title capitalize">
                              {model.name}
                            </h3>
                            <span className="text-xs text-gray-500">
                              by {model.creator?.email.split("@")[0]}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          {/* Performance Metrics */}
                          <div className="flex items-center gap-2 text-sm">
                            <FaTachometerAlt className="text-blue-500" />
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {model.performanceMetrics.metrics.maxSpeed.toFixed(
                                1
                              )}{" "}
                              km/h
                            </span>
                          </div>

                          {/* Customization Summary */}
                          <div className="flex items-center gap-2 text-sm">
                            <FaPaintBrush className="text-emerald-500" />
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {model.customization.carBodyColor.name}
                            </span>
                          </div>

                          {/* Share Count */}
                          <div className="flex items-center gap-2 text-sm">
                            <FaShareAlt className="text-purple-500" />
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              Shared with {model.sharedWith.length} users
                            </span>
                          </div>

                          {/* Creation Date */}
                          <div className="flex items-center gap-2 text-sm">
                            <FaCalendarAlt className="text-pink-500" />
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {new Date(model.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="card-actions justify-end mt-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              navigate(`/user/models/${model._id}`)
                            }
                            className={`btn gap-2 ${
                              isDarkMode
                                ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white border-0"
                                : "bg-blue-500 hover:bg-blue-600 text-white"
                            }`}
                          >
                            <FaCogs className="w-4 h-4" />
                            View Model
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </CardWrapper>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`col-span-3 text-center p-8 ${
                    isDarkMode ? "bg-gray-800/50 " : "bg-gray-200"
                  } rounded-lg`}
                >
                  <GiCarWheel className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    No models have been shared with you yet.
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModelSelectionPage;
