import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
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

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const LocationDistanceMap = ({
  location1,
  location2,
  locationNames = ["Location 1", "Location 2"],
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const distance = calculateDistance(
    location1[0],
    location1[1],
    location2[0],
    location2[1]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-100">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          className="z-10"
        />
        <Marker position={location1}>
          <Popup>{locationNames[0]}</Popup>
        </Marker>
        <Marker position={location2}>
          <Popup>{locationNames[1]}</Popup>
        </Marker>
        <Polyline
          positions={[location1, location2]}
          color="red"
          weight={3}
          dashArray="10, 10"
        />
        <DistanceInfo
          location1={location1}
          location2={location2}
          distance={distance}
        />
        <MapBounds locations={[location1, location2]} />
      </MapContainer>
      <div className="absolute bottom-4 left-4 z-50 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="text-sm font-semibold text-gray-700">
          Distance:{" "}
          <span className="text-blue-600">{distance.toFixed(2)} km</span>
        </div>
      </div>
    </div>
  );
};

const DistanceInfo = ({ location1, location2, distance }) => {
  const position = [
    (location1[0] + location2[0]) / 2,
    (location1[1] + location2[1]) / 2,
  ];

  return (
    <Marker
      position={position}
      icon={L.divIcon({ className: "distance-info-marker" })}
    />
  );
};

const MapBounds = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(locations);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, locations]);

  return null;
};

export default LocationDistanceMap;
