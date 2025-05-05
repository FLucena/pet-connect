import React from 'react';
import { Pet } from '@/types/pet';

interface PetHealthProps {
  health: Pet['health'];
}

export const PetHealth: React.FC<PetHealthProps> = ({ health }) => {
  if (!health) {
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">Salud</h2>
        </div>
        <div className="card-body">
          <p className="text-muted mb-0">No hay información disponible sobre la salud.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h2 className="h5 mb-0">Salud</h2>
      </div>
      <div className="card-body">
        <ul className="list-unstyled">
          <li><strong>Estado:</strong> {health.status || 'No especificado'}</li>
          {health.vaccines && health.vaccines.length > 0 ? (
            <li><strong>Vacunas:</strong> {health.vaccines.join(', ')}</li>
          ) : (
            <li><strong>Vacunas:</strong> No especificadas</li>
          )}
          <li><strong>Última vacuna:</strong> {health.lastVaccine || 'No especificada'}</li>
          <li><strong>Esterilizado:</strong> {health.sterilized ? 'Sí' : 'No'}</li>
          {health.sterilized && health.sterilizationDate && (
            <li><strong>Fecha de esterilización:</strong> {health.sterilizationDate}</li>
          )}
          <li><strong>Microchip:</strong> {health.microchip ? 'Sí' : 'No'}</li>
          {health.microchip && health.microchipNumber && (
            <li><strong>Número de microchip:</strong> {health.microchipNumber}</li>
          )}
          {health.specialConditions && health.specialConditions.length > 0 && (
            <li>
              <strong>Condiciones Especiales:</strong>
              <ul>
                {health.specialConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </li>
          )}
          {health.allergies && health.allergies.length > 0 && (
            <li>
              <strong>Alergias:</strong>
              <ul>
                {health.allergies.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}; 