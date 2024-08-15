import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = ({ latitude, longitude, mapboxToken, showDirections }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const directionsControl = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

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

    // Add marker for delivery location
    new mapboxgl.Marker()
      .setLngLat([longitude || -74.5, latitude || 40])
      .addTo(map.current);

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );

  }, [latitude, longitude, mapboxToken]);

  useEffect(() => {
    if (!map.current) return;

    if (showDirections && userLocation) {
      if (!directionsControl.current) {
        // Create directions control if it doesn't exist
        directionsControl.current = new MapboxDirections({
          accessToken: mapboxToken,
          unit: 'metric',
          profile: 'mapbox/driving',
        });
        map.current.addControl(directionsControl.current, 'top-left');
      }

      // Set origin and destination
      directionsControl.current.setOrigin(userLocation);
      directionsControl.current.setDestination([longitude, latitude]);
    } else {
      // Remove directions control if it exists
      if (directionsControl.current) {
        map.current.removeControl(directionsControl.current);
        directionsControl.current = null;
      }
    }
  }, [showDirections, userLocation, latitude, longitude, mapboxToken]);

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