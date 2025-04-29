import { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';

// TODO: Migrate to AdvancedMarkerElement when @react-google-maps/api supports it
// See: https://developers.google.com/maps/documentation/javascript/reference/marker#AdvancedMarkerElement

// Types
type Coordinates = {
  lat: number;
  lng: number;
};

type MapType = 'roadmap' | 'satellite' | 'hybrid' | 'terrain';

type UserLocationMapProps = {
  height?: string;
  width?: string;
  onLocationChange?: (location: Coordinates) => void;
  defaultCenter?: Coordinates;
  defaultZoom?: number;
  showSearch?: boolean;
  showMapTypeControl?: boolean;
  showZoomControl?: boolean;
  customMarkerIcon?: string;
  onError?: (error: Error) => void;
};

type MapStyles = {
  width: string;
  height: string;
};

// Constants
const DEFAULT_CENTER: Coordinates = { lat: 40.416775, lng: -3.703790 }; // Default to Spain
const DEFAULT_ZOOM = 14;
const DEFAULT_HEIGHT = '400px';
const DEFAULT_WIDTH = '100%';
const MAP_STYLES = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  }
];

// Sub-components
const LoadingSpinner = () => (
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Cargando...</span>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="alert alert-danger" role="alert">
    {message}
  </div>
);

const LocationControls = ({
  isLoading,
  locationRequested,
  onRequestLocation,
  userLocation,
  selectedLocation,
  onResetLocation,
}: {
  isLoading: boolean;
  locationRequested: boolean;
  onRequestLocation: () => void;
  userLocation: Coordinates | null;
  selectedLocation: Coordinates | null;
  onResetLocation: () => void;
}) => (
  <div className="position-absolute top-0 start-0 m-2">
    {!locationRequested && (
      <button
        className="btn btn-primary"
        onClick={onRequestLocation}
        disabled={isLoading}
        aria-label="Obtener mi ubicación"
        tabIndex={0}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span className="ms-2">Localizando...</span>
          </>
        ) : (
          <>
            <i className="bi bi-geo-alt-fill me-1" aria-hidden="true"></i>
            Obtener mi ubicación
          </>
        )}
      </button>
    )}

    {userLocation && selectedLocation && userLocation !== selectedLocation && (
      <button
        className="btn btn-sm btn-outline-primary ms-2"
        onClick={onResetLocation}
        aria-label="Volver a mi ubicación"
        tabIndex={0}
      >
        <i className="bi bi-geo-alt-fill me-1" aria-hidden="true"></i>
        Volver a mi ubicación
      </button>
    )}
  </div>
);

const MapControls = ({
  mapType,
  onMapTypeChange,
  onZoomIn,
  onZoomOut,
  showMapTypeControl = true,
  showZoomControl = true,
}: {
  mapType: MapType;
  onMapTypeChange: (type: MapType) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  showMapTypeControl?: boolean;
  showZoomControl?: boolean;
}) => (
  <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
    {showMapTypeControl && (
      <div className="btn-group">
        <button
          className={`btn btn-sm ${mapType === 'roadmap' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onMapTypeChange('roadmap')}
          aria-label="Mapa normal"
        >
          <i className="bi bi-map" aria-hidden="true"></i>
        </button>
        <button
          className={`btn btn-sm ${mapType === 'satellite' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onMapTypeChange('satellite')}
          aria-label="Mapa satélite"
        >
          <i className="bi bi-globe" aria-hidden="true"></i>
        </button>
      </div>
    )}
    {showZoomControl && (
      <div className="btn-group">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={onZoomIn}
          aria-label="Acercar"
        >
          <i className="bi bi-plus" aria-hidden="true"></i>
        </button>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={onZoomOut}
          aria-label="Alejar"
        >
          <i className="bi bi-dash" aria-hidden="true"></i>
        </button>
      </div>
    )}
  </div>
);

const SearchBox = ({ onPlaceSelected }: { onPlaceSelected: (place: google.maps.places.PlaceResult) => void }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        onPlaceSelected(place);
      }
    }
  }, [autocomplete, onPlaceSelected]);

  return (
    <div className="position-absolute top-0 start-50 translate-middle-x mt-2 w-50">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Buscar ubicación..."
          aria-label="Buscar ubicación"
        />
      </Autocomplete>
    </div>
  );
};

