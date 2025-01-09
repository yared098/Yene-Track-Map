import React, { useState, useRef } from "react";
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
  const { lat, lon, lat1, lon1 } = useParams();
  const point1 = [parseFloat(lat), parseFloat(lon)];
  const point2 = [parseFloat(lat1), parseFloat(lon1)];
  const linePoints = [point1, point2];
  const [isSatellite, setIsSatellite] = useState(false);
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
              ? "© Esri & contributors | Source: Esri, DigitalGlobe, GeoEye"
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
        <Polyline positions={linePoints} color="blue" />
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
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
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

        {/* Zoom Out Button */}
        <button
          onClick={handleZoomOut}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
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

        {/* Toggle View Button */}
        <button
          onClick={() => setIsSatellite(!isSatellite)}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isSatellite ? "Default View" : "Satellite View"}
        </button>
      </div>
    </div>
  );
};

export default MapView;
