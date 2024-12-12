import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const LocationRoutingMap = ({
  location1,
  location2,
  locationNames = ["London", "Paris"],
  apiKey,
}) => {
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        // Fetch Routing Data
        const routeResponse = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${location1[1]},${location1[0]}&end=${location2[1]},${location2[0]}`
        );

        if (!routeResponse.ok) {
          throw new Error("Failed to fetch route");
        }

        const routeData = await routeResponse.json();

        if (routeData.features && routeData.features.length > 0) {
          const coordinates = routeData.features[0].geometry.coordinates.map(
            (coord) => [coord[1], coord[0]] // Swap longitude and latitude
          );
          setRouteCoordinates(coordinates);

          // Extract route details
          const routeInfo = routeData.features[0].properties;
          setRouteDetails({
            distance: (routeInfo.segments[0].distance / 1000).toFixed(2), // Convert to km
            duration: (routeInfo.segments[0].duration / 3600).toFixed(2), // Convert to hours
          });
        }
      } catch (err) {
        setError(err.message);
        console.error("Routing error:", err);
      }
    };

    fetchRoute();
  }, [location1, location2, apiKey]);

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-lg">
        Error loading route: {error}
        <p>Note: You need a valid OpenRouteService API key to fetch routes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-100">
        <MapContainer
          center={[
            (location1[0] + location2[0]) / 2,
            (location1[1] + location2[1]) / 2,
          ]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          className="z-10"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Start Marker */}
          <Marker position={location1}>
            <Popup>{locationNames[0]}</Popup>
          </Marker>

          {/* End Marker */}
          <Marker position={location2}>
            <Popup>{locationNames[1]}</Popup>
          </Marker>

          {/* Route Line */}
          {routeCoordinates && (
            <Polyline
              positions={routeCoordinates}
              color="blue"
              weight={5}
              opacity={0.7}
            />
          )}
        </MapContainer>

        {/* Route Details Overlay */}
        {routeDetails && (
          <div className="absolute bottom-4 left-4 z-50 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="text-sm font-semibold text-gray-700">
              <div>
                Distance:{" "}
                <span className="text-blue-600">
                  {routeDetails.distance} km
                </span>
              </div>
              <div>
                Estimated Travel Time:{" "}
                <span className="text-blue-600">
                  {routeDetails.duration} hours
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationRoutingMap;
