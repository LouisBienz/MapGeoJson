import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import './App.css';

const App = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    // Load your GeoJSON data here
    // For example, from a local file or an API
    fetch(process.env.PUBLIC_URL + '/wahlkreise.geojson')
      .then(response => response.json())
      .then(data => setGeojsonData(data));
  }, []);

  return (
    <div className="App">
      <h1>Geo JSON Map</h1>
      {geojsonData && <MapComponent geojsonData={geojsonData} />}
    </div>
  );
}

export default App;
