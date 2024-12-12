import React from "react";
import LocationDistanceMap from "./LocationDistanceMap";
import LocationRoutingMap from "./LocationRoutingMap";
function DummyPage() {
  const location1 = [51.5074, -0.1278]; // London
  const location2 = [48.8566, 2.3522]; // Paris
  const api = import.meta.env.VITE_API_URL;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Location Distance Visualizer
          </h1>
          <p className="text-blue-100">
            Explore the distance between two points on the map
          </p>
        </div>
        <div className="p-6">
          {/* <LocationDistanceMap
            location1={location1}
            location2={location2}
            locationNames={["London", "Paris"]}
          /> */}
          <LocationRoutingMap
            location1={location1}
            location2={location2}
            locationNames={["London", "Paris"]}
            apiKey="5b3ce3597851110001cf6248ee0d932f7c1442dcb81f48b9b7a221fc"
          />
        </div>
      </div>
    </div>
  );
}

export default DummyPage;
