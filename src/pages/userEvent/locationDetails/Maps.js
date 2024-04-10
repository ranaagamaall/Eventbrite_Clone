import React from "react";
import classes from "./locationDetails.module.css";
import { useMemo } from "react";
import { GoogleMap, LoadScript,  Marker} from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
  };

const center = {
    lat: 40.748817,
    lng: -73.985428
  };

const Maps = () => {
  return (
    <LoadScript
        googleMapsApiKey="AIzaSyAocyjOQxZfJX4iMmUD4ELuGmnBxqtvdQI"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
        </GoogleMap>
      </LoadScript>
  );
};

export default Maps;