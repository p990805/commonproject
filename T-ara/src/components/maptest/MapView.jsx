import React, { useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// 방금 만든 병합 함수
import mergeGeoJSONBySido from './mergeGeoJSONBySido';

const MapView = ({ geoData, onFeatureClick }) => {
  // 지도에 적용할 스타일
  const geoJsonStyle = {
    color: 'blue',
    weight: 2,
    fillColor: 'lightblue',
    fillOpacity: 0.5,
  };

  // 지도 위에서 각 Feature를 클릭했을 때
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        onFeatureClick?.(feature);
      },
    });
  };

  // geoData가 존재할 때만 병합하도록
  const mergedGeoData = useMemo(() => {
    if (!geoData) return null;
    return mergeGeoJSONBySido(geoData);
  }, [geoData]);

  return (
    <MapContainer 
      center={[36.5, 127.8]} // 대충 대한민국 중앙부쯤
      zoom={7} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mergedGeoData && (
        <GeoJSON 
          data={mergedGeoData} 
          style={geoJsonStyle} 
          onEachFeature={onEachFeature} 
        />
      )}
    </MapContainer>
  );
};

export default MapView;
