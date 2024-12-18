import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Navigation,
} from "lucide-react";
import axiosInstance from "@services/axios";
import TravelForm from "@components/journey-suggestion/TravelForm";
import LocationRoutingMap from "@components/journey-suggestion/LocationRoutingMap";
import Suggestions from "@components/Suggestions";
import WeatherCard from "@components/journey-suggestion/WeatherCard";
import { useAuth } from "@contexts/auth_context";
import { toast } from "react-toastify";
const TravelPlanner = () => {
  // State management
  const { user, drawerState } = useAuth();
  const [travelData, setTravelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState({
    carEnhancements: "",
    terrainAnalysis: "",
    weatherConditions: "",
  });
  const [startLocationWeatherData, setStartLocationWeatherData] =
    useState(null);
  const [endLocationWeatherData, setEndLocationWeatherData] = useState(null);
  const [startLocationLatLong, setStartLocationLatLong] = useState([]);
  const [endLocationLatLong, setEndLocationLatLong] = useState([]);

  const handleTravelSubmit = async (formData) => {
    setIsLoading(true);

    // Reset previous suggestions and states
    setSuggestions({
      carEnhancements: "",
      terrainAnalysis: "",
      weatherConditions: "",
    });

    try {
      // Construct chat title
      const chatTitle = `${formData.startLocation} to ${formData.endLocation}`;

      // Parallel API calls for weather and location data using Promise.allSettled
      const [startWeatherRes, endWeatherRes, startLatLongRes, endLatLongRes] =
        await Promise.allSettled([
          // Weather for start location
          axiosInstance.post("/ai/weather", {
            location: formData.startLocation,
            date: formData.travelDate,
          }),
          // Weather for end location
          axiosInstance.post("/ai/weather", {
            location: formData.endLocation,
            date: formData.travelDate,
          }),
          // Latitude and longitude for start location
          axiosInstance.post("/location/get-lat-long", {
            location: formData.startLocation,
          }),
          // Latitude and longitude for end location
          axiosInstance.post("/location/get-lat-long", {
            location: formData.endLocation,
          }),
        ]);

      // Check and handle API call results
      let avgHumidity = null;
      let avgTemp = null;

      if (
        startWeatherRes.status === "fulfilled" &&
        endWeatherRes.status === "fulfilled"
      ) {
        const startWeather = startWeatherRes.value.data;
        const endWeather = endWeatherRes.value.data;

        // Calculate average humidity and temperature
        avgHumidity = (
          (startWeather.humidity + endWeather.humidity) /
          2
        ).toFixed(2);
        avgTemp = (
          (startWeather.temperature + endWeather.temperature) /
          2
        ).toFixed(2);

        setStartLocationWeatherData(startWeather);
        setEndLocationWeatherData(endWeather);
      } else {
        toast.error(
          "Failed to fetch weather data. Internet connection failed."
        );
      }

      if (startLatLongRes.status === "fulfilled") {
        setStartLocationLatLong([
          startLatLongRes.value.data.latitude,
          startLatLongRes.value.data.longitude,
        ]);
      } else {
        toast.error(
          "Failed to fetch coordinates for start location. Internet connection failed."
        );
      }

      if (endLatLongRes.status === "fulfilled") {
        setEndLocationLatLong([
          endLatLongRes.value.data.latitude,
          endLatLongRes.value.data.longitude,
        ]);
      } else {
        toast.error(
          "Failed to fetch coordinates for end location. Internet connection failed."
        );
      }

      // Call AI travel suggestions API after gathering weather and location data
      const suggestionsRes = await axiosInstance.post("/ai/get-response", {
        userId: user._id, // User ID
        chatTitle,
        startLocation: formData.startLocation,
        endLocation: formData.endLocation,
        carName: formData.carName,
        travelDate: formData.travelDate,
        avgHumidity: startLocationWeatherData.avghumidity, // Added average humidity
        avgTemp: startLocationWeatherData.avgtemp_c, // Added average temperature
      });

      if (suggestionsRes.status === 200) {
        const { carEnhancements, terrainAnalysis, weatherConditions } =
          suggestionsRes.data;

        setSuggestions({
          carEnhancements:
            carEnhancements || "No specific enhancements recommended.",
          terrainAnalysis:
            terrainAnalysis || "Standard terrain analysis unavailable.",
          weatherConditions:
            weatherConditions || "No specific weather warnings.",
        });
      } else {
        toast.error(
          "Failed to fetch AI travel suggestions. Internet connection failed."
        );
      }

      // Store travel details if all necessary APIs succeed
      setTravelData(formData);
    } catch (error) {
      console.error("Travel Planning Error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div
      className={
        drawerState
          ? "blur bg-blue-950 cursor-none"
          : "min-h-screen backdrop-blur-md bg-white/5 p-4"
      }
    >
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Smart Travel Planner
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Intelligent route planning, weather insights, and personalized
            travel recommendations
          </p>
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Travel Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TravelForm onSubmit={handleTravelSubmit} />
          </motion.div>

          {/* Map & Route Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
          >
            {travelData ? (
              <LocationRoutingMap
                location1={[startLocationLatLong[0], startLocationLatLong[1]]}
                location2={endLocationLatLong}
                locationNames={[
                  travelData.startLocation,
                  travelData.endLocation,
                ]}
                apiKey="5b3ce3597851110001cf6248ee0d932f7c1442dcb81f48b9b7a221fc"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <Navigation className="mr-2" /> Plan your journey
              </div>
            )}
          </motion.div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Suggestions and Weather Section */}
        {!isLoading && travelData && (
          <div className="mt-12 space-y-8">
            {/* Weather Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {startLocationWeatherData && (
                <WeatherCard
                  location={travelData.startLocation}
                  weatherData={startLocationWeatherData}
                />
              )}
              {endLocationWeatherData && (
                <WeatherCard
                  location={travelData.endLocation}
                  weatherData={endLocationWeatherData}
                />
              )}
            </div>

            {/* Travel Suggestions */}
            {suggestions.carEnhancements && (
              <Suggestions suggestions={suggestions} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPlanner;
