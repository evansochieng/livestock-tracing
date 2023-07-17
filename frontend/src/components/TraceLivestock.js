import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
//import "leaflet/dist/leaflet.css";

import redicon from "../images/redicon.png";
import greenicon from "../images/greenicon.png";
import greyicon from "../images/greyicon.png";

const TraceLivestock = ({ livestock, deforestedAreas }) => {

  const handleMarkerMouseOver = (event) => {
    event.target.openPopup();
  };

  // Create custom icons //
  // Livestock at risk icon
  const customRedIcon = L.icon({
    iconUrl: redicon,
    iconSize: [32, 32], // Adjust the size as needed
    iconAnchor: [16, 32], // Adjust the anchor point as needed
  });

  // Deforested areas icon
  const customGreyIcon = L.icon({
    iconUrl: greyicon,
    iconSize: [32, 32], // Adjust the size as needed
    iconAnchor: [16, 32], // Adjust the anchor point as needed
  });

  // Safe livestock icon
  const customGreenIcon = L.icon({
    iconUrl: greenicon,
    iconSize: [32, 32], // Adjust the size as needed
    iconAnchor: [16, 32], // Adjust the anchor point as needed
  });

  return (
    <MapContainer
      center={[-0.023559, 37.906193]}
      zoom={7}
      style={{ height: "541px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Display all livestock locations */}
      {livestock.map((animal, index) => (
        <Marker
          key={index}
          position={[animal.latitude, animal.longitude]}
          icon={customGreenIcon}
          riseOnHover={true}
          keyboard={true}
          eventHandlers={{
            mouseover: handleMarkerMouseOver,
          }}
        >
          <Popup>
            <strong>{animal.owner}</strong>
            <br />
            <strong>{animal.contact}</strong>
            <br />
            Lat: {animal.latitude.toFixed(4)}
            <br />
            Lon: {animal.longitude.toFixed(4)}
          </Popup>
        </Marker>
      ))}

      {/* Display deforested areas */}
      {deforestedAreas.map((defArea, index) => (
        <Marker
          key={index}
          position={[defArea.latitude, defArea.longitude]}
          icon={customGreyIcon}
          riseOnHover={true}
          keyboard={true}
          eventHandlers={{
            mouseover: handleMarkerMouseOver,
          }}
        >
          <Popup>
            Lat: {defArea.latitude.toFixed(4)}
            <br />
            Lon: {defArea.longitude.toFixed(4)}
            <br />
            <strong>{defArea.area}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default TraceLivestock;