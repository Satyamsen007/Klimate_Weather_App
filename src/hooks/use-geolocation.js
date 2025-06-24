'use client';

import { useEffect, useState } from "react";

export function useGeolocation() {
  const [locationData, setLocationData] = useState({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setLocationData({ ...locationData, isLoading: true, error: null });
    if (!navigator.geolocation) {
      setLocationData({
        ...locationData,
        isLoading: false,
        error: "Geolocation is not supported by this browser.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred while retrieving location.';
        }
        setLocationData({
          ...locationData,
          isLoading: false,
          error: errorMessage,
        });
      }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
    );
  }

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}