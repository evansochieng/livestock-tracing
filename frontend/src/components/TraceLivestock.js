import React from 'react';
import { CircleMarker, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import redicon from "../images/redicon.png";
import greenicon from "../images/greenicon.png";
import greyicon from "../images/greyicon.png";

import Buffer from './Buffer';

const TraceLivestock = ({ safeLivestock, deforestedAreas, livestockAtRisk, setLivestockAtRisk }) => {
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
    <>
      <Buffer setLivestockAtRisk={setLivestockAtRisk} />
      <MapContainer
        center={[-0.023559, 37.906193]}
        zoom={7}
        style={{ height: "541px", width: "85%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Display all livestock locations */}
        {safeLivestock.map((animal, index) => (
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
          <CircleMarker
            key={index}
            center={[defArea.latitude, defArea.longitude]}
            radius={Math.sqrt(defArea.area / 10)}
            // icon={customGreyIcon}
            fillOpacity={0.5}
            stroke={false}
            riseOnHover={true}
            keyboard={true}
            eventHandlers={{
              mouseover: handleMarkerMouseOver,
            }}
            color="#515549"
          >
            <Popup>
              <strong>{defArea.name}</strong>
              <br />
              Lat: {defArea.latitude.toFixed(4)}
              <br />
              Lon: {defArea.longitude.toFixed(4)}
              <br />
              Area: {defArea.area}
            </Popup>
          </CircleMarker>
        ))}

        {/* Display livestock at risk */}
        {livestockAtRisk.map((ls_at_risk, index) => (
          <Marker
            key={index}
            position={[ls_at_risk.latitude, ls_at_risk.longitude]}
            icon={customRedIcon}
            riseOnHover={true}
            keyboard={true}
            eventHandlers={{
              mouseover: handleMarkerMouseOver,
            }}
          >
            <Popup>
              <strong>{ls_at_risk.owner}</strong>
              <br />
              <strong>{ls_at_risk.contact}</strong>
              <br />
              Lat: {ls_at_risk.latitude.toFixed(4)}
              <br />
              Lon: {ls_at_risk.longitude.toFixed(4)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default TraceLivestock;