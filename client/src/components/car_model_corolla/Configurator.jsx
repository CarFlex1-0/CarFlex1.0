import { useCustomization } from "@contexts/Customization";
import React, { useState, useEffect } from "react";
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

const Configurator = () => {
  const {
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
    p: 320, // Power in horsepower
    kW: 1400, // Kerb weight in kg
    dC: 0.27, // Drag coefficient
    w: 1877, // Width in mm
    h: 1434, // Height in mm
    t: 400, // Torque in Nm
    r: 2500, // RPM for HP
    nOC: 4, // Number of cylinders
    bD: 86, // Bore diameter in mm
    pS: 85.9, // Piston stroke in mm
    brpm: 6500, // RPM at max power
  });

  const [metrics, setMetrics] = useState({
    stockAcceleration: 3.48,
    newAcceleration: 0,
    stockMaxSpeed: 290.52,
    newMaxSpeed: 0,
    stockHorsepower: 140.43,
    newHorsepower: 0,
    stockCC: 1995.91,
    newCC: 0,
    stockTorque: 350.56,
    newTorque: 0,
  });

  const updateMetrics = async (bodyData) => {
    try {
      console.log("Body data:", bodyData);
      const responses = await Promise.all([
        axios.post("metric01", { bodyData }),
        axios.post("metric02", { bodyData }),
        axios.post("metric03", { bodyData }),
        axios.post("metric04", { bodyData }),
        axios.post("metric05", { bodyData }),
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

  return (
    <>
      {/* Graph Display */}
      <div className="mt-5 backdrop-blur-md rounded-lg g-4 bg-white/10 flex flex-col justify-center items-center w-full container mx-auto px-4">
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

      {/* Button Row */}
      <div className="btn-row fixed top-20 ml-5 flex flex-col gap-4 opacity-0 transition-opacity duration-300 hover:opacity-100 overflow-y-auto h-[80vh]">
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
            setDiffuserClick(true);
            setRoofClick(false);
            setSilencerClick(true);
            setTrunkClick(false);
          }}
        >
          Diffuser & Silencer
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
            setDiffuserClick(false);
            setRoofClick(false);
            setSilencerClick(false);
            setTrunkClick(false);
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
          }}
        >
          Window
        </button>
      </div>

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
                      ...bodyData,
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
                      ...bodyData,
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
                      ...bodyData,
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
                      ...bodyData,
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
                Wheel Offset
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                <div
                  className={`item flex flex-col items-center transition-all duration-400 ${
                    wheels === 0 ? "item--active" : ""
                  }`}
                  onClick={() => {
                    setWheels(0);
                    updateMetrics({
                      ...bodyData,
                      kW: bodyData.kW - 10,
                      dC: bodyData.dC + 0.01,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      wheels === 0 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    Stock Wheels
                  </div>
                </div>

                <div
                  className={`item flex flex-col items-center transition-all duration-400 ${
                    wheels === 1 ? "item--active" : ""
                  }`}
                  onClick={() => {
                    setWheels(1);
                    updateMetrics({
                      ...bodyData,
                      kW: bodyData.kW + 5,
                      dC: bodyData.dC - 0.005,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      wheels === 1 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    5 degree Offset
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
                      kW: bodyData.kW + 10,
                      dC: bodyData.dC - 0.01,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      wheels === 2 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    10 degree Offset
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
                      kW: bodyData.kW + 15,
                      dC: bodyData.dC - 0.015,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      wheels === 3 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    15 degree Offset
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Diffuser Customization */}
        {diffuserClick && (
          <>
            {/* Diffuser Type Section */}
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                Diffusers
              </div>
              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                <div
                  className={`item flex flex-col items-center transition-all duration-400 ${
                    diffuser === 3 ? "item--active" : ""
                  }`}
                  onClick={() => {
                    setDiffuser(3);
                    if (silencer === 2) {
                      setSilencer(1);
                    } else if (silencer === 4) {
                      setSilencer(3);
                    }
                    updateMetrics({
                      ...bodyData,
                      dC: bodyData.dC + 0.02,
                      kW: bodyData.kW - 5,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      diffuser === 3 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    No Diffuser
                  </div>
                </div>
                <div
                  className={`item flex flex-col items-center transition-all duration-400 ${
                    diffuser === 0 ? "item--active" : ""
                  }`}
                  onClick={() => {
                    setDiffuser(0);
                    if (silencer === 2) {
                      setSilencer(1);
                    } else if (silencer === 4) {
                      setSilencer(3);
                    }
                    updateMetrics({
                      ...bodyData,
                      dC: bodyData.dC - 0.01,
                      kW: bodyData.kW + 3,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      diffuser === 0 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    Diffuser 01
                  </div>
                </div>
                <div
                  className={`item flex flex-col items-center transition-all duration-400 ${
                    diffuser === 1 ? "item--active" : ""
                  }`}
                  onClick={() => {
                    setDiffuser(1);
                    if (silencer === 2) {
                      setSilencer(1);
                    } else if (silencer === 4) {
                      setSilencer(3);
                    }
                    updateMetrics({
                      ...bodyData,
                      dC: bodyData.dC - 0.015,
                      kW: bodyData.kW + 4,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      diffuser === 1 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    Diffuser 02
                  </div>
                </div>
                <div
                  className={`item flex flex-col items-center transition-all duration-400 ${
                    diffuser === 2 ? "item--active" : ""
                  }`}
                  onClick={() => {
                    setDiffuser(2);
                    if (silencer === 1) {
                      setSilencer(2);
                    } else if (silencer === 3) {
                      setSilencer(4);
                    }
                    updateMetrics({
                      ...bodyData,
                      dC: bodyData.dC - 0.02,
                      kW: bodyData.kW + 5,
                    });
                  }}
                >
                  <div
                    className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                      diffuser === 2 ? "text-white" : "text-gray-400"
                    }`}
                  >
                    Diffuser 03
                  </div>
                </div>
              </div>
            </div>

            {/* Diffuser Color Section */}
            {diffuser !== 3 && (
              <div className="configurator__section">
                <div className="uppercase font-bold text-white font-poppins">
                  Diffuser Color
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                  {diffuserColors.map((item, index) => (
                    <div
                      key={index}
                      className={`item flex flex-col items-center transition-all duration-400 ${
                        item.color === diffuserColor.color ? "item--active" : ""
                      }`}
                      onClick={() => setDiffuserColor(item)}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <div
                        className={`text-center font-bold text-sm capitalize ${
                          item.color === diffuserColor.color
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

        {/* Silencer Selection Customization (Not done yet) */}
        {silencerClick && (
          <>
            {/* Silencer Type Section */}
            <div className="configurator__section">
              <div className="uppercase font-bold text-white font-poppins">
                {diffuser === 3 || diffuser === 0 || diffuser === 1
                  ? "Silencers"
                  : "Lowered Silencers"}
              </div>

              <div className="flex flex-row gap-8 items-center flex-wrap py-4">
                {(diffuser === 3 || diffuser === 0 || diffuser === 1) && (
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
                        Silencer Triple
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
                        Silencer Single
                      </div>
                    </div>
                  </>
                )}

                {diffuser === 2 && (
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
                        Triple Silencer
                      </div>
                    </div>

                    <div
                      className={`item flex flex-col items-center transition-all duration-400 ${
                        silencer === 4 ? "item--active" : ""
                      }`}
                      onClick={() => {
                        setSilencer(4);
                        updateMetrics({
                          ...bodyData,
                          dC: bodyData.dC - 0.01,
                          kW: bodyData.kW + 2,
                        });
                      }}
                    >
                      <div
                        className={`text-center font-bold text-sm capitalize hover:cursor-pointer ${
                          silencer === 4 ? "text-white" : "text-gray-400"
                        }`}
                      >
                        Ring Silencer
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
                    Remove Side Kit
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
              Grill Color
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
    </>
  );
};

export default Configurator;
