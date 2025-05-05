import React, { useState, useCallback } from 'react';
import UserLocationMap from '../components/UserLocationMap';
import UserLocationDetails from '../components/UserLocationDetails';

const UserLocation: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationChange = useCallback((location: { lat: number; lng: number }) => {
    setCoordinates(location);
    // TODO: Implement geocoding to get address from coordinates
    setAddress(null); // Reset address when location changes
  }, []);

  const handleRequestLocation = useCallback(() => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(userPos);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Mi Ubicación</h1>
      
      <div className="row">
        <div className="col-md-8 mb-4">
          <UserLocationMap
            height="500px"
            onLocationChange={handleLocationChange}
          />
        </div>
        
        <div className="col-md-4">
          <UserLocationDetails
            address={address}
            coordinates={coordinates}
            onRequestLocation={handleRequestLocation}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default UserLocation; 