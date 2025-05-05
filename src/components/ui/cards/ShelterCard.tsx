import React from 'react';
import { Link } from 'react-router-dom';

interface Shelter {
  id: string;
  nombre: string;
  descripcion: string;
  direccion: {
    ciudad: string;
    provincia: string;
  };
  contacto: {
    telefono: string;
    email: string;
  };
  rating: number; 
  reseñas: number;
  fotos: string[];
}

interface ShelterCardProps {
  shelter: Shelter;
}

const ShelterCard: React.FC<ShelterCardProps> = ({ shelter }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`fs-5 ${
            i <= Math.floor(rating) ? 'text-warning' : 'text-secondary'
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link
      to={`/refugios/${shelter.id}`}
      className="card h-100 text-decoration-none text-dark hover-shadow"
      style={{ transition: 'all 0.3s ease' }}
    >
      <div className="position-relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {shelter.fotos && shelter.fotos.length > 0 ? (
          <img
            src={shelter.fotos[0]}
            alt={shelter.nombre}
            className="card-img-top h-100 object-fit-cover transition-transform duration-300 hover-scale"
            style={{ 
              willChange: 'transform',
              transform: 'scale(1)',
              transformOrigin: 'center'
            }}
          />
        ) : (
          <div className="card-img-top h-100 d-flex align-items-center justify-content-center bg-light text-secondary">
            No hay imagen disponible
          </div>
        )}
        <div className="position-absolute top-0 end-0 m-2 bg-white rounded-pill px-2 py-1 small fw-semibold shadow-sm">
          {shelter.direccion.ciudad}
        </div>
      </div>
      
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{shelter.nombre}</h5>
          <div className="d-flex align-items-center">
            {renderStars(shelter.rating)}
            <span className="ms-1 small text-secondary">({shelter.reseñas})</span>
          </div>
        </div>
        
        <p className="card-text small text-secondary mb-3" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {shelter.descripcion}
        </p>
        
        <div className="d-flex justify-content-between align-items-center small">
          <div className="d-flex align-items-center text-secondary">
            <i className="bi bi-telephone me-1"></i>
            {shelter.contacto.telefono}
          </div>
          <span className="text-primary fw-medium">Ver detalles</span>
        </div>
      </div>
    </Link>
  );
};

export default ShelterCard; 