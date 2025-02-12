import { useState, useEffect } from 'react';
import MapView from '../components/maptest/MapView';
import LocationSearch from '../components/maptest/LocationSearch';
import Sidebar from '../components/maptest/Sidebar';

const LocationsPage = () => {
  const [geoData, setGeoData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Fetch GeoJSON data
    fetch('/assets/HangJeongDong_ver20241001.geojson')
      .then((response) => response.json())
      .then((data) => setGeoData(data));
  }, []);

  const handleSearch = (query) => {
    if (!geoData) return;

    const location = geoData.features.find(
      (feature) => feature.properties.name.toLowerCase().includes(query.toLowerCase())
    );
    if (location) setSelectedLocation(location);
    else alert('Location not found');
  };

  const handleFeatureClick = (feature) => {
    setSelectedLocation(feature);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '25%', overflowY: 'auto', borderRight: '1px solid #ccc' }}>
        <LocationSearch onSearch={handleSearch} />
        <Sidebar selectedLocation={selectedLocation} />
      </div>
      <div style={{ flex: 1 }}>
        <MapView geoData={geoData} onFeatureClick={handleFeatureClick} />
      </div>
    </div>
  );
};

export default LocationsPage;
