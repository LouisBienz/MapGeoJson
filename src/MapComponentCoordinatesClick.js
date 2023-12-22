import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const MapComponent = ({ geojsonData }) => {
  const [activePos, setActivePos] = useState(null);

  const onEachFeature = (feature, layer) => {
    layer.on('click', (e) => {
      // Update the state to the clicked position
      setActivePos(e.latlng);
    });
  };

  return (
    <MapContainer center={[47.3769, 8.5417]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
      {activePos && (
        <Popup
          position={activePos}
          onClose={() => setActivePos(null)}
        >
          <div>
            Clicked coordinates:<br />
            Latitude: {activePos.lat.toFixed(6)},<br />
            Longitude: {activePos.lng.toFixed(6)}
          </div>
        </Popup>
      )}
    </MapContainer>
  );
};

export default MapComponent;