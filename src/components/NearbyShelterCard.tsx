import { Link } from 'react-router-dom';
import { Shelter } from '@/services/shelterService';

type NearbyShelterCardProps = {
  shelter: Shelter;
};

const NearbyShelterCard = ({ shelter }: NearbyShelterCardProps) => {
  // Format distance to show in km with 1 decimal
  const formatDistance = (distance?: number) => {
    if (distance === undefined) return 'Distancia desconocida';
    if (distance < 1) return `${Math.round(distance * 1000)} metros`;
    return `${distance.toFixed(1)} km`;
  };

  // Get first photo or placeholder
  const coverImage = shelter.fotos && shelter.fotos.length > 0
    ? shelter.fotos[0]
    : 'https://via.placeholder.com/800x400?text=Sin+Imagen';

  return (
    <div className="card shadow-sm h-100 hover-lift">
      <div 
        className="card-img-top position-relative"
        style={{
          height: '140px',
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {shelter.distance !== undefined && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-primary rounded-pill py-2 px-3">
              <i className="bi bi-geo-alt me-1"></i>
              {formatDistance(shelter.distance)}
            </span>
          </div>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title">{shelter.nombre}</h5>
        <p className="card-text text-muted small mb-2">
          {shelter.direccion.ciudad}, {shelter.direccion.provincia}
        </p>
        <p className="card-text mb-3">
          {shelter.descripcion.length > 100
            ? `${shelter.descripcion.substring(0, 100)}...`
            : shelter.descripcion}
        </p>
        <div className="d-flex align-items-center mb-2">
          <div className="me-2">
            <span className="text-warning">
              {Array(5).fill(0).map((_, i) => (
                <i 
                  key={i} 
                  className={`bi ${i < Math.floor(shelter.rating) 
                    ? 'bi-star-fill' 
                    : i < shelter.rating 
                      ? 'bi-star-half' 
                      : 'bi-star'}`}
                ></i>
              ))}
            </span>
          </div>
          <span className="text-muted small">
            {shelter.rating} ({shelter.reseñas} reseñas)
          </span>
        </div>
      </div>
      <div className="card-footer bg-white border-top-0">
        <div className="d-grid">
          <Link 
            to={`/refugios/${shelter.id}`} 
            className="btn btn-outline-primary"
            aria-label={`Ver detalles de ${shelter.nombre}`}
            tabIndex={0}
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NearbyShelterCard; 