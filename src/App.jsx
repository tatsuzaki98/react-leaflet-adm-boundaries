import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("JPN");
  const [worldData, setWorldData] = useState(null);
  const [geoJsonKey, setGeoJsonKey] = useState(0);

  useEffect(() => {
    fetch('/world-administrative-boundaries.geojson')
      .then((response) => response.json())
      .then((data) => setWorldData(data))
      .catch((error) => console.error('Failed to Load:', error));
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountryCode(e.target.value);
    setGeoJsonKey((prevKey) => prevKey + 1);
  };

  const getCountryStyle = (feature) => ({
    fillColor: feature.properties.iso3 === selectedCountryCode ? 'red' : 'gray',
    weight: 1,
    color: 'white',
    fillOpacity: 0.7,
  });

  if (!worldData) return <div>Loading...</div>;

  return (
    <div>
      <select onChange={handleCountryChange} defaultValue="">
        <option value="" disabled>
          Select a country
        </option>
        {worldData.features.map((feature) => (
          <option key={feature.properties.iso3} value={feature.properties.iso3}>
            {feature.properties.name}
          </option>
        ))}
      </select>

      <MapContainer center={[20, 0]} zoom={2} style={{ height: '90vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON key={geoJsonKey} data={worldData} style={getCountryStyle} />
      </MapContainer>
    </div>
  );
};

export default App;
