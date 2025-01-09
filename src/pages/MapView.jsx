import React, { useState, useRef, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Haversine formula to calculate the distance in kilometers
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // in kilometers
  return distance;
};

const MapView = () => {
  const { lat, lon, lat1, lon1 } = useParams();
  
  // Wrap point1 in useMemo to prevent recalculations on every render
  const point1 = useMemo(() => [parseFloat(lat), parseFloat(lon)], [lat, lon]);

  // Use useMemo to prevent unnecessary recalculations of point2
  const point2 = useMemo(() => [parseFloat(lat1), parseFloat(lon1)], [lat1, lon1]);

  const linePoints = [point1, point2];
  const [isSatellite, setIsSatellite] = useState(true);
  const [distance, setDistance] = useState(0);

  // Calculate the distance between the two points when the component mounts or params change
  useEffect(() => {
    const dist = haversineDistance(point1[0], point1[1], point2[0], point2[1]);
    setDistance(dist);
  }, [point1, point2]); // point1 and point2 are now stable due to useMemo

  const defaultTileLayer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const satelliteTileLayer =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const mapRef = useRef();

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() - 1);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <MapContainer
        center={point1}
        zoom={13}
        ref={mapRef}
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <TileLayer
          url={isSatellite ? satelliteTileLayer : defaultTileLayer}
          attribution={
            isSatellite
              ? "©YeneDelivery & contributors | Source: YeneDelivery"
              : 'YeneDelivery '
          }
        />
        
        <Marker position={point1}>
          <Popup>
            <strong>Point 1</strong>
            <br />
            Latitude: {lat}
            <br />
            Longitude: {lon}
          </Popup>
        </Marker>
        <Marker position={point2}>
          <Popup>
            <strong>Point 2</strong>
            <br />
            Latitude: {lat1}
            <br />
            Longitude: {lon1}
          </Popup>
        </Marker>
        <Polyline positions={linePoints} color="green" />
      </MapContainer>

      {/* Controls */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        {/* Zoom In Button */}
        <button
          onClick={handleZoomIn}
          style={{
            padding: "10px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1.2rem",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          +
        </button>

       

        {/* Toggle View Button */}
        <button
          onClick={() => setIsSatellite(!isSatellite)}
          style={{
            padding: "10px 15px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.7rem",
            width:'150px',
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isSatellite ? "Grid View" : "Satellite View"}
        </button>

         {/* Zoom Out Button */}
         <button
          onClick={handleZoomOut}
          style={{
            padding: "10px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1.2rem",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          -
        </button>
      </div>

      {/* Distance display at the top-right corner */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "green",
          // backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "8px",
          fontSize: "1rem",
          zIndex: 1000,
        }}
      >
        <p>
          Distance: {distance.toFixed(3)} km
        </p>
      </div>
    </div>
  );
};

export default MapView;


