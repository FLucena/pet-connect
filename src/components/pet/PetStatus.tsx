import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pet } from '@/types/pet';

interface PetStatusProps {
  status: Pet['status'];
  relationships: Pet['relationships'];
  name: string;
}

export const PetStatus: React.FC<PetStatusProps> = ({ status, relationships, name }) => {
  const navigate = useNavigate();

  if (!status || !relationships) {
    return (
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <button 
              className="btn btn-link text-decoration-none p-0 me-3"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h2 className="h5 mb-0 d-inline">Estado y Relaciones</h2>
          </div>
          <span className="text-muted">{name}</span>
        </div>
        <div className="card-body">
          <p className="text-muted mb-0">No hay información disponible sobre el estado y las relaciones.</p>
        </div>
        <div className="card-footer">
          <button 
            className="btn btn-outline-primary"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <button 
            className="btn btn-link text-decoration-none p-0 me-3"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <h2 className="h5 mb-0 d-inline">Estado y Relaciones</h2>
        </div>
        <span className="text-muted">{name}</span>
      </div>
      <div className="card-body">
        <ul className="list-unstyled">
          <li><strong>Estado actual:</strong> {status || 'No especificado'}</li>
          <li><strong>Refugio actual:</strong> {relationships.currentShelter || 'No especificado'}</li>
          <li><strong>Fecha de ingreso al refugio:</strong> {relationships.shelterEntryDate || 'No especificada'}</li>
          {relationships.currentAdopter && (
            <li><strong>Adoptante actual:</strong> {relationships.currentAdopter}</li>
          )}
          {relationships.adoptionDate && (
            <li><strong>Fecha de adopción:</strong> {relationships.adoptionDate}</li>
          )}
          {relationships.currentFoster && (
            <li><strong>Foster actual:</strong> {relationships.currentFoster}</li>
          )}
        </ul>
      </div>
      <div className="card-footer">
        <button 
          className="btn btn-outline-primary"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Volver
        </button>
      </div>
    </div>
  );
}; 