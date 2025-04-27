import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserLocationMap from '@/components/UserLocationMap';
import NearbyShelterCard from '@/components/NearbyShelterCard';
import { Shelter, getSheltersWithCoordinates, getNearestShelters } from '@/services/shelterService';

type LocationData = {
  lat: number;
  lng: number;
  address?: string;
};

const UserLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [nearbyShelters, setNearbyShelters] = useState<Shelter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationRequested, setLocationRequested] = useState(false);

  // Get the API key from environment variables
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Load shelters with coordinates on component mount
  useEffect(() => {
    const loadShelters = async () => {
      if (!apiKey) return;
      
      setIsLoading(true);
      try {
        const sheltersWithCoordinates = await getSheltersWithCoordinates(apiKey);
        setShelters(sheltersWithCoordinates);
      } catch (err) {
        console.error('Error loading shelters:', err);
        setError('No se pudieron cargar los refugios. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    loadShelters();
  }, [apiKey]);

  // Update nearby shelters when location changes
  useEffect(() => {
    if (location && shelters.length > 0) {
      const nearest = getNearestShelters(shelters, location, 50); // Get shelters within 50km
      setNearbyShelters(nearest);
      setLocationRequested(true);
    }
  }, [location, shelters]);

  // Handle location change from the map component
  const handleLocationChange = async (newLocation: { lat: number; lng: number }) => {
    setIsAddressLoading(true);
    setLocation({
      lat: newLocation.lat,
      lng: newLocation.lng
    });

    try {
      // Use Reverse Geocoding to get the address from coordinates
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLocation.lat},${newLocation.lng}&key=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener la dirección');
      }
      
      const data = await response.json();
      
      if (data.status === 'OK' && data.results && data.results.length > 0) {
        setLocation(prev => ({
          ...prev!,
          address: data.results[0].formatted_address
        }));
      } else {
        console.warn('No se pudo obtener la dirección:', data);
      }
    } catch (err) {
      console.error('Error obteniendo dirección:', err);
      setError('No se pudo obtener la dirección para las coordenadas seleccionadas.');
    } finally {
      setIsAddressLoading(false);
    }
  };

  if (!apiKey) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error de configuración</h4>
          <p>
            No se ha proporcionado una clave API de Google Maps. Asegúrate de agregar la variable
            GOOGLE_MAPS_API_KEY en tu archivo .env
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Encuentra refugios cercanos</h1>
          <p className="lead mb-4">
            Necesitamos acceder a tu ubicación para poder mostrarte los refugios más cercanos.
            Puedes permitir el acceso a tu ubicación o seleccionar manualmente un punto en el mapa.
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <UserLocationMap
                apiKey={apiKey}
                height="500px"
                onLocationChange={handleLocationChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Detalles de ubicación</h5>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {!location && !error && (
                <div className="alert alert-info" role="alert">
                  <i className="bi bi-info-circle me-2"></i>
                  Permite el acceso a tu ubicación o selecciona un punto en el mapa
                </div>
              )}

              {location && (
                <>
                  <div className="mb-3">
                    <h6 className="card-subtitle mb-2 text-muted">Coordenadas</h6>
                    <p className="card-text">
                      Latitud: {location.lat.toFixed(6)}
                      <br />
                      Longitud: {location.lng.toFixed(6)}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6 className="card-subtitle mb-2 text-muted">Dirección</h6>
                    {isAddressLoading ? (
                      <div className="d-flex align-items-center">
                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                          <span className="visually-hidden">Cargando...</span>
                        </div>
                        <span>Obteniendo dirección...</span>
                      </div>
                    ) : location.address ? (
                      <p className="card-text">{location.address}</p>
                    ) : (
                      <p className="card-text text-muted">No se pudo obtener la dirección</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Display nearby shelters or prompt to allow location */}
      <div className="row">
        <div className="col-12">
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando refugios...</span>
              </div>
              <p className="mt-3">Cargando refugios cercanos...</p>
            </div>
          ) : !locationRequested ? (
            <div className="text-center py-5">
              <div className="alert alert-info" role="alert">
                <h4 className="alert-heading">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Comparte tu ubicación
                </h4>
                <p>
                  Para mostrarte los refugios cercanos, necesitamos saber dónde estás.
                  Por favor, haz clic en "Obtener mi ubicación" en el mapa o selecciona un punto manualmente.
                </p>
              </div>
            </div>
          ) : nearbyShelters.length === 0 ? (
            <div className="text-center py-4">
              <div className="alert alert-warning">
                <h4 className="alert-heading">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  No hay refugios cercanos
                </h4>
                <p>
                  No hemos encontrado refugios a menos de 50 kilómetros de tu ubicación.
                  Puedes ver todos los refugios disponibles o intentar con otra ubicación.
                </p>
                <hr />
                <div className="d-flex justify-content-center">
                  <Link to="/refugios" className="btn btn-primary">
                    Ver todos los refugios
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h2 className="mb-4">
                <i className="bi bi-house-heart me-2"></i>
                Refugios cercanos a tu ubicación
              </h2>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {nearbyShelters.map((shelter) => (
                  <div key={shelter.id} className="col">
                    <NearbyShelterCard shelter={shelter} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="alert alert-secondary" role="alert">
            <h5 className="alert-heading">
              <i className="bi bi-shield-check me-2"></i>
              Privacidad
            </h5>
            <p>
              Tu ubicación solo se utilizará para mostrarte los refugios y mascotas más cercanos a ti.
              No almacenamos tus datos de ubicación a menos que decidas explícitamente guardarlos
              en tu perfil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLocation; 