import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import MapComponent from './MapComponent'; 

const MapPage = () => {
    const { state } = useLocation();
  
    if (!state || !state.location) {
      return <p>No location data provided!</p>;  
    }
  
    return (
      <div>
        <MapComponent location={state.location} />
      </div>
    );
  };
export default MapPage;
