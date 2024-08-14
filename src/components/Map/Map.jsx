import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = ({ latitude, longitude, mapboxToken }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    mapboxgl.accessToken = mapboxToken;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude || -74.5, latitude || 40],
      zoom: 12
    });

    // Add navigation control (zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add marker
    new mapboxgl.Marker()
      .setLngLat([longitude || -74.5, latitude || 40])
      .addTo(map.current);
  }, [latitude, longitude, mapboxToken]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.flyTo({
      center: [longitude, latitude],
      zoom: 12
    });
  }, [latitude, longitude]);

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default MapComponent;