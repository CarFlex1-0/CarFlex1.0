import { useCustomization } from "@contexts/Customization";
import { useAuth } from "@contexts/auth_context";
import { useTheme } from "@contexts/ThemeContext";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast, Slide } from "react-toastify";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Legend,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import axios from "@services/axios";
import Cookies from "js-cookie";
import RatingStars from "@components/RatingStars";

const Configurator = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const existingConfig = location.state?.config;
  const isViewMode = location.state?.isViewMode;
  const configData = location.state?.config;

  const [currentRating, setCurrentRating] = useState({
    averageRating: configData?.averageRating || 0,
    totalRatings: configData?.totalRatings || 0,
  });

  const {
    interior,
    interiorClick,
    setInterior,
    interiorColor,
    interiorColors,
    setInteriorClick,
    setInteriorColor,
    door,
    setDoor,
    spoilerColors,
    doorColors,
    rimColors,
    windowColors,
    bonnetColors,
    lightColors,
    sideKitColors,
    bodyColors,
    bumperFrontColors,
    bumperBackColors,
    grillColors,
    fenderColors,
    diffuserColors,
    roofColors,
    trunkColors,
    // CarBody
    carBodyClick,
    setCarBodyClick,
    carBodyColor,
    setCarBodyColor,
    // Spoiler
    spoiler,
    setSpoiler,
    spoilerClick,
    setSpoilerClick,
    spoilerColor,
    setSpoilerColor,
    // Windows
    windowClick,
    setWindowClick,
    windowColor,
    setWindowColor,
    // Rims
    rimClick,
    setRimClick,
    rimColor,
    setRimColor,
    rim,
    setRim,

    // Wheels
    wheels,
    setWheels,
    wheelsClick,
    setWheelsClick,
    // Bonnet
    bonnetClick,
    setBonnetClick,
    bonnetColor,
    setBonnetColor,
    bonnet,
    setBonnet,
    // Sidekits
    sideKit,
    setSideKit,
    sideKitClick,
    setSideKitClick,
    sideKitColor,
    setSideKitColor,

    // Lights
    lightClick,
    setLightClick,
    lightColor,
    setLightColor,
    // BumperFront
    bumperFrontClick,
    setBumperFrontClick,
    bumperFrontColor,
    setBumperFrontColor,
    // BumperBack
    bumperBack,
    setBumperBack,
    bumperBackClick,
    setBumperBackClick,
    bumperBackColor,
    setBumperBackColor,
    // Grill
    grillClick,
    setGrillClick,
    grillColor,
    setGrillColor,
    // Doors
    doorClick,
    setDoorClick,
    doorColor,
    setDoorColor,
    // Engine
    engine,
    setEngine,
    engineClick,
    setEngineClick,
    // Fender
    fenderClick,
    setFenderClick,
    fenderColor,
    setFenderColor,
    // Diffuser
    diffuser,
    setDiffuser,
    diffuserClick,
    setDiffuserClick,
    diffuserColor,
    setDiffuserColor,
    // Roof
    roofClick,
    setRoofClick,
    roofColor,
    setRoofColor,
    // Silencer
    silencer,
    setSilencer,
    silencerClick,
    setSilencerClick,
    // Trunk
    trunkClick,
    setTrunkClick,
    trunkColor,
    setTrunkColor,
  } = useCustomization();

  const [bodyData, setBodyData] = useState({
    p: 280, // Power from engine.power.value
    kW: 1292.5, // Weight from engine.kerbWeight.value
    dC: 0.346, // Drag coefficient from dimensions.dragCoefficient.value
    w: 1805, // Width from dimensions.width.value
    h: 1455, // Height from dimensions.height.value
    t: 390, // Torque from engine.torque.value
    r: 3250, // RPM from engine.torque.rpm
    nOC: 3, // Number of cylinders from engine.numberOfCylinders
    bD: 87.5, // Bore diameter from engine.bore.value
    pS: 89.7, // Piston stroke from engine.stroke.value
    brpm: 6500, // RPM at max power from engine.power.rpm
  });

  const [metrics, setMetrics] = useState({
    stockAcceleration: 3.79,
    newAcceleration: 3.79,
    stockMaxSpeed: 257.93,
    newMaxSpeed: 257.93,
    stockHorsepower: 178.0,
    newHorsepower: 178.0,
    stockCC: 1618.15,
    newCC: 1618.15,
    stockTorque: 306.74,
    newTorque: 306.74,
  });

  const [isConfigOpen, setIsConfigOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [configName, setConfigName] = useState("");
  const [showRadialChart, setShowRadialChart] = useState(false);

  useEffect(() => {
    if (existingConfig) {
      // Load customization settings
      setInterior(existingConfig.customization.interior || 0);
      setInteriorColor(
        existingConfig.customization.interiorColor || interiorColors[0]
      );
      setDoor(existingConfig.customization.door || 1);
      setDoorColor(existingConfig.customization.doorColor || doorColors[0]);
      setSpoiler(existingConfig.customization.spoiler || 0);
      setSpoilerColor(
        existingConfig.customization.spoilerColor || spoilerColors[0]
      );
      setRim(existingConfig.customization.rim || 0);
      setRimColor(existingConfig.customization.rimColor || rimColors[0]);
      setWheels(existingConfig.customization.wheels || 1);
      setBonnet(existingConfig.customization.bonnet || 1);
      setBonnetColor(
        existingConfig.customization.bonnetColor || bonnetColors[0]
      );
      setSideKit(existingConfig.customization.sideKit || 0);
      setSideKitColor(
        existingConfig.customization.sideKitColor || sideKitColors[0]
      );
      setWindowColor(
        existingConfig.customization.windowColor || windowColors[0]
      );
      setCarBodyColor(
        existingConfig.customization.carBodyColor || bodyColors[0]
      );
      setBumperFrontColor(
        existingConfig.customization.bumperFrontColor || bumperFrontColors[0]
      );
      setBumperBackColor(
        existingConfig.customization.bumperBackColor || bumperBackColors[0]
      );
      setGrillColor(existingConfig.customization.grillColor || grillColors[0]);
      setFenderColor(
        existingConfig.customization.fenderColor || fenderColors[0]
      );
      setDiffuser(existingConfig.customization.diffuser || 0);
      setDiffuserColor(
        existingConfig.customization.diffuserColor || diffuserColors[0]
      );
      setRoofColor(existingConfig.customization.roofColor || roofColors[0]);
      setTrunkColor(existingConfig.customization.trunkColor || trunkColors[0]);
      setSilencer(existingConfig.customization.silencer || 1);

      // Load performance metrics
      if (existingConfig.performanceMetrics) {
        setBodyData(existingConfig.performanceMetrics.bodyData);
        setMetrics((prevMetrics) => ({
          ...prevMetrics,
          newAcceleration:
            existingConfig.performanceMetrics.metrics.acceleration,
          newMaxSpeed: existingConfig.performanceMetrics.metrics.maxSpeed,
          newHorsepower: existingConfig.performanceMetrics.metrics.horsepower,
          newCC: existingConfig.performanceMetrics.metrics.cc,
          newTorque: existingConfig.performanceMetrics.metrics.torque,
        }));
      }

      // Set the configuration name if it exists
      setConfigName(existingConfig.name || "");

      toast.info("Loaded existing configuration", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Slide,
      });
    }
  }, [existingConfig]);

  const updateMetrics = async (changes) => {
    try {
      const updatedBodyData = {
        ...bodyData,
        ...changes,
      };

      setBodyData(updatedBodyData);

      // console.log("Updated body data:", updatedBodyData);

      const responses = await Promise.all([
        axios.post("metric01", { bodyData: updatedBodyData }),
        axios.post("metric02", { bodyData: updatedBodyData }),
        axios.post("metric03", { bodyData: updatedBodyData }),
        axios.post("metric04", { bodyData: updatedBodyData }),
        axios.post("metric05", { bodyData: updatedBodyData }),
      ]);

      const [acceleration, maxSpeed, horsepower, cc, torque] = responses.map(
        (response) => response.data.data
      );

      setMetrics((prevMetrics) => {
        const newMetrics = {
          ...prevMetrics,
          newAcceleration: parseFloat(acceleration.acceleration).toFixed(2),
          newMaxSpeed: parseFloat(maxSpeed.max_speed).toFixed(2),
          newHorsepower: parseFloat(horsepower.hp).toFixed(2),
          newCC: parseFloat(cc.cc).toFixed(2),
          newTorque: parseFloat(torque.torque).toFixed(2),
        };
        // console.log("New metrics:", newMetrics);
        return newMetrics;
      });
    } catch (error) {
      console.error("Failed to fetch metrics", error);
    }
  };

  useEffect(() => {
    // console.log("Updated metrics:", metrics);
  }, [metrics]);

  const data = [
    {
      name: "0-60 (s*100)",
      Stock: metrics.stockAcceleration,
      New: metrics.newAcceleration,
    },
    {
      name: "Max Speed (km/h)",
      Stock: metrics.stockMaxSpeed,
      New: metrics.newMaxSpeed,
    },
    {
      name: "Horsepower (hp)",
      Stock: metrics.stockHorsepower,
      New: metrics.newHorsepower,
    },
    {
      name: "CC (cm3)",
      Stock: metrics.stockCC,
      New: metrics.newCC,
    },
    {
      name: "Torque",
      Stock: metrics.stockTorque,
      New: metrics.newTorque,
    },
  ];

  const getMaxValue = (dataKey) => {
    return Math.max(
      ...data.map((item) => Math.max(item[dataKey], item["New"]))
    );
  };

  const getRadialDomain = () => {
    const maxCC = Math.max(metrics.stockCC, metrics.newCC);
    if (maxCC > 3000) {
      return [0, Math.ceil(maxCC / 1000) * 1000];
    }
    return [0, 3000];
  };

  const style = {
    top: "30%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p className="label" style={{ color: "#fff" }}>{`${data.name}`}</p>
          <p style={{ color: "#8884d8" }}>{`Stock: ${data.Stock}`}</p>
          <p style={{ color: "#82ca9d" }}>{`New: ${data.New}`}</p>
        </div>
      );
    }
    return null;
  };

  const saveConfiguration = async (name) => {
    try {
      if (!user) {
        alert("Please login to save your configuration");
        return;
      }

      const configData = {
        name,
        performanceMetrics: {
          bodyData,
          metrics: {
            acceleration: metrics.newAcceleration,
            maxSpeed: metrics.newMaxSpeed,
            horsepower: metrics.newHorsepower,
            cc: metrics.newCC,
            torque: metrics.newTorque,
          },
        },
        customization: {
          modelType: "swift",
          interior,
          interiorColor,
          door,
          doorColor,
          spoiler,
          spoilerColor,
          rim,
          rimColor,
          wheels,
          bonnet,
          bonnetColor,
          sideKit,
          sideKitColor,
          windowColor,
          carBodyColor,
          bumperFrontColor,
          bumperBackColor,
          grillColor,
          fenderColor,
          diffuser,
          diffuserColor,
          roofColor,
          trunkColor,
          silencer,
        },
      };

      // const token = Cookies.get("token");
      let response;

      if (existingConfig) {
        // Update existing configuration
        response = await axios.put(
          `/car-configs/${existingConfig._id}`,
          configData
        );
        toast.success("Configuration updated successfully!");
      } else {
        // Create new configuration
        response = await axios.post("/car-configs", configData);
        toast.success("Configuration saved successfully!");
      }

      // console.log("Configuration saved:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to save configuration:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      if (!user) {
        toast.error("Please login to save your configuration", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Slide,
        });
        return;
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to save configuration:", error);
      toast.error("Failed to save configuration: " + error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  const handleModalSave = async () => {
    try {
      setIsSaving(true);

      // If editing and name is blank, use existing name
      const saveName =
        existingConfig && !configName.trim()
          ? existingConfig.name
          : configName.trim();

      // If new configuration, require a name
      if (!existingConfig && !saveName) {
        toast.error("Please enter a configuration name", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Slide,
        });
        return;
      }

      await saveConfiguration(saveName);
      toast.success(
        `Configuration ${existingConfig ? "updated" : "saved"} successfully!`,
        {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Slide,
        }
      );
      setIsModalOpen(false);
      setConfigName("");
    } catch (error) {
      toast.error(
        `Failed to ${existingConfig ? "update" : "save"} configuration: ` +
          error.message,
        {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Slide,
        }
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/60 backdrop-blur-xl z-50 flex border-b border-white/20 shadow-lg">
        <button
          onClick={() => setIsConfigOpen(!isConfigOpen)}
          className="flex-1 h-full bg-white/5 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 text-white font-medium border-r border-white/10"
        >
          {isConfigOpen ? "Close" : "Open"} Configurator
        </button>

        {isViewMode ? (
          <div className="flex-1 h-full bg-white/5 flex items-center justify-center px-4 border-r border-white/10">
            <RatingStars
              rating={currentRating.averageRating}
              totalRatings={currentRating.totalRatings}
              onRate={async (rating) => {
                try {
                  const response = await axios.post("/car-configs/rate", {
                    configId: configData._id,
                    rating,
                  });

                  setCurrentRating({
                    averageRating: response.data.data.averageRating,
                    totalRatings: response.data.data.totalRatings,
                  });

                  toast.success("Rating submitted successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: isDarkMode ? "dark" : "light",
                    transition: Slide,
                  });
                } catch (error) {
                  toast.error("Failed to submit rating", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: isDarkMode ? "dark" : "light",
                    transition: Slide,
                  });
                }
              }}
              size="lg"
            />
          </div>
        ) : (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 h-full bg-white/5 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 text-white font-medium disabled:opacity-50 border-r border-white/10"
          >
            {isSaving ? "Saving..." : "Save Configuration"}
          </button>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-16 h-full bg-white/5 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
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
              className="h-6 w-6 text-white"
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
      </div>

      {/* Save Configuration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 w-96 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">
              {existingConfig ? "Rename Configuration" : "Save Configuration"}
            </h2>
            <input
              type="text"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              placeholder={
                existingConfig
                  ? existingConfig.name
                  : "Enter configuration name"
              }
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-white/10 focus:outline-none focus:border-blue-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setConfigName("");
                }}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                disabled={isSaving}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white disabled:opacity-50"
              >
                {isSaving ? "Saving..." : existingConfig ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Graph Display - Always visible */}
      <div
        className={`mt-20 backdrop-blur-md rounded-lg g-4 ${
          isDarkMode ? "bg-gray-900/50" : "bg-gray-100/30"
        } flex flex-col justify-center items-center w-full container mx-auto px-4`}
      >
        <div
          className={`text-${isDarkMode ? "white" : "gray-800"} text-3xl mb-5`}
        >
          Performance Details
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke={isDarkMode ? "#FFFFFF" : "#000000"}
              tick={{ fill: isDarkMode ? "#FFFFFF" : "#000000" }}
              height={30}
              tickSize={8}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis
              stroke={isDarkMode ? "#FFFFFF" : "#000000"}
              domain={[0, (dataMax) => Math.max(dataMax, getMaxValue("Stock"))]}
              tick={{ fill: isDarkMode ? "#FFFFFF" : "#000000" }}
              width={60}
              tickSize={8}
              allowDecimals={false}
              padding={{ top: 10, bottom: 0 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Stock" fill="#8884d8" />
            <Bar dataKey="New" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        {/* Line Chart */}
        <div className="mt-10 w-full">
          <div
            className={`text-${
              isDarkMode ? "white" : "gray-800"
            } text-2xl mb-3`}
          >
            Performance Trend
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                stroke={isDarkMode ? "#FFFFFF" : "#000000"}
                tick={{ fill: isDarkMode ? "#FFFFFF" : "#000000" }}
                height={30}
                tickSize={8}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis
                stroke={isDarkMode ? "#FFFFFF" : "#000000"}
                domain={[
                  0,
                  (dataMax) => Math.max(dataMax, getMaxValue("Stock")),
                ]}
                tick={{ fill: isDarkMode ? "#FFFFFF" : "#000000" }}
                width={60}
                tickSize={8}
                allowDecimals={false}
                padding={{ top: 10, bottom: 0 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="Stock" stroke="#8884d8" />
              <Line type="monotone" dataKey="New" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radial Chart */}
        {/* <div className="mt-10 w-full">
          <div className="text-white text-2xl mb-3">Performance Overview</div>
          <ResponsiveContainer width="100%" height={400}>
            <RadialBarChart
              innerRadius="20%"
              outerRadius="80%"
              data={data}
              startAngle={180}
              endAngle={0}
              barGap={2}
              barCategoryGap={3}
            >
              <PolarAngleAxis
                type="number"
                domain={getRadialDomain()}
                angleAxisId={0}
                tick={{ fill: isDarkMode ? "#FFFFFF" : "#000000" }}
                tickCount={6}
                allowDecimals={false}
              />
              <RadialBar
                minAngle={15}
                background
                clockWise={true}
                dataKey="Stock"
                fill="#8884d8"
                name="Stock"
              />
              <RadialBar
                minAngle={15}
                background
                clockWise={true}
                dataKey="New"
                fill="#a4de6c"
                name="New"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                wrapperStyle={style}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div> */}
      </div>

      {/* Button Row - Always visible */}
      <div
        className={`btn-row fixed top-20 ml-5 flex flex-col gap-4 ${
          isConfigOpen ? "opacity-100" : "hidden"
        } transition-opacity duration-300 overflow-y-auto h-[80vh]`}
      >
        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(true);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          Bonnet
        </button>

        {/* Grill Bumper */}
        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(true);
            setBumperBackClick(false);
            setGrillClick(true);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          Front Bumper
        </button>

        {/* Wheel Rim */}
        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(true);
            setWindowClick(false);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(true);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          Tyres
        </button>

        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(true);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          Spoiler
        </button>

        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(true);
            setInteriorClick(false);
          }}
        >
          Trunk
        </button>

        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(true);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          SideKit
        </button>

        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(true);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          Roof
        </button>
        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(true);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(true);
            setRoofClick(false);
            setSilencerClick(true);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          Back Bumper
        </button>

        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(true);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          Fender
        </button>

        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(true);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          Door
        </button>

        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            if (bonnet === 1 && engine !== 2) {
              setBonnet(0);
            } else setBonnet(1);
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(true);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(true);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          Engine
        </button>

        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(true);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(false);
          }}
        >
          Window
        </button>
        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            setSpoilerClick(false);
            setRimClick(false);
            setWindowClick(false);
            setBonnetClick(false);
            setLightClick(false);
            setCarBodyClick(false);
            setDoorClick(false);
            setSideKitClick(false);
            setWheelsClick(false);
            setBumperFrontClick(false);
            setBumperBackClick(false);
            setGrillClick(false);
            setEngineClick(false);
            setFenderClick(false);
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
            setInteriorClick(true);
          }}
        >
          Interior
        </button>
      </div>
      {/* Radial Chart - Positioned next to button row */}
      <div className="fixed top-28 left-[220px] w-[320px] h-[300px] rounded-lg p-4">
        {/* Improved Toggle Button - Moved to top */}
        <div className="absolute -top-11 left-3 w-full flex justify-start">
          <button
            onClick={() => setShowRadialChart(!showRadialChart)}
            className={`
        flex items-center gap-2 px-3 py-2 rounded-lg
        transition-all duration-300 ease-in-out
        ${
          showRadialChart
            ? "bg-gray-800/80 hover:bg-gray-700/80"
            : "bg-indigo-600/80 hover:bg-indigo-500/80"
        }
        text-white font-medium text-sm
        hover:shadow-lg transform hover:-translate-y-0.5
        backdrop-blur-sm
      `}
          >
            <span className="w-5">
              {showRadialChart ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
            <span className="whitespace-nowrap">
              {showRadialChart ? "Hide Overview" : "Show Overview"}
            </span>
          </button>
        </div>

        <div
          className={`transition-all duration-300 ${
            showRadialChart
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="text-white text-xl mb-2">Performance Overview</div>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart
              innerRadius="30%"
              outerRadius="90%"
              data={data}
              startAngle={180}
              endAngle={0}
              barGap={2}
              barCategoryGap={3}
            >
              <PolarAngleAxis
                type="number"
                domain={getRadialDomain()}
                tick={{
                  fill: isDarkMode ? "#FFFFFF" : "#000000",
                  fontSize: 12,
                }}
              />
              <RadialBar
                minAngle={15}
                background
                clockWise={true}
                dataKey="Stock"
                fill="#8884d8"
              />
              <RadialBar
                minAngle={15}
                background
                clockWise={true}
                dataKey="New"
                fill="#82ca9d"
              />
              <Tooltip content={<CustomTooltip />} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Configuration Panels - Conditionally visible */}
      {isConfigOpen && !isViewMode && (
        <div className="absolute right-6 bottom-[5vh] w-[380px] flex flex-col gap-2">
          {/* Spoiler Customization */}
          {spoilerClick && (
            <>
              {/* Spoiler Type Section */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Spoilers
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      spoiler === 0 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setSpoiler(0);
                      updateMetrics({
                        dC: bodyData.dC + 0.02,
                        kW: bodyData.kW - 15,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        spoiler === 0 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      No Spoiler
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      spoiler === 1 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setSpoiler(1);
                      updateMetrics({
                        dC: bodyData.dC - 0.02,
                        kW: bodyData.kW + 15,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        spoiler === 1 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Base Spoiler
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      spoiler === 2 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setSpoiler(2);
                      updateMetrics({
                        dC: bodyData.dC - 0.02,
                        kW: bodyData.kW + 17,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        spoiler === 2 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Sporty Spoiler
                    </div>
                  </div>
                </div>
                <div className="text-white text-center font-bold text-sm capitalize">
                  The Swift Spoiler makes the car aerodynamic and gives it a
                  sporty look.
                </div>
              </div>

              {/* Spoiler Color Section */}
              {spoiler !== 0 && (
                <div className="configurator__section">
                  <div className="uppercase font-bold text-white font-poppins">
                    Spoiler Color
                  </div>
                  <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                    {spoilerColors.map((item, index) => (
                      <div
                        key={index}
                        className={`item flex flex-col items-center transition-all duration-400 ${
                          item.color === spoilerColor.color
                            ? "item--active"
                            : ""
                        }`}
                        onClick={() => setSpoilerColor(item)}
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2"
                          style={{ backgroundColor: item.color }}
                        />
                        <div
                          className={`text-center font-bold text-sm capitalize ${
                            item.color === spoilerColor.color
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Interior Customization */}
          {interiorClick && (
            <>
              {/* Spoiler Color Section */}

              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Interior Color
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  {interiorColors.map((item, index) => (
                    <div
                      key={index}
                      className={`item flex flex-col items-center transition-all duration-400 ${
                        item.color === interiorColor.color ? "item--active" : ""
                      }`}
                      onClick={() => setInteriorColor(item)}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <div
                        className={`text-center font-bold text-sm capitalize ${
                          item.color === interiorColor.color
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Bonnet Customization */}
          {bonnetClick && (
            <>
              {/* Bonnet Type Section */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Bonnets
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  {engine !== 2 && (
                    <div
                      className={`item flex flex-col items-center transition-all duration-400 ${
                        bonnet === 0 ? "item--active" : ""
                      }`}
                      onClick={() => {
                        setEngineClick(true);
                        if (bonnet === 1) {
                          setBonnet(0);
                        }
                      }}
                    >
                      <div
                        className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                          bonnet === 0 ? "text-white" : "text-gray-400"
                        }`}
                      >
                        Open Bonnet
                      </div>
                    </div>
                  )}

                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      bonnet === 1 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setEngineClick(false);
                      setBonnet(1);
                      updateMetrics({
                        ...bodyData,
                        kW: bodyData.kW + 5,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        bonnet === 1 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Original Bonnet
                    </div>
                  </div>
                </div>
              </div>

              {/* Bonnet Color Section */}
              {bonnet !== 3 && bonnet !== 4 && (
                <div className="configurator__section">
                  <div className="uppercase font-bold text-white font-poppins">
                    Bonnet Color
                  </div>
                  <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                    {bonnetColors.map((item, index) => (
                      <div
                        key={index}
                        className={`item flex flex-col items-center transition-all duration-400 ${
                          item.color === bonnetColor.color ? "item--active" : ""
                        }`}
                        onClick={() => setBonnetColor(item)}
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2"
                          style={{ backgroundColor: item.color }}
                        />
                        <div
                          className={`text-center font-bold text-sm capitalize ${
                            item.color === bonnetColor.color
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Engine Customization */}
          {engineClick && (
            <>
              {/* Engine Type Section */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Engines
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      engine === 1 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setEngine(1);
                      updateMetrics({
                        ...bodyData,
                        p: 280, // Power from engine.power.value
                        kW: 1292.5, // Weight from engine.kerbWeight.value
                        dC: 0.346, // Drag coefficient from dimensions.dragCoefficient.value
                        w: 1805, // Width from dimensions.width.value
                        h: 1455, // Height from dimensions.height.value
                        t: 390, // Torque from engine.torque.value
                        r: 3250, // RPM from engine.torque.rpm
                        nOC: 3, // Number of cylinders from engine.numberOfCylinders
                        bD: 87.5, // Bore diameter from engine.bore.value
                        pS: 89.7, // Piston stroke from engine.stroke.value
                        brpm: 6500, // RPM at max power from engine.power.rpm
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        engine === 1 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Stock Engine
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      engine === 2 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setEngine(2);
                      setBonnet(1);
                      updateMetrics({
                        ...bodyData,
                        p: 390,
                        t: 490,
                        r: 3300,
                        nOC: 6,
                        bD: 90,
                        pS: 90.9,
                        brpm: 8000,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        engine === 2 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Turbo (V6 Back)
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Wheel Customization */}
          {(rimClick || wheelsClick) && (
            <>
              {/* Wheel Type Section */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Wheel Selection
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      wheels === 1 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setWheels(1);
                      setRim(1);
                      updateMetrics({
                        ...bodyData,
                        kW: bodyData.kW - 10,
                        dC: bodyData.dC + 0.01,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        wheels === 1 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Stock
                    </div>
                  </div>

                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      wheels === 2 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setWheels(2);
                      setRim(2);
                      updateMetrics({
                        ...bodyData,
                        kW: bodyData.kW + 5,
                        dC: bodyData.dC - 0.005,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        wheels === 2 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Sport
                    </div>
                  </div>
                </div>
              </div>

              {/* Rim Color Selection */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Rim Color
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  {rimColors.map((item, index) => (
                    <div
                      key={index}
                      className={`item flex flex-col items-center transition-all duration-400 ${
                        item.color === rimColor.color ? "item--active" : ""
                      }`}
                      onClick={() => setRimColor(item)}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <div
                        className={`text-center font-bold text-sm text-gray-400 capitalize ${
                          item.color === rimColor.color ? "text-white" : ""
                        }`}
                      >
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* SideKit Customization */}
          {sideKitClick && (
            <>
              {/* Splitter Section */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Splitter
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      [3, 4, 5].includes(sideKit) ? "item--active" : ""
                    }`}
                    onClick={() => {
                      if (sideKit === 0) setSideKit(3);
                      else if (sideKit === 1) setSideKit(4);
                      else if (sideKit === 2) setSideKit(5);
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        [3, 4, 5].includes(sideKit)
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Add Splitter
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      ![3, 4, 5].includes(sideKit) ? "item--active" : ""
                    }`}
                    onClick={() => {
                      if (sideKit === 3) setSideKit(0);
                      else if (sideKit === 4) setSideKit(1);
                      else if (sideKit === 5) setSideKit(2);
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        ![3, 4, 5].includes(sideKit)
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Remove Splitter
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidekit Type Section */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  SideKits
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      [0, 3].includes(sideKit) ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setSideKit(sideKit === 3 ? 3 : 0);
                      updateMetrics({
                        ...bodyData,
                        dC: bodyData.dC + 0.01,
                        kW: bodyData.kW - 5,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        [0, 3].includes(sideKit)
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Remove Kit
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      [1, 4].includes(sideKit) ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setSideKit(sideKit === 4 ? 4 : 1);
                      updateMetrics({
                        ...bodyData,
                        dC: bodyData.dC - 0.01,
                        kW: bodyData.kW + 5,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        [1, 4].includes(sideKit)
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Sidekit
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      [2, 5].includes(sideKit) ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setSideKit(sideKit === 5 ? 5 : 2);
                      updateMetrics({
                        ...bodyData,
                        dC: bodyData.dC - 0.01,
                        kW: bodyData.kW + 8,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        [2, 5].includes(sideKit)
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Widekit
                    </div>
                  </div>
                </div>
                <div className="text-white text-center font-bold text-sm capitalize">
                  A Side kit is a great option for a sporty look addition to
                  your Car.
                </div>
              </div>

              {/* Kit Color Section */}
              {sideKit !== 0 && (
                <div className="configurator__section">
                  <div className="uppercase font-bold text-white font-poppins">
                    Kit Color
                  </div>
                  <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                    {sideKitColors.map((item, index) => (
                      <div
                        key={index}
                        className={`item flex flex-col items-center transition-all duration-400 ${
                          item.color === sideKitColor.color
                            ? "item--active"
                            : ""
                        }`}
                        onClick={() => setSideKitColor(item)}
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2"
                          style={{ backgroundColor: item.color }}
                        />
                        <div
                          className={`text-center font-bold text-sm capitalize ${
                            item.color === sideKitColor.color
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Door Customization */}
          {doorClick && (
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Door Color
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {doorColors.map((item, index) => (
                  <div
                    key={index}
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      item.color === doorColor.color ? "item--active" : ""
                    }`}
                    onClick={() => setDoorColor(item)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === doorColor.color ? "text-white" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                <div
                  className={`item flex flex-col items-center transition-all duration-400 ${
                    door === 0 ? "item--active" : ""
                  }`}
                  onClick={() => {
                    setDoor(0);
                    updateMetrics({
                      ...bodyData,
                      dC: bodyData.dC + 0.02,
                      kW: bodyData.kW - 5,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      door === 0 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    Closed Doors
                  </div>
                </div>
                <div
                  className={`item flex flex-col items-center transition-all duration-400 ${
                    door === 1 ? "item--active" : ""
                  }`}
                  onClick={() => {
                    setDoor(1);
                    updateMetrics({
                      ...bodyData,
                      dC: bodyData.dC - 0.01,
                      kW: bodyData.kW + 5,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      door === 1 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    Open Doors
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* bumperBack Customization */}

          {bumperBackClick &&
            (engine !== 2 ? (
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Back Bumper Color
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  {bumperBackColors.map((item, index) => (
                    <div
                      key={index}
                      className={`item flex flex-col items-center transition-all duration-400 ${
                        item.color === bumperBackColor.color
                          ? "item--active"
                          : ""
                      }`}
                      onClick={() => setBumperBackColor(item)}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <div
                        className={`text-center font-bold text-sm text-gray-400 capitalize ${
                          item.color === bumperBackColor.color
                            ? "text-white"
                            : ""
                        }`}
                      >
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="font-bold text-white font-poppins">
                Please Select Stock Engine to Customize Back Bumper
              </div>
            ))}

          {/* Trunk Customization */}
          {trunkClick && (
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Trunk Color
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {trunkColors.map((item, index) => (
                  <div
                    key={index}
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      item.color === trunkColor.color ? "item--active" : ""
                    }`}
                    onClick={() => setTrunkColor(item)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === trunkColor.color ? "text-white" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Roof Customization */}
          {roofClick && (
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Roof Color
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {roofColors.map((item, index) => (
                  <div
                    key={index}
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      item.color === roofColor.color ? "item--active" : ""
                    }`}
                    onClick={() => setRoofColor(item)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === roofColor.color ? "text-white" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grill Customization */}
          {grillClick && (
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Grill & Emblem Color
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {grillColors.map((item, index) => (
                  <div
                    key={index}
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      item.color === grillColor.color ? "item--active" : ""
                    }`}
                    onClick={() => setGrillColor(item)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === grillColor.color ? "text-white" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Front Customization */}
          {bumperFrontClick && (
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Front bumper Color
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {bumperFrontColors.map((item, index) => (
                  <div
                    key={index}
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      item.color === bumperFrontColor.color
                        ? "item--active"
                        : ""
                    }`}
                    onClick={() => setBumperFrontColor(item)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === bumperFrontColor.color
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fender Customization */}
          {fenderClick && (
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Fender Color
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {fenderColors.map((item, index) => (
                  <div
                    key={index}
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      item.color === fenderColor.color ? "item--active" : ""
                    }`}
                    onClick={() => setFenderColor(item)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === fenderColor.color ? "text-white" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Window Customization */}
          {windowClick && (
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Window Color
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {windowColors.map((item, index) => (
                  <div
                    key={index}
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      item.color === windowColor.color ? "item--active" : ""
                    }`}
                    onClick={() => setWindowColor(item)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === windowColor.color ? "text-white" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
                <div className="text-white text-center font-bold text-sm capitalize">
                  While Tints Aren't legal, they add a level of privacy to the
                  car.
                </div>
              </div>
            </div>
          )}

          {/* Light Customization */}
          {/* {lightClick && (
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Light Color
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {lightColors.map((item, index) => (
                  <div
                    key={index}
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      item.color === lightColor.color ? "item--active" : ""
                    }`}
                    onClick={() => setLightColor(item)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === lightColor.color ? "text-white" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Body Customization */}
          {carBodyClick && ( // Make sure bodyColorClick is defined in the context
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Body Color
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {bodyColors.map((item, index) => (
                  <div
                    key={index}
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      item.color === carBodyColor.color ? "item--active" : ""
                    }`}
                    onClick={() => setCarBodyColor(item)} // Ensure setBodyColor is defined in context
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === carBodyColor.color ? "text-white" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Configurator;
