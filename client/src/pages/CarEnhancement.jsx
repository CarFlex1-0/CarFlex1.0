import React, { useEffect, useState } from "react";
import Sidebar from "@components/Sidebar";
import TravelForm from "@components/TravelForm";
import Suggestions from "@components/Suggestions";
import axios from "@services/axios";
import { useAuth } from "@contexts/auth_context";
import { BackgroundBeams } from "@ui/background-beams";

const CarEnhancements = () => {
  const [history, setHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [suggestions, setSuggestions] = useState({
    carEnhancements: "",
    terrainAnalysis: "",
    weatherConditions: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (user) {
          const response = await axios.post("ai/chat-history", {
            userId: user._id,
          });
          setHistory(response.data);
        }
      } catch (error) {
        console.log("Error fetching history");
      }
    };
    fetchHistory();
  }, [user]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setSuggestions({
      carEnhancements: "",
      terrainAnalysis: "",
      weatherConditions: "",
    });
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      
      const chatTitle = `${formData.startLocation} to ${formData.endLocation}`;
      const response = await axios.post("ai/get-response", {
        userId: user._id,
        chatTitle,
        startLocation: formData.startLocation,
        endLocation: formData.endLocation,
        carName:formData.carName,
        travelDate: formData.travelDate,
      });
      const { carEnhancements, terrainAnalysis, weatherConditions, chat } = response.data;

      setSuggestions({
        carEnhancements: carEnhancements || "",
        terrainAnalysis: terrainAnalysis || "",
        weatherConditions: weatherConditions || "",
      });

      setHistory((prevHistory) => [chat, ...prevHistory]);
      
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BackgroundBeams className="absolute inset-0 pointer-events-none z-0" />
      <div className="flex h-screen bg-gray-700">
        <Sidebar
          key={history.length}
          history={history}
          onSelectChat={handleSelectChat}
        />
        <div className="flex-1 p-6 overflow-y-auto">
          <TravelForm onSubmit={handleFormSubmit} />

          {isLoading ? (
            <div className="mt-6 flex justify-center items-center">
              <span className="loading loading-dots loading-sm me-4 bg-gradient-to-r from-gray-400 to-gray-600"></span>
              <span className="loading loading-dots loading-md me-4 bg-gradient-to-r from-gray-400 to-gray-600"></span>
              <span className="loading loading-dots loading-lg me-4 bg-gradient-to-r from-gray-400 to-gray-600"></span>
            </div>
          ) : suggestions.carEnhancements ? (
            <Suggestions suggestions={suggestions} />
          ) : (
            selectedChat && (
              <div className="mt-6 p-4 bg-slate-800 text-slate-200 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">
                  {selectedChat.title}
                </h2>
                <p className="text-md mb-4 overflow-wrap break-word">
                  <strong>Asked:</strong>{" "}
                  {selectedChat.prompt
                    .replace(
                      /Respond \*\*ONLY STRICTLY\*\* in the following JSON format: \{"carEnhancements": "Comprehensive recommendations for mechanical upgrades or checks", "terrainAnalysis": "In-depth analysis of terrain, traffic routes, total distance in km and miles ,and potential driving challenges", "weatherConditions": "Detailed summary of expected weather and its effects on vehicle and driver health"\} with no extra text outside of the JSON format\./,
                      ""
                    )
                    .trim()}
                </p>
                <p className="text-md text-slate-300 bg-slate-900 p-4 rounded-md mb-4 overflow-x-auto whitespace-pre-wrap">
                  <strong>Car Enhancements:</strong>{" "}
                  {selectedChat.response?.carEnhancements || "N/A"}
                  <br />
                  <strong>Terrain Analysis:</strong>{" "}
                  {selectedChat.response?.terrainAnalysis || "N/A"}
                  <br />
                  <strong>Weather Conditions:</strong>{" "}
                  {selectedChat.response?.weatherConditions || "N/A"}
                </p>
                <p className="text-md">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedChat.createdAt).toLocaleDateString()}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default CarEnhancements;


