import React from 'react';
import { Pet } from '@/types/pet';

interface PetBehaviorProps {
  behavior: Pet['behavior'];
}

export const PetBehavior: React.FC<PetBehaviorProps> = ({ behavior }) => {
  if (!behavior) {
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">Comportamiento</h2>
        </div>
        <div className="card-body">
          <p className="text-muted mb-0">No hay información disponible sobre el comportamiento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h2 className="h5 mb-0">Comportamiento</h2>
      </div>
      <div className="card-body">
        <ul className="list-unstyled">
          <li><strong>Energía:</strong> {behavior.energy || 'No especificada'}</li>
          <li><strong>Sociabilidad:</strong> {behavior.sociability || 'No especificada'}</li>
          <li><strong>Entrenamiento:</strong> {behavior.training || 'No especificado'}</li>
          <li><strong>Bueno con niños:</strong> {behavior.goodWithChildren ? 'Sí' : 'No'}</li>
          <li><strong>Bueno con perros:</strong> {behavior.goodWithDogs ? 'Sí' : 'No'}</li>
          <li><strong>Bueno con gatos:</strong> {behavior.goodWithCats ? 'Sí' : 'No'}</li>
          {behavior.character && behavior.character.length > 0 && (
            <li>
              <strong>Carácter:</strong>
              <ul>
                {behavior.character.map((trait, index) => (
                  <li key={index}>{trait}</li>
                ))}
              </ul>
            </li>
          )}
          {behavior.specialNeeds && behavior.specialNeeds.length > 0 && (
            <li>
              <strong>Necesidades Especiales:</strong>
              <ul>
                {behavior.specialNeeds.map((need, index) => (
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