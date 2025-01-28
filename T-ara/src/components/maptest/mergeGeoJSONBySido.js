// mergeGeoJSONBySido.js
import * as turf from '@turf/turf';

function isNonEmptyPolygon(geometry) {
  if (!geometry) return false;
  const { type, coordinates } = geometry;
  if (!coordinates || coordinates.length === 0) return false;

  if (type === 'Polygon') {
    // 각 Ring 배열이 최소 4개의 좌표(마지막 좌표가 시작점과 동일) 이상 있어야 면이 성립
    return coordinates.some((ring) => ring && ring.length >= 4);
  } else if (type === 'MultiPolygon') {
    // MultiPolygon은 [[LinearRing], [LinearRing], ...] 구조
    return coordinates.some(
      (poly) => Array.isArray(poly) && poly.some((ring) => ring && ring.length >= 4)
    );
  }
  return false;
}

export default function mergeGeoJSONBySido(geoData) {
  // 1. 'sido' 프로퍼티로 그룹화
  const groupBySido = geoData.features.reduce((acc, feature) => {
    const sidoName = feature.properties?.sido || 'Unknown'; 
    if (!acc[sidoName]) acc[sidoName] = [];
    acc[sidoName].push(feature);
    return acc;
  }, {});

  // 2. 그룹별 병합
  const mergedFeatures = Object.entries(groupBySido).map(([sidoName, features]) => {
    // 유효한 폴리곤만 필터링
    const validFeatures = features.filter((f) => isNonEmptyPolygon(f.geometry));

    if (validFeatures.length === 0) {
      console.warn(`No valid geometry for '${sidoName}', skipping.`);
      return null;
    }
    if (validFeatures.length === 1) {
      // 폴리곤이 1개만 있는 경우는 그대로 리턴
      return {
        type: 'Feature',
        properties: { ...validFeatures[0].properties, sido: sidoName },
        geometry: validFeatures[0].geometry,
      };
    }

    // 여러 개라면 union으로 병합
    try {
      const merged = validFeatures.reduce((acc, curr) => {
        if (!acc) return turf.feature(curr.geometry);
        try {
          return turf.union(acc, turf.feature(curr.geometry));
        } catch (e) {
          console.warn(`Union failed for ${sidoName} - skipping one feature.`, e);
          // 실패한 feature는 스킵
          return acc;
        }
      }, null);

      if (!merged || !merged.geometry) {
        console.error(`Merged geometry is invalid for '${sidoName}'.`);
        return null;
      }

      return {
        type: 'Feature',
        properties: { sido: sidoName },
        geometry: merged.geometry,
      };
    } catch (error) {
      console.error(`Error merging geometry for '${sidoName}':`, error);
      return null;
    }
  });

  const filtered = mergedFeatures.filter(Boolean); // null 제거

  return {
    type: 'FeatureCollection',
    features: filtered,
  };
}
