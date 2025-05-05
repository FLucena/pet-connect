import React from 'react';
import { Link } from 'react-router-dom';
import { Shelter } from '@/types/shelter';

interface ShelterCardProps {
  shelter: Shelter;
}

const ShelterCard: React.FC<ShelterCardProps> = ({ shelter }) => {
  const renderStars = (rating: number | undefined) => {
    const stars = [];
    const ratingValue = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`fs-5 ${
            i <= Math.floor(ratingValue) ? 'text-warning' : 'text-secondary'
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
        {shelter.photos?.[0] ? (
          <img
            src={shelter.photos[0]}
            alt={shelter.name}
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
        {shelter.address?.city && (
          <div className="position-absolute top-0 end-0 m-2 bg-white rounded-pill px-2 py-1 small fw-semibold shadow-sm">
            {shelter.address.city}
          </div>
        )}
      </div>
      
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{shelter.name}</h5>
          {shelter.reviews && (
            <div className="d-flex align-items-center">
              {renderStars(shelter.reviews.rating)}
              <span className="ms-1 small text-secondary">({shelter.reviews.count || 0})</span>
            </div>
          )}
        </div>
        
        <p className="card-text small text-secondary mb-3" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {shelter.description}
        </p>
        
        <div className="d-flex justify-content-between align-items-center small">
          <div className="d-flex align-items-center text-secondary">
            <i className="bi bi-telephone me-1"></i>
            {shelter.contact?.phone}
          </div>
          <span className="text-primary fw-medium">Ver detalles</span>
        </div>
      </div>
    </Link>
  );
};

export default ShelterCard; 