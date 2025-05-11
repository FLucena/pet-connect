import { Link } from 'react-router-dom';
import { Shelter } from '@/types/shelter';

type NearbyShelterCardProps = {
  shelter: Shelter;
};

const NearbyShelterCard = ({ shelter }: NearbyShelterCardProps) => {
  // Get first photo or placeholder
  const coverImage = shelter.photos && shelter.photos.length > 0
    ? shelter.photos[0]
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
        {/* Distance is not in Shelter type, so this is commented out unless you add it */}
        {/* {shelter.distance !== undefined && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-primary rounded-pill py-2 px-3">
              <i className="bi bi-geo-alt me-1"></i>
              {formatDistance(shelter.distance)}
            </span>
          </div>
        )} */}
      </div>
      <div className="card-body">
        <h5 className="card-title">{shelter.name}</h5>
        <p className="card-text text-muted small mb-2">
          {shelter.address?.city || shelter.location?.city}, {shelter.address?.province || shelter.location?.state}
        </p>
        <p className="card-text mb-3">
          {shelter.description.length > 100
            ? `${shelter.description.substring(0, 100)}...`
            : shelter.description}
        </p>
        <div className="d-flex align-items-center mb-2">
          <div className="me-2">
            <span className="text-warning">
              {Array(5).fill(0).map((_, i) => (
                <i 
                  key={i} 
                  className={`bi ${i < Math.floor(shelter.reviews?.rating || 0) 
                    ? 'bi-star-fill' 
                    : i < (shelter.reviews?.rating || 0) 
                      ? 'bi-star-half' 
                      : 'bi-star'}`}
                ></i>
              ))}
            </span>
          </div>
          <span className="text-muted small">
            {(shelter.reviews?.rating || 0).toFixed(1)} ({shelter.reviews?.count || 0} reseñas)
          </span>
        </div>
      </div>
      <div className="card-footer bg-white border-top-0">
        <div className="d-grid">
          <Link 
            to={`/refugios/${shelter.id}`} 
            className="btn btn-outline-primary"
            aria-label={`Ver detalles de ${shelter.name}`}
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