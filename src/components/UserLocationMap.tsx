import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface UserLocationMapProps {
  height: string;
  onLocationChange: (location: { lat: number; lng: number }) => void;
}

const UserLocationMap: React.FC<UserLocationMapProps> = ({ height, onLocationChange }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: '', // We'll handle this through our secure endpoint
    libraries: ["places"],
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      onLocationChange({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  return (
    <div style={{ height, width: '100%' }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={{ lat: -34.603722, lng: -58.381592 }} // Default to Buenos Aires
          zoom={12}
          onClick={handleMapClick}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
          }}
        >
          <Marker
            position={{ lat: -34.603722, lng: -58.381592 }}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }}
          />
        </GoogleMap>
      ) : (
        <div className="bg-light d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando mapa...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLocationMap; 