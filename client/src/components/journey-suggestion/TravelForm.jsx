// src/components/TravelForm.js
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCar  } from 'react-icons/fa'; // Icons for input fields
import { FaCalendarDays } from "react-icons/fa6";
const TravelForm = ({ onSubmit }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [carName, setCarName] = useState('');
  const [travelDate, setTravelDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ startLocation, endLocation, carName, travelDate });
    setStartLocation("");
    setEndLocation("");
    setTravelDate("");
    setCarName("");
  };

  return (
    <div className="flex justify-center ">
      <div className="shadow-xl rounded-lg p-8 backdrop-blur-md bg-white/10">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Plan Your Journey
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Start Location */}
          <div className="relative flex items-center space-x-3">
            <FaMapMarkerAlt className="text-white/70" />
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              required
              className="w-full bg-transparent border-b-2 border-gray-400/70 outline-none text-white placeholder-gray-300 focus:border-purple-400 transition duration-300"
              placeholder="Start Location"
            />
          </div>

          {/* End Location */}
          <div className="relative flex items-center space-x-3">
            <FaMapMarkerAlt className="text-white/70" />
            <input
              type="text"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              required
              className="w-full bg-transparent border-b-2 border-gray-400/70 outline-none text-white placeholder-gray-300 focus:border-purple-400 transition duration-300"
              placeholder="End Location"
            />
          </div>

          {/* Car Name */}
          <div className="relative flex items-center space-x-3">
            <FaCar className="text-white/70" />
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              required
              className="w-full bg-transparent border-b-2 border-gray-400/70 outline-none text-white placeholder-gray-300 focus:border-purple-400 transition duration-300"
              placeholder="Car Name"
            />
          </div>

          {/* Travel Date */}
          <div className="relative flex items-center md:col-span-2 space-x-3 mt-4 md:mt-0">
            <FaCalendarDays className="text-white/70" />
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              required
              className="w-full bg-transparent border-b-2 border-gray-400/70 outline-none text-white placeholder-gray-300 focus:border-purple-400 transition duration-300"
            />
          </div>

          {/* Submit Button */}
          <div className="flex rounded-lg justify-end items-center mt-4 md:mt-0 md:col-span-1">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-900 glass text-white py-3 px-3  shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300"
            >
              Get Suggestions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelForm;
