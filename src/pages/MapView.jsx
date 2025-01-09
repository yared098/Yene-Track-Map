import React, { useState } from "react";
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

const MapView = () => {
  // Extract parameters from the URL
  const { lat, lon, lat1, lon1 } = useParams();

  // Parse URL parameters into floating-point numbers
  const point1 = [parseFloat(lat), parseFloat(lon)];
  const point2 = [parseFloat(lat1), parseFloat(lon1)];

  // Polyline points to connect the two markers
  const linePoints = [point1, point2];

  // State for map tile layer (default or satellite view)
  const [isSatellite, setIsSatellite] = useState(false);

  // Tile layer URLs
  const defaultTileLayer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const satelliteTileLayer = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          textAlign: "center",
          fontSize: "1.8rem",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        Yene Order Tracker
      </div>

      {/* Map and Controls */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Toggle View Button */}
        <button
          onClick={() => setIsSatellite(!isSatellite)}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 1000,
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Toggle {isSatellite ? "Default" : "Satellite"} View
        </button>

        {/* Map Container */}
        <MapContainer
          center={point1}
          zoom={13}
          style={{
            flex: 1,
            width: "100%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <TileLayer
            url={isSatellite ? satelliteTileLayer : defaultTileLayer}
            attribution={
              isSatellite
                ? "© Esri & contributors | Source: Esri, DigitalGlobe, GeoEye"
                : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
          />

          {/* Marker for Point 1 */}
          <Marker position={point1}>
            <Popup>
              <strong>Point 1</strong>
              <br />
              Latitude: {lat}
              <br />
              Longitude: {lon}
            </Popup>
          </Marker>

          {/* Marker for Point 2 */}
          <Marker position={point2}>
            <Popup>
              <strong>Point 2</strong>
              <br />
              Latitude: {lat1}
              <br />
              Longitude: {lon1}
            </Popup>
          </Marker>

          {/* Line connecting the two points */}
          <Polyline positions={linePoints} color="blue" />
        </MapContainer>
      </div>

      {/* Right-aligned Rectangle */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "250px",
          padding: "20px",
          backgroundColor: "#007bff",
          borderRadius: "15px",
          color: "#fff",
          textAlign: "center",
          fontSize: "1.2rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p>
          <strong>Order Tracking Info</strong>
        </p>
        <p>Track your orders in real time!</p>
      </div>
    </div>
  );
};

export default MapView;
