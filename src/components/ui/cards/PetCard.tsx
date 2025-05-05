import React from 'react';
import { Link } from 'react-router-dom';
import { Pet } from '@/types/pet';
import { PetCardSkeleton } from './PetCardSkeleton';

interface PetCardProps {
  pet: Pet;
  isLoading?: boolean;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, isLoading = false }) => {
  if (isLoading) {
    return <PetCardSkeleton />;
  }

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="card h-100 shadow-sm transition-all hover-shadow d-flex flex-column">
        <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
          <img
            src={pet.photos[0]}
            alt={`${pet.name} - ${pet.breed}`}
            className="w-100 h-100 object-fit-cover hover-scale"
            style={{ 
              willChange: 'transform',
              transform: 'scale(1)',
              transformOrigin: 'center',
              transition: 'transform 0.3s ease-in-out'
            }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 transition-opacity opacity-0 hover-opacity-100"></div>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{pet.name}</h5>
          <p className="card-text text-muted">{pet.breed}</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="badge bg-primary hover-grow px-3 py-2">{pet.type}</span>
            <span className="badge bg-success hover-grow px-3 py-2">{pet.size}</span>
            <span className="badge bg-info text-dark hover-grow px-3 py-2">{pet.sex}</span>
          </div>
          <div className="mt-auto">
            <Link
              to={`/mascota/${pet.id}`}
              className="btn btn-primary w-100 hover-glow d-flex align-items-center justify-content-center gap-2"
              aria-label={`Ver detalles de ${pet.name}`}
            >
              <i className="bi bi-eye-fill"></i>
              <span className="d-none d-sm-inline">Ver Detalles</span>
              <span className="d-sm-none">Ver</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 