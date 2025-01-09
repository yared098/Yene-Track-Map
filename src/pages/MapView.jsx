// import React from "react";
// import { useParams } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix for default marker icons
// import L from "leaflet";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const MapView = () => {
//   // Extract parameters from the URL
//   const { lat, lon, lat1, lon1 } = useParams();

//   // Parse URL parameters into floating-point numbers
//   const point1 = [parseFloat(lat), parseFloat(lon)];
//   const point2 = [parseFloat(lat1), parseFloat(lon1)];

//   // Polyline points to connect the two markers
//   const linePoints = [point1, point2];

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <h1 style={{ textAlign: "center" }}>YeneTrack Map</h1>
//       <MapContainer
//         center={point1}
//         zoom={13}
//         style={{
//           height: "90vh",
//           width: "100%",
//           maxWidth: "100%",
//         }}
//       >
//         {/* Tile Layer */}
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
        
//         {/* Marker for Point 1 */}
//         <Marker position={point1}>
//           <Popup>Point 1: Latitude {lat}, Longitude {lon}</Popup>
//         </Marker>
        
//         {/* Marker for Point 2 */}
//         <Marker position={point2}>
//           <Popup>Point 2: Latitude {lat1}, Longitude {lon1}</Popup>
//         </Marker>
        
//         {/* Line connecting the two points */}
//         <Polyline positions={linePoints} color="blue" />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapView;


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
  const satelliteTileLayer =
    "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      
    >
      <h1 style={{ textAlign: "center", fontSize: "1.5rem", margin: "10px 0" }}>
        Yene Order Tracker
      </h1>
      <button
        onClick={() => setIsSatellite(!isSatellite)}
        style={{
          margin: "10px auto",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Toggle {isSatellite ? "Default" : "Satellite"} View
      </button>
      <MapContainer
        center={point1}
        zoom={13}
        style={{
          flex: 1,
          height: "90vh",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {/* Tile Layer */}
        <TileLayer
          url={isSatellite ? satelliteTileLayer : defaultTileLayer}
          attribution={
            isSatellite
              ? "© Google"
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
          subdomains={isSatellite ? ["mt1", "mt2", "mt3"] : undefined}
        />

        {/* Marker for Point 1 */}
        <Marker position={point1}>
          <Popup>Point 1: Latitude {lat}, Longitude {lon}</Popup>
        </Marker>

        {/* Marker for Point 2 */}
        <Marker position={point2}>
          <Popup>Point 2: Latitude {lat1}, Longitude {lon1}</Popup>
        </Marker>

        {/* Line connecting the two points */}
        <Polyline positions={linePoints} color="blue" />
      </MapContainer>
    </div>
  );
};

export default MapView;