const UserLocationMap = ({ 
  height = DEFAULT_HEIGHT, 
  width = DEFAULT_WIDTH, 
  onLocationChange,
  defaultCenter = DEFAULT_CENTER,
  defaultZoom = DEFAULT_ZOOM,
  showSearch = true,
  showMapTypeControl = true,
  showZoomControl = true,
  customMarkerIcon,
  onError,
}: UserLocationMapProps) => {
  // State
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(null);
  const [mapCenter, setMapCenter] = useState<Coordinates>(defaultCenter);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationRequested, setLocationRequested] = useState(false);
  const [mapType, setMapType] = useState<MapType>('roadmap');
  const [zoom, setZoom] = useState(defaultZoom);
  const [address, setAddress] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Memoized values
  const mapContainerStyle = useMemo<MapStyles>(() => ({
    height,
    width,
  }), [height, width]);

  const mapOptions = useMemo<google.maps.MapOptions>(() => ({
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: MAP_STYLES,
  }), []);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: '', // We'll handle this through our secure endpoint
    libraries: ["places", "geocoding"],
  });

  // Error handling
  useEffect(() => {
    if (loadError && onError) {
      onError(loadError);
    }
  }, [loadError, onError]);

  // Geocoding
  const getAddressFromCoordinates = useCallback(async (coords: Coordinates) => {
    if (!map) return;
    
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: coords });
      if (response.results[0]) {
        setAddress(response.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error getting address:', error);
    }
  }, [map]);

  // Map event handlers
  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const handleMapTypeChange = useCallback((type: MapType) => {
    setMapType(type);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 1, 20));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 1, 1));
  }, []);

  const handlePlaceSelected = useCallback((place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSelectedLocation(location);
      setMapCenter(location);
      onLocationChange?.(location);
      getAddressFromCoordinates(location);
    }
  }, [onLocationChange, getAddressFromCoordinates]);

  // Callbacks
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
          onLocationChange?.(userPos);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setErrorMessage(
            error.code === error.PERMISSION_DENIED
              ? "El usuario denegó la solicitud de geolocalización."
              : error.code === error.POSITION_UNAVAILABLE
              ? "La información de la ubicación no está disponible."
              : error.code === error.TIMEOUT
              ? "Se agotó el tiempo de espera para obtener la ubicación."
              : "Ocurrió un error desconocido al obtener la ubicación."
          );
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsLoading(false);
      setErrorMessage("La geolocalización no es compatible con este navegador.");
    }
  }, [isLoaded, onLocationChange]);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const clickedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setSelectedLocation(clickedLocation);
      onLocationChange?.(clickedLocation);
    }
  }, [onLocationChange]);

  const handleMarkerClick = useCallback(() => {
    setShowInfoWindow(true);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setShowInfoWindow(false);
  }, []);

  const handleResetLocation = useCallback(() => {
    if (userLocation) {
      setSelectedLocation(userLocation);
      setMapCenter(userLocation);
      onLocationChange?.(userLocation);
    }
  }, [userLocation, onLocationChange]);

  // Error handling
  if (loadError) {
    return <ErrorMessage message={`Error al cargar el mapa: ${loadError.message}`} />;
  }

  if (!isLoaded) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="position-relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={zoom}
        onClick={handleMapClick}
        options={mapOptions}
        onLoad={handleMapLoad}
        mapTypeId={mapType}
      >
        {selectedLocation && (
          <>
            <Marker
              position={selectedLocation}
              onClick={handleMarkerClick}
              icon={customMarkerIcon ? {
                url: customMarkerIcon,
                scaledSize: new google.maps.Size(32, 32),
              } : {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }}
            />
            {showInfoWindow && (
              <InfoWindow
                position={selectedLocation}
                onCloseClick={handleInfoWindowClose}
              >
                <div>
                  <h6 className="mb-1">Tu ubicación</h6>
                  {address && <p className="mb-1 small">{address}</p>}
                  <p className="mb-0 small">
                    {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </InfoWindow>
            )}
          </>
        )}
      </GoogleMap>

      {showSearch && <SearchBox onPlaceSelected={handlePlaceSelected} />}

      <MapControls
        mapType={mapType}
        onMapTypeChange={handleMapTypeChange}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        showMapTypeControl={showMapTypeControl}
        showZoomControl={showZoomControl}
      />

      <LocationControls
        isLoading={isLoading}
        locationRequested={locationRequested}
        onRequestLocation={requestUserLocation}
        userLocation={userLocation}
        selectedLocation={selectedLocation}
        onResetLocation={handleResetLocation}
      />

      {errorMessage && (
        <div className="position-absolute bottom-0 start-0 end-0 m-2">
          <div className="alert alert-warning mb-0" role="alert">
            <i className="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
            {errorMessage}
            <p className="mt-2 mb-0">Puedes hacer clic en el mapa para seleccionar manualmente tu ubicación.</p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="d-flex align-items-center">
              <LoadingSpinner />
              <span className="ms-3">Obteniendo tu ubicación...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLocationMap; 