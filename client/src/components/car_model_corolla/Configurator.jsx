import { useCustomization } from "@contexts/Customization";
import { useAuth } from "@contexts/auth_context";
import React, { useState, useEffect } from "react";
import { toast, Slide } from 'react-toastify';
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

const Configurator = () => {
  const { user } = useAuth();
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
    p: 132, // Power in horsepower
    kW: 1355, // Kerb weight in kg
    dC: 0.282, // Drag coefficient
    w: 1780, // Width in mm
    h: 1435, // Height in mm
    t: 159, // Torque in Nm
    r: 4200, // RPM for torque
    nOC: 4, // Number of cylinders
    bD: 80.5, // Bore diameter in mm
    pS: 78.5, // Piston stroke in mm
    brpm: 6400, // RPM at max power
  });

  const [metrics, setMetrics] = useState({
    stockAcceleration: 5.39,
    newAcceleration: 0,
    stockMaxSpeed: 216,
    newMaxSpeed: 0,
    stockHorsepower: 93,
    newHorsepower: 0,
    stockCC: 1598,
    newCC: 0,
    stockTorque: 146.87,
    newTorque: 0,
  });

  const [isConfigOpen, setIsConfigOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [configName, setConfigName] = useState("");

  const updateMetrics = async (changes) => {
    try {
      const updatedBodyData = {
        ...bodyData,
        ...changes,
      };

      setBodyData(updatedBodyData);

      console.log("Updated body data:", updatedBodyData);

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
        console.log("New metrics:", newMetrics);
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
        alert('Please login to save your configuration');
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
            torque: metrics.newTorque
          }
        },
        customization: {
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
          silencer
        }
      };

      const token = Cookies.get('token');
      const response = await axios.post('/car-configs', configData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Configuration saved:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to save configuration:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      if (!user) {
        toast.error('Please login to save your configuration', {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Slide
        });
        return;
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to save configuration:', error);
      toast.error('Failed to save configuration: ' + error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Slide
      });
    }
  };

  const handleModalSave = async () => {
    try {
      setIsSaving(true);
      
      if (!configName.trim()) {
        toast.error('Please enter a configuration name', {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Slide
        });
        return;
      }

      await saveConfiguration(configName);
      toast.success('Configuration saved successfully!', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Slide
      });
      setIsModalOpen(false);
      setConfigName("");
    } catch (error) {
      toast.error('Failed to save configuration: ' + error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Slide
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    // Implement share functionality
    toast.info('Share functionality coming soon!', {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Slide
    });
  };

  return (
    <>
      {/* Top Bar with Frosted Glass Effect */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/30 backdrop-blur-md z-50 flex justify-between items-center px-24 border-b border-white/10">
        <button
          onClick={() => setIsConfigOpen(!isConfigOpen)}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-medium"
        >
          {isConfigOpen ? 'Close' : 'Open'} Configurator
        </button>
        
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-blue-500/80 hover:bg-blue-500 transition-all duration-300 text-white font-medium disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
          
          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-lg bg-green-500/80 hover:bg-green-500 transition-all duration-300 text-white font-medium"
          >
            Share Configuration
          </button>
        </div>
      </div>

      {/* Save Configuration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 w-96 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Save Configuration</h2>
            <input
              type="text"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              placeholder="Enter configuration name"
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
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Graph Display - Always visible */}
      <div className="mt-20 backdrop-blur-md rounded-lg g-4 bg-white/10 flex flex-col justify-center items-center w-full container mx-auto px-4">
        <div className="text-white text-3xl mb-5">Performance Details</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid className="text-white" strokeDasharray="3 3" />
            <XAxis stroke="#FFFFFF" dataKey="name" className="text-white" />
            <YAxis
              stroke="#FFFFFF"
              className="text-white"
              domain={[0, (dataMax) => Math.max(dataMax, getMaxValue("Stock"))]}
            />
            <Tooltip />
            <Legend className="text-white" />
            <Bar dataKey="Stock" fill="#8884d8" />
            <Bar dataKey="New" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        {/* Line Chart */}
        <div className="mt-10 w-full">
          <div className="text-white text-2xl mb-3">Performance Trend</div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#FFFFFF" />
              <YAxis
                stroke="#FFFFFF"
                domain={[
                  0,
                  (dataMax) => Math.max(dataMax, getMaxValue("Stock")),
                ]}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Stock" stroke="#8884d8" />
              <Line type="monotone" dataKey="New" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radial Chart */}
        <div className="mt-10 w-full">
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
                tick={{ fill: "#FFFFFF" }}
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
        </div>
      </div>

      {/* Button Row - Always visible */}
      <div className={`btn-row fixed top-20 ml-5 flex flex-col gap-4 ${isConfigOpen ? 'opacity-100' : 'hidden'} transition-opacity duration-300 overflow-y-auto h-[80vh]`}>
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
          Rims
        </button>

        {/* Wheel */}
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
          Wheels
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
            if (bonnet === 2) {
              setBonnet(4);
            } else if (bonnet === 1) {
              setBonnet(3);
            }
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

      {/* Configuration Panels - Conditionally visible */}
      {isConfigOpen && (
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
                        kW: bodyData.kW - 5,
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
                        dC: bodyData.dC - 0.01,
                        kW: bodyData.kW + 5,
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
                        kW: bodyData.kW + 7,
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
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      spoiler === 3 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setSpoiler(3);
                      updateMetrics({
                        dC: bodyData.dC - 0.03,
                        kW: bodyData.kW + 10,
                      });
                    }}
                  ></div>
                </div>
                <div className="text-white text-center font-bold text-sm capitalize">
                  The Civic Spoiler makes the car aerodynamic and gives it a
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
                          item.color === spoilerColor.color ? "item--active" : ""
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
              {/* Spoiler Type Section */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Interior
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      interior === 0 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setInterior(0);
                      updateMetrics({
                        dC: bodyData.dC + 0.02,
                        kW: bodyData.kW - 5,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        interior === 0 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Base
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      interior === 1 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setInterior(1);
                      updateMetrics({
                        dC: bodyData.dC - 0.01,
                        kW: bodyData.kW + 5,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        interior === 1 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Sport
                    </div>
                  </div>
                </div>
                <div className="text-white text-center font-bold text-sm capitalize">
                  The Civic Interior is a one of kind and changing it gives an
                  amazing comfort boost.
                </div>
              </div>

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
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      bonnet === 0 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setEngineClick(true);
                      if (bonnet === 1) {
                        setBonnet(3);
                      } else setBonnet(4);
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        bonnet === 3 || bonnet === 4
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Open Bonnet
                    </div>
                  </div>
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
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      bonnet === 2 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setEngineClick(false);
                      setBonnet(2);
                      updateMetrics({
                        ...bodyData,
                        kW: bodyData.kW + 3,
                        dC: bodyData.dC - 0.01,
                        rpm: bodyData.rpm + 50,
                        brpm: bodyData.brpm + 50,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        bonnet === 2 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Modded Bonnet
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
                        p: 320,
                        t: 400,
                        r: 2500,
                        nOC: 4,
                        bD: 86,
                        pS: 85.9,
                        brpm: 6500,
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
                      updateMetrics({
                        ...bodyData,
                        p: 390,
                        t: 440,
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
                      2ZZ
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Wheel Customization */}
          {wheelsClick && (
            <>
              {/* WheelType Section */}
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

                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      wheels === 3 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setWheels(3);
                      updateMetrics({
                        ...bodyData,
                        kW: bodyData.kW + 10,
                        dC: bodyData.dC - 0.01,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        wheels === 3 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Performance
                    </div>
                  </div>

                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      wheels === 6 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setWheels(6);
                      updateMetrics({
                        ...bodyData,
                        kW: bodyData.kW + 15,
                        dC: bodyData.dC - 0.015,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        wheels === 6 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Offset
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Rim Customization */}
          {rimClick && (
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
              {wheels !== 6 && (
                <>
                  <div className="uppercase font-bold text-white font-poppins">
                    Rim Selection
                  </div>
                  <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                    {wheels === 1 || wheels === 2 ? (
                      <>
                        <div
                          className={`item flex flex-col items-center transition-all duration-400 ${
                            rim === 1 ? "item--active" : ""
                          }`}
                          onClick={() => {
                            if (rim === 0) {
                              setRim(1);
                            }
                            setRim(1);
                            updateMetrics({
                              ...bodyData,
                              kW: bodyData.kW + 10,
                              dC: bodyData.dC - 0.01,
                            });
                          }}
                        >
                          <div
                            className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                              rim === 1 ? "text-white" : "text-gray-400"
                            }`}
                          >
                            Rim 1
                          </div>
                        </div>
                        <div
                          className={`item flex flex-col items-center transition-all duration-400 ${
                            rim === 2 ? "item--active" : ""
                          }`}
                          onClick={() => {
                            if (rim === 0) {
                              setRim(1);
                            }
                            setRim(2);
                            updateMetrics({
                              ...bodyData,
                              kW: bodyData.kW + 15,
                              dC: bodyData.dC - 0.015,
                            });
                          }}
                        >
                          <div
                            className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                              rim === 2 ? "text-white" : "text-gray-400"
                            }`}
                          >
                            Rim 2
                          </div>
                        </div>
                        <div
                          className={`item flex flex-col items-center transition-all duration-400 ${
                            rim === 3 ? "item--active" : ""
                          }`}
                          onClick={() => {
                            if (rim === 0) {
                              setRim(1);
                            }
                            setRim(3);
                            updateMetrics({
                              ...bodyData,
                              kW: bodyData.kW + 20,
                              dC: bodyData.dC - 0.02,
                            });
                          }}
                        >
                          <div
                            className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                              rim === 3 ? "text-white" : "text-gray-400"
                            }`}
                          >
                            Rim 3
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`item flex flex-col items-center transition-all duration-400 ${
                            wheels === 3 ? "item--active" : ""
                          }`}
                          onClick={() => {
                            setRim(0);
                            setWheels(3);
                            updateMetrics({
                              ...bodyData,
                              kW: bodyData.kW + 10,
                              dC: bodyData.dC - 0.01,
                            });
                          }}
                        >
                          <div
                            className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                              wheels === 3 ? "text-white" : "text-gray-400"
                            }`}
                          >
                            Rim 1
                          </div>
                        </div>
                        <div
                          className={`item flex flex-col items-center transition-all duration-400 ${
                            wheels === 4 ? "item--active" : ""
                          }`}
                          onClick={() => {
                            setRim(0);
                            setWheels(4);
                            updateMetrics({
                              ...bodyData,
                              kW: bodyData.kW + 15,
                              dC: bodyData.dC - 0.015,
                            });
                          }}
                        >
                          <div
                            className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                              wheels === 4 ? "text-white" : "text-gray-400"
                            }`}
                          >
                            Rim 2
                          </div>
                        </div>
                        <div
                          className={`item flex flex-col items-center transition-all duration-400 ${
                            wheels === 5 ? "item--active" : ""
                          }`}
                          onClick={() => {
                            setRim(0);
                            setWheels(5);
                            updateMetrics({
                              ...bodyData,
                              kW: bodyData.kW + 20,
                              dC: bodyData.dC - 0.02,
                            });
                          }}
                        >
                          <div
                            className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                              wheels === 5 ? "text-white" : "text-gray-400"
                            }`}
                          >
                            Rim 3
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Diffuser Customization */}
          {diffuserClick && (
            <>
              {/* Diffuser Type Section */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Back Bumpers
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      diffuser === 0 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setDiffuser(0);
                      updateMetrics({
                        ...bodyData,
                        dC: bodyData.dC + 0.02,
                        kW: bodyData.kW - 5,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        diffuser === 0 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Stock
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      diffuser === 1 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setDiffuser(1);
                      if (silencer == 1) setSilencer(2);
                      updateMetrics({
                        ...bodyData,
                        dC: bodyData.dC - 0.01,
                        kW: bodyData.kW + 3,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        diffuser === 1 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Sport (Double)
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      diffuser === 2 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setDiffuser(2);
                      setSilencer(1);
                      updateMetrics({
                        ...bodyData,
                        dC: bodyData.dC - 0.015,
                        kW: bodyData.kW + 4,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        diffuser === 2 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Sport (Single)
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Silencer Selection Customization (Not done yet) */}
          {silencerClick && (
            <>
              {/* Silencer Type Section */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Silencers
                </div>

                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  {diffuser === 0 && (
                    <>
                      <div
                        className={`item flex flex-col items-center transition-all duration-400 ${
                          silencer === 1 ? "item--active" : ""
                        }`}
                        onClick={() => {
                          setSilencer(1);
                          updateMetrics({
                            ...bodyData,
                            dC: bodyData.dC + 0.01,
                            kW: bodyData.kW + 2,
                          });
                        }}
                      >
                        <div
                          className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                            silencer === 1 ? "text-white" : "text-gray-400"
                          }`}
                        >
                          Single
                        </div>
                      </div>

                      <div
                        className={`item flex flex-col items-center transition-all duration-400 ${
                          silencer === 2 ? "item--active" : ""
                        }`}
                        onClick={() => {
                          setSilencer(2);
                          updateMetrics({
                            ...bodyData,
                            dC: bodyData.dC + 0.005,
                            kW: bodyData.kW + 3,
                          });
                        }}
                      >
                        <div
                          className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                            silencer === 2 ? "text-white" : "text-gray-400"
                          }`}
                        >
                          Dual
                        </div>
                      </div>

                      <div
                        className={`item flex flex-col items-center transition-all duration-400 ${
                          silencer === 3 ? "item--active" : ""
                        }`}
                        onClick={() => {
                          setSilencer(3);
                          updateMetrics({
                            ...bodyData,
                            dC: bodyData.dC - 0.005,
                            kW: bodyData.kW + 1,
                          });
                        }}
                      >
                        <div
                          className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                            silencer === 3 ? "text-white" : "text-gray-400"
                          }`}
                        >
                          Quad
                        </div>
                      </div>
                    </>
                  )}

                  {diffuser === 1 && (
                    <>
                      <div
                        className={`item flex flex-col items-center transition-all duration-400 ${
                          silencer === 2 ? "item--active" : ""
                        }`}
                        onClick={() => {
                          setSilencer(2);
                          updateMetrics({
                            ...bodyData,
                            dC: bodyData.dC + 0.005,
                            kW: bodyData.kW + 3,
                          });
                        }}
                      >
                        <div
                          className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                            silencer === 2 ? "text-white" : "text-gray-400"
                          }`}
                        >
                          Dual
                        </div>
                      </div>

                      <div
                        className={`item flex flex-col items-center transition-all duration-400 ${
                          silencer === 3 ? "item--active" : ""
                        }`}
                        onClick={() => {
                          setSilencer(3);
                          updateMetrics({
                            ...bodyData,
                            dC: bodyData.dC - 0.005,
                            kW: bodyData.kW + 1,
                          });
                        }}
                      >
                        <div
                          className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                            silencer === 3 ? "text-white" : "text-gray-400"
                          }`}
                        >
                          Quad
                        </div>
                      </div>
                    </>
                  )}

                  {diffuser === 2 && (
                    <>
                      <div
                        className={`item flex flex-col items-center transition-all duration-400 ${
                          silencer === 1 ? "item--active" : ""
                        }`}
                        onClick={() => {
                          setSilencer(1);
                          updateMetrics({
                            ...bodyData,
                            dC: bodyData.dC + 0.01,
                            kW: bodyData.kW + 2,
                          });
                        }}
                      >
                        <div
                          className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                            silencer === 1 ? "text-white" : "text-gray-400"
                          }`}
                        >
                          Single
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* SideKit Customization */}
          {sideKitClick && (
            <>
              {/* Sidekit Type Section */}
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  SideKits
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      sideKit === 0 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setSideKit(0);
                      updateMetrics({
                        ...bodyData,
                        dC: bodyData.dC + 0.01,
                        kW: bodyData.kW - 5,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        sideKit === 0 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Remove Kit
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      sideKit === 1 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setSideKit(1);
                      updateMetrics({
                        ...bodyData,
                        dC: bodyData.dC - 0.01,
                        kW: bodyData.kW + 5,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        sideKit === 1 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Add Side Kit
                    </div>
                  </div>
                  <div
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      sideKit === 2 ? "item--active" : ""
                    }`}
                    onClick={() => {
                      setSideKit(2);
                      updateMetrics({
                        ...bodyData,
                        dC: bodyData.dC - 0.01,
                        kW: bodyData.kW + 8,
                      });
                    }}
                  >
                    <div
                      className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                        sideKit === 2 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Add Wide Kit
                    </div>
                  </div>
                </div>
                <div className="text-white text-center font-bold text-sm capitalize">
                  A Side kit is a great option for a sporty look addition to your
                  Car.
                </div>
              </div>

              {/* SideKit Color Section */}
              {sideKit !== 0 && (
                <div className="configurator__section">
                  <div className="uppercase font-bold text-white font-poppins">
                    Side Kit Color
                  </div>
                  <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                    {sideKitColors.map((item, index) => (
                      <div
                        key={index}
                        className={`item flex flex-col items-center transition-all duration-400 ${
                          item.color === sideKitColor.color ? "item--active" : ""
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
                <div
                  className={`item flex flex-col items-center transition-all duration-400 ${
                    door === 2 ? "item--active" : ""
                  }`}
                  onClick={() => {
                    setDoor(2);
                    updateMetrics({
                      ...bodyData,
                      dC: bodyData.dC - 0.02,
                      kW: bodyData.kW + 7,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      door === 2 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    Butterfly Doors
                  </div>
                </div>
                <div
                  className={`item flex flex-col items-center transition-all duration-400 ${
                    door === 3 ? "item--active" : ""
                  }`}
                  onClick={() => {
                    setDoor(3);
                    updateMetrics({
                      ...bodyData,
                      dC: bodyData.dC - 0.03,
                      kW: bodyData.kW + 10,
                    });
                  }}
                ></div>
              </div>
              <div className="text-white text-center font-bold text-sm capitalize">
                The Civic Spoiler makes the car aerodynamic and gives it a sporty
                look.
              </div>
            </div>
          )}

          {/* bumperBack Customization */}

          {bumperBackClick && (
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Back Bumper Color
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {bumperBackColors.map((item, index) => (
                  <div
                    key={index}
                    className={`item flex flex-col items-center transition-all duration-400 ${
                      item.color === bumperBackColor.color ? "item--active" : ""
                    }`}
                    onClick={() => setBumperBackColor(item)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === bumperBackColor.color ? "text-white" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                      item.color === bumperFrontColor.color ? "item--active" : ""
                    }`}
                    onClick={() => setBumperFrontColor(item)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className={`text-center font-bold text-sm text-gray-400 capitalize ${
                        item.color === bumperFrontColor.color ? "text-white" : ""
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
