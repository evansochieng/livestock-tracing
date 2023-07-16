import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
//import "leaflet/dist/leaflet.css";

const TraceLivestock = ({ livestock }) => {
  console.log(livestock)

  const handleMarkerMouseOver = (event) => {
    event.target.openPopup();
  };

  return (
    // <MapContainer center={[-0.023559, 37.906193]} zoom={5}>
    //   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    //   {livestock.map((animal) => (
    //     <Marker key={animal.id} position={[animal.latitude, animal.longitude]}>
    //       <Popup>
    //         <strong>{animal.owner}</strong>
    //         <br />
    //         Latitude: {animal.latitude}, Longitude: {animal.longitude}
    //       </Popup>
    //     </Marker>
    //   ))}
    // </MapContainer>

    <MapContainer
      center={[-0.023559, 37.906193]}
      zoom={7}
      style={{ height: "541px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {livestock.map((animal, index) => (
        <Marker
          key={index}
          position={[animal.latitude, animal.longitude]}
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
            Latitude: {animal.latitude}, Longitude: {animal.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default TraceLivestock;