import React from 'react';
import { Pet } from '@/types/pet';

interface PetInfoProps {
  pet: Pet;
}

export const PetInfo: React.FC<PetInfoProps> = ({ pet }) => (
  <div className="card shadow-sm mb-4">
    <div className="card-body">
      <h1 className="card-title h2 mb-3">{pet.name}</h1>
      <div className="d-flex flex-wrap gap-2 mb-3">
        <span className="badge bg-primary">{pet.type}</span>
        <span className="badge bg-success">{pet.breed}</span>
        <span className="badge bg-info text-dark">{pet.sex}</span>
        <span className="badge bg-secondary">{pet.size}</span>
        {pet.age ? (
          <span className="badge bg-warning text-dark">
            {pet.age.years} años {pet.age.months > 0 && `y ${pet.age.months} meses`}
          </span>
        ) : (
          <span className="badge bg-warning text-dark">Edad no especificada</span>
        )}
      </div>
      <p className="card-text">
        <strong>Color:</strong> {pet.color || 'No especificado'}<br />
        <strong>Peso:</strong> {pet.weight ? `${pet.weight} kg` : 'No especificado'}
      </p>
    </div>
  </div>
); 