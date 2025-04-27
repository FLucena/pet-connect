import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// Define types
type UserLocationMapProps = {
  apiKey: string;
  height?: string;
  width?: string;
  onLocationChange?: (location: { lat: number; lng: number }) => void;
};

type MapStyles = {
  width: string;
  height: string;
};

// The libraries type needs to match the expected type from @react-google-maps/api
const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = ["places"];

const UserLocationMap = ({ 
  apiKey, 
  height = '400px', 
  width = '100%', 
  onLocationChange 
}: UserLocationMapProps) => {
  // Map state
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: 40.416775, lng: -3.703790 }); // Default to Spain
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationRequested, setLocationRequested] = useState(false);

  // Map container style
  const mapContainerStyle: MapStyles = {
    height,
    width,
  };

  // Map options
  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
  };

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  // Function to request user location - will be called by a button click
  const requestUserLocation = useCallback(() => {
    if (!isLoaded) return;
    
    setLocationRequested(true);
    setIsLoading(true);
    setErrorMessage(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          setMapCenter(userPos);
          setSelectedLocation(userPos);
          if (onLocationChange) {
            onLocationChange(userPos);
          }
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage("El usuario denegó la solicitud de geolocalización.");
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage("La información de la ubicación no está disponible.");
              break;
            case error.TIMEOUT:
              setErrorMessage("Se agotó el tiempo de espera para obtener la ubicación.");
              break;
            default:
              setErrorMessage("Ocurrió un error desconocido al obtener la ubicación.");
              break;
          }
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsLoading(false);
      setErrorMessage("La geolocalización no es compatible con este navegador.");
    }
  }, [isLoaded, onLocationChange]);

  // Handle click on map
  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const clickedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setSelectedLocation(clickedLocation);
      if (onLocationChange) {
        onLocationChange(clickedLocation);
      }
    }
  }, [onLocationChange]);

  // Handle marker click
  const handleMarkerClick = useCallback(() => {
    setShowInfoWindow(true);
  }, []);

  // Close info window
  const handleInfoWindowClose = useCallback(() => {
    setShowInfoWindow(false);
  }, []);

  if (loadError) {
    return (
      <div className="alert alert-danger" role="alert">
        Error al cargar el mapa: {loadError.message}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando mapa...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="position-relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={14}
        onClick={handleMapClick}
        options={mapOptions}
      >
        {selectedLocation && (
          <Marker
            position={selectedLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }}
            onClick={handleMarkerClick}
          >
            {showInfoWindow && (
              <InfoWindow
                position={selectedLocation}
                onCloseClick={handleInfoWindowClose}
              >
                <div>
                  <h6 className="mb-1">Tu ubicación</h6>
                  <p className="mb-0 small">
                    {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )}
      </GoogleMap>

      {/* Location controls */}
      <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
        {!locationRequested && (
          <button
            className="btn btn-primary"
            onClick={requestUserLocation}
            disabled={isLoading}
            aria-label="Obtener mi ubicación"
            tabIndex={0}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Localizando...
              </>
            ) : (
              <>
                <i className="bi bi-geo-alt-fill me-1"></i>
                Obtener mi ubicación
              </>
            )}
          </button>
        )}

        {userLocation && selectedLocation && userLocation !== selectedLocation && (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => {
              setSelectedLocation(userLocation);
              setMapCenter(userLocation);
              if (onLocationChange) {
                onLocationChange(userLocation);
              }
            }}
            aria-label="Volver a mi ubicación"
            tabIndex={0}
          >
            <i className="bi bi-geo-alt-fill me-1"></i>
            Volver a mi ubicación
          </button>
        )}
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="position-absolute bottom-0 start-0 end-0 m-2">
          <div className="alert alert-warning mb-0" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {errorMessage}
            <p className="mt-2 mb-0">Puedes hacer clic en el mapa para seleccionar manualmente tu ubicación.</p>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="d-flex align-items-center">
              <div className="spinner-border text-primary me-3" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <span>Obteniendo tu ubicación...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLocationMap; 