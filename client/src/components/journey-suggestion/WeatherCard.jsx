import React from "react";
import { FaTemperatureHigh, FaTemperatureLow, FaWind } from "react-icons/fa";
import { WiHumidity, WiCloud } from "react-icons/wi";

function WeatherCard({ location, weatherData }) {
  return (
    <div className="bg-gradient-to-br from-[#4975b2] to-black rounded-lg border-2 border-solid border-white shadow-lg p-6 w-full max-w-sm text-white border-opacity-40">
      <h3 className="text-2xl font-bold mb-4 text-center">{location}</h3>
      <p className="text-sm text-gray-200 text-center mb-6">
        {new Date(weatherData.date).toDateString()}
      </p>
      <div className="flex justify-center items-center mb-6">
        <WiCloud size={64} className="text-yellow-300" />
        <span className="text-xl font-semibold ml-2">
          {weatherData.condition}
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaTemperatureHigh size={24} className="text-red-400 mr-2" />
            <span>Max Temp:</span>
          </div>
          <span className="font-semibold">{weatherData.maxtemp_c}°C</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaTemperatureLow size={24} className="text-blue-400 mr-2" />
            <span>Min Temp:</span>
          </div>
          <span className="font-semibold">{weatherData.mintemp_c}°C</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <WiHumidity size={24} className="text-cyan-300 mr-2" />
            <span>Humidity:</span>
          </div>
          <span className="font-semibold">{weatherData.avghumidity}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaWind size={24} className="text-gray-200 mr-2" />
            <span>Max Wind:</span>
          </div>
          <span className="font-semibold">{weatherData.maxwind_kph} kph</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <WiCloud size={24} className="text-yellow-300 mr-2" />
            <span>Avg Temp:</span>
          </div>
          <span className="font-semibold">{weatherData.avgtemp_c}°C</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
