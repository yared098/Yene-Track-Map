import React from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "../style.css";

// Fix for default marker icon
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

  // Parse URL parameters to floats
  const point1 = [parseFloat(lat), parseFloat(lon)];
  const point2 = [parseFloat(lat1), parseFloat(lon1)];

  // Polyline points (connecting the two markers)
  const linePoints = [point1, point2];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>YeneTrack Map</h1>
      <MapContainer
        center={point1}
        zoom={13}
        style={{
          height: "90vh",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {/* Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marker for Point 1 */}
        <Marker position={point1}>
          <Popup>Point 1: Latitude {lat}, Longitude {lon}</Popup>
        </Marker>
        
        {/* Marker for Point 2 */}
        <Marker position={point2}>
          <Popup>Point 2: Latitude {lat1}, Longitude {lon1}</Popup>
        </Marker>
        
        {/* Line connecting the points */}
        <Polyline positions={linePoints} color="blue" />
      </MapContainer>
    </div>
  );
};

export default MapView;
