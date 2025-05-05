import React from 'react';

interface UserLocationDetailsProps {
  address: string | null;
  coordinates: { lat: number; lng: number } | null;
  onRequestLocation: () => void;
  isLoading: boolean;
}

const UserLocationDetails: React.FC<UserLocationDetailsProps> = ({
  address,
  coordinates,
  onRequestLocation,
  isLoading
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Detalles de ubicación</h5>
        
        {!coordinates && (
          <div className="alert alert-info">
            <p className="mb-0">No se ha seleccionado una ubicación.</p>
            <button
              className="btn btn-primary mt-2"
              onClick={onRequestLocation}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Obteniendo ubicación...
                </>
              ) : (
                <>
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Obtener mi ubicación
                </>
              )}
            </button>
          </div>
        )}

        {coordinates && (
          <div>
            {address && (
              <div className="mb-3">
                <h6 className="text-muted">Dirección</h6>
                <p className="mb-0">{address}</p>
              </div>
            )}
            
            <div>
              <h6 className="text-muted">Coordenadas</h6>
              <p className="mb-0">
                Latitud: {coordinates.lat.toFixed(6)}<br />
                Longitud: {coordinates.lng.toFixed(6)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLocationDetails; 