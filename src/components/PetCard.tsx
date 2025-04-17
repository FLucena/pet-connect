import React from 'react';
import { Link } from 'react-router-dom';
import { Mascota } from '../types/mascota';

interface PetCardProps {
  mascota: Mascota;
}

export const PetCard: React.FC<PetCardProps> = ({ mascota }) => (
  <div className="col">
    <div className="card h-100 shadow-sm transition-all hover-shadow">
      <div className="overflow-hidden position-relative" style={{ height: '200px' }}>
        <img
          src={mascota.fotos[0]}
          alt={`${mascota.nombre} - ${mascota.raza}`}
          className="w-100 h-100 object-fit-cover transition-transform duration-300 hover-scale"
          style={{ 
            willChange: 'transform',
            transform: 'scale(1)',
            transformOrigin: 'center'
          }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 transition-opacity opacity-0 hover-opacity-100"></div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{mascota.nombre}</h5>
        <p className="card-text text-muted">{mascota.raza}</p>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge bg-primary hover-grow">{mascota.tipo}</span>
          <span className="badge bg-success hover-grow">{mascota.tamaño}</span>
          <span className="badge bg-info text-dark hover-grow">{mascota.sexo}</span>
        </div>
        <Link
          to={`/mascota/${mascota.id}`}
          className="btn btn-primary w-100 hover-glow"
          aria-label={`Ver detalles de ${mascota.nombre}`}
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  </div>
); 