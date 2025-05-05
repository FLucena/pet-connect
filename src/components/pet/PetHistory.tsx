import React from 'react';
import { Pet } from '@/types/pet';

interface PetHistoryProps {
  history: Pet['history'];
}

export const PetHistory: React.FC<PetHistoryProps> = ({ history }) => {
  if (!history) {
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">Historia</h2>
        </div>
        <div className="card-body">
          <p className="text-muted mb-0">No hay información disponible sobre la historia.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h2 className="h5 mb-0">Historia</h2>
      </div>
      <div className="card-body">
        <ul className="list-unstyled">
          <li><strong>Origen:</strong> {history.origin || 'No especificado'}</li>
          <li><strong>Fecha de rescate:</strong> {history.rescueDate || 'No especificada'}</li>
          <li><strong>Circunstancias del rescate:</strong> {history.rescueCircumstances || 'No especificadas'}</li>
          <li><strong>Historia médica:</strong> {history.medicalHistory || 'No especificada'}</li>
          <li><strong>Notas especiales:</strong> {history.specialNotes || 'No especificadas'}</li>
        </ul>
      </div>
    </div>
  );
}; 