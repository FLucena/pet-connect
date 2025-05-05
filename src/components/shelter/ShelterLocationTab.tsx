import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Shelter } from '@/types/shelter';

interface ShelterLocationTabProps {
  shelter: Shelter;
  isMapLoaded: boolean;
}

const ShelterLocationTab: React.FC<ShelterLocationTabProps> = ({ shelter, isMapLoaded }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-4">Ubicación</h3>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <h4>Dirección</h4>
            <address className="mb-0">
              <p className="mb-1">
                <i className="bi bi-house-door me-2"></i>
                {shelter.direccion.calle}
              </p>
              <p className="mb-1">
                <i className="bi bi-geo me-2"></i>
                {shelter.direccion.ciudad}, {shelter.direccion.provincia}
              </p>
              <p className="mb-1">
                <i className="bi bi-mailbox me-2"></i>
                CP: {shelter.direccion.codigoPostal}
              </p>
              <p className="mb-0">
                <i className="bi bi-globe me-2"></i>
                {shelter.direccion.pais}
              </p>
            </address>
          </div>

          <div className="col-md-6 mb-4">
            <h4>Llegar</h4>
            {shelter.coordinates ? (
              <div className="d-grid gap-2">
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.coordinates.lat},${shelter.coordinates.lng}`}
                  className="btn btn-outline-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Cómo llegar con Google Maps"
                  tabIndex={0}
                >
                  <i className="bi bi-google me-2"></i>
                  Abrir en Google Maps
                </a>
                <a 
                  href={`https://waze.com/ul?ll=${shelter.coordinates.lat},${shelter.coordinates.lng}&navigate=yes`}
                  className="btn btn-outline-info"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Cómo llegar con Waze"
                  tabIndex={0}
                >
                  <i className="bi bi-geo-alt me-2"></i>
                  Abrir en Waze
                </a>
              </div>
            ) : (
              <p className="text-muted">Coordenadas no disponibles</p>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="mt-3" style={{ height: '400px', width: '100%' }}>
          {isMapLoaded && shelter.coordinates ? (
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%' }}
              center={shelter.coordinates}
              zoom={15}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: true,
              }}
            >
              <Marker
                position={shelter.coordinates}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }}
              />
            </GoogleMap>
          ) : (
            <div className="bg-light d-flex justify-content-center align-items-center h-100">
              {!shelter.coordinates ? (
                <div className="text-center">
                  <i className="bi bi-geo-alt text-muted" style={{ fontSize: '2rem' }}></i>
                  <p className="mt-2">Coordenadas no disponibles</p>
                </div>
              ) : (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando mapa...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterLocationTab; 