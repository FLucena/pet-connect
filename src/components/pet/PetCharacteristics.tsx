import React from 'react';
import { Pet } from '@/types/pet';

interface PetCharacteristicsProps {
  characteristics: Pet['physicalCharacteristics'];
}

export const PetCharacteristics: React.FC<PetCharacteristicsProps> = ({ characteristics }) => {
  if (!characteristics) {
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">Características Físicas</h2>
        </div>
        <div className="card-body">
          <p className="text-muted mb-0">No hay información disponible sobre las características físicas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h2 className="h5 mb-0">Características Físicas</h2>
      </div>
      <div className="card-body">
        <ul className="list-unstyled">
          <li><strong>Pelaje:</strong> {characteristics.coat || 'No especificado'}</li>
          {characteristics.ears && (
            <li><strong>Orejas:</strong> {characteristics.ears}</li>
          )}
          {characteristics.tail && (
            <li><strong>Cola:</strong> {characteristics.tail}</li>
          )}
          {characteristics.pattern && (
            <li><strong>Patrón:</strong> {characteristics.pattern}</li>
          )}
          {characteristics.specialMarks && characteristics.specialMarks.length > 0 && (
            <li>
              <strong>Marcas Especiales:</strong>
              <ul>
                {characteristics.specialMarks.map((mark, index) => (
                  <li key={index}>{mark}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}; 