import React from 'react';
import { Pet } from '@/types/pet';

interface PetCareProps {
  care: Pet['care'];
}

export const PetCare: React.FC<PetCareProps> = ({ care }) => {
  if (!care) {
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">Cuidados</h2>
        </div>
        <div className="card-body">
          <p className="text-muted mb-0">No hay información disponible sobre los cuidados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h2 className="h5 mb-0">Cuidados</h2>
      </div>
      <div className="card-body">
        <ul className="list-unstyled">
          <li><strong>Alimentación:</strong> {care.feeding || 'No especificada'}</li>
          <li><strong>Ejercicio:</strong> {care.exercise || 'No especificado'}</li>
          <li><strong>Aseo:</strong> {care.grooming || 'No especificado'}</li>
          {care.specialNeeds && care.specialNeeds.length > 0 && (
            <li>
              <strong>Necesidades Especiales:</strong>
              <ul>
                {care.specialNeeds.map((need, index) => (
                  <li key={index}>{need}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}; 