import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const MapComponent = ({ geojsonData }) => {
  const [activePopup, setActivePopup] = useState(null);

  const onEachFeature = (feature, layer) => {
    layer.on('click', (e) => {
      // Update the state to include both the feature properties and the clicked position
      setActivePopup({ 
        feature: feature, 
        latlng: e.latlng 
      });
    });
  };

  return (
    <MapContainer center={[47.3769, 8.5417]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
      {activePopup && (
        <Popup
          position={activePopup.latlng}
          onClose={() => setActivePopup(null)}
        >
          <div>
            <p><strong>Clicked Coordinates:</strong> Lat: {activePopup.latlng.lat.toFixed(3)}, Lng: {activePopup.latlng.lng.toFixed(3)}</p>
            <hr />
            {Object.entries(activePopup.feature.properties).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </div>
        </Popup>
      )}
    </MapContainer>
  );
};

export default MapComponent;
