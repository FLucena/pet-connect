import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getShelterById, Shelter, getSheltersWithCoordinates } from '@/services/shelterService';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const ShelterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'ubicacion' | 'contacto'>('info');
  
  // Get API key from environment variables
  const apiKey = import.meta.env.GOOGLE_MAPS_API_KEY;
 
  // Load shelter data
  useEffect(() => {
    const loadShelter = async () => {
      if (!id) {
        setError('ID de refugio no proporcionado');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // First try to get shelter without coordinates
        const basicShelter = getShelterById(id);
        
        if (!basicShelter) {
          setError('Refugio no encontrado');
          setIsLoading(false);
          return;
        }
        
        // Set basic shelter data first
        setShelter(basicShelter);
        
        // Then get shelters with coordinates if we have an API key
        if (apiKey) {
          const sheltersWithCoordinates = await getSheltersWithCoordinates();
          const fullShelter = sheltersWithCoordinates.find(s => s.id === id);
          if (fullShelter) {
            setShelter(fullShelter);
          }
        }
      } catch (err) {
        console.error('Error loading shelter:', err);
        setError('Error al cargar los datos del refugio');
      } finally {
        setIsLoading(false);
      }
    };

    loadShelter();
  }, [id, apiKey]);

  // Load Google Maps only if we have an API key
  const { isLoaded: isMapLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
    libraries: ["places"],
  });

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando información del refugio...</p>
      </div>
    );
  }

  if (error || !shelter) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error || 'No se pudo cargar la información del refugio'}</p>
          <hr />
          <div className="d-flex justify-content-center">
            <Link to="/refugios" className="btn btn-primary">
              Volver a refugios
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button 
        className="btn btn-outline-secondary mb-4"
        onClick={handleBack}
        aria-label="Volver"
        tabIndex={0}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Volver
      </button>

      {/* Shelter Header */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="display-5 fw-bold mb-2">{shelter.nombre}</h1>
          <p className="text-muted mb-3">
            <i className="bi bi-geo-alt me-1"></i>
            {shelter.direccion.ciudad}, {shelter.direccion.provincia}, {shelter.direccion.pais}
          </p>
          <div className="d-flex align-items-center mb-3">
            <div className="me-3">
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
            <span className="text-muted">
              {shelter.rating} ({shelter.reseñas} reseñas)
            </span>
          </div>
        </div>
        <div className="col-md-4 text-md-end d-flex flex-column justify-content-center">
          <Link to="/contacto" className="btn btn-primary btn-lg mb-2">
            <i className="bi bi-envelope me-2"></i>
            Contactar
          </Link>
          <Link to="/adoptar" className="btn btn-outline-primary">
            <i className="bi bi-heart me-2"></i>
            Ver mascotas disponibles
          </Link>
        </div>
      </div>

      {/* Shelter Images */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="row g-0">
                {shelter.fotos && shelter.fotos.length > 0 ? (
                  shelter.fotos.slice(0, 3).map((foto, index) => (
                    <div 
                      key={index} 
                      className={`col-md-${index === 0 ? '6' : '3'}`}
                    >
                      <img 
                        src={foto} 
                        alt={`${shelter.nombre} - Imagen ${index + 1}`}
                        className="img-fluid w-100 h-100"
                        style={{ 
                          objectFit: 'cover', 
                          height: index === 0 ? '400px' : '200px' 
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="bg-light text-center py-5">
                      <i className="bi bi-image text-muted" style={{ fontSize: '3rem' }}></i>
                      <p className="mt-2 text-muted">No hay imágenes disponibles</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
                aria-label="Información"
                tabIndex={0}
              >
                <i className="bi bi-info-circle me-2"></i>
                Información
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'ubicacion' ? 'active' : ''}`}
                onClick={() => setActiveTab('ubicacion')}
                aria-label="Ubicación"
                tabIndex={0}
              >
                <i className="bi bi-geo-alt me-2"></i>
                Ubicación
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'contacto' ? 'active' : ''}`}
                onClick={() => setActiveTab('contacto')}
                aria-label="Contacto"
                tabIndex={0}
              >
                <i className="bi bi-telephone me-2"></i>
                Contacto
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="row">
        <div className="col-12">
          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title">Sobre el refugio</h3>
                <p className="card-text">{shelter.descripcion}</p>
                
                <h4 className="mt-4">Estado del refugio</h4>
                <span className={`badge ${shelter.estado === 'activo' ? 'bg-success' : 'bg-warning'} mb-3`}>
                  {shelter.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </span>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <h4>Servicios</h4>
                    <ul className="list-group list-group-flush">
                      {shelter.servicios ? (
                        shelter.servicios.map((servicio, index) => (
                          <li key={index} className="list-group-item">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            {servicio}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-muted">No hay información disponible</li>
                      )}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h4>Requisitos de adopción</h4>
                    <ul className="list-group list-group-flush">
                      {shelter.requisitosAdopcion ? (
                        shelter.requisitosAdopcion.map((requisito, index) => (
                          <li key={index} className="list-group-item">
                            <i className="bi bi-clipboard-check text-primary me-2"></i>
                            {requisito}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-muted">No hay información disponible</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <h4>Horarios</h4>
                    {shelter.horarios ? (
                      <table className="table table-bordered">
                        <tbody>
                          {Object.entries(shelter.horarios).map(([dia, horario]) => (
                            <tr key={dia}>
                              <td className="fw-bold text-capitalize">{dia}</td>
                              <td>{horario}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-muted">No hay información disponible</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <h4>Estadísticas</h4>
                    {shelter.estadisticas ? (
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span>Adopciones exitosas:</span>
                          <span className="badge bg-success">{shelter.estadisticas.adopcionesExitosas}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span>Animales rescatados:</span>
                          <span className="badge bg-primary">{shelter.estadisticas.animalesRescatados}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Animales esterilizados:</span>
                          <span className="badge bg-info">{shelter.estadisticas.animalesEsterilizados}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted">No hay información disponible</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Location Tab */}
          {activeTab === 'ubicacion' && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title mb-4">Ubicación</h3>
                
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <h4>Dirección</h4>
                    <address className="mb-0">
                      <p className="mb-1">
                        <i className="bi bi-house-door me-2"></i>
                        {shelter.direccion.calle}
                      </p>
                      <p className="mb-1">
                        <i className="bi bi-geo me-2"></i>
                        {shelter.direccion.ciudad}, {shelter.direccion.provincia}
                      </p>
                      <p className="mb-1">
                        <i className="bi bi-mailbox me-2"></i>
                        CP: {shelter.direccion.codigoPostal}
                      </p>
                      <p className="mb-0">
                        <i className="bi bi-globe me-2"></i>
                        {shelter.direccion.pais}
                      </p>
                    </address>
                  </div>

                  <div className="col-md-6 mb-4">
                    <h4>Llegar</h4>
                    {shelter.coordinates ? (
                      <div className="d-grid gap-2">
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.coordinates.lat},${shelter.coordinates.lng}`}
                          className="btn btn-outline-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Cómo llegar con Google Maps"
                          tabIndex={0}
                        >
                          <i className="bi bi-google me-2"></i>
                          Abrir en Google Maps
                        </a>
                        <a 
                          href={`https://waze.com/ul?ll=${shelter.coordinates.lat},${shelter.coordinates.lng}&navigate=yes`}
                          className="btn btn-outline-info"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Cómo llegar con Waze"
                          tabIndex={0}
                        >
                          <i className="bi bi-geo-alt me-2"></i>
                          Abrir en Waze
                        </a>
                      </div>
                    ) : (
                      <p className="text-muted">Coordenadas no disponibles</p>
                    )}
                  </div>
                </div>

                {/* Map */}
                <div className="mt-3" style={{ height: '400px', width: '100%' }}>
                  {isMapLoaded && shelter.coordinates ? (
                    <GoogleMap
                      mapContainerStyle={{ height: '100%', width: '100%' }}
                      center={shelter.coordinates}
                      zoom={15}
                      options={{
                        disableDefaultUI: false,
                        zoomControl: true,
                        streetViewControl: true,
                        mapTypeControl: true,
                      }}
                    >
                      <Marker
                        position={shelter.coordinates}
                        icon={{
                          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        }}
                      />
                    </GoogleMap>
                  ) : (
                    <div className="bg-light d-flex justify-content-center align-items-center h-100">
                      {!apiKey ? (
                        <div className="text-center">
                          <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '2rem' }}></i>
                          <p className="mt-2">API key de Google Maps no configurada</p>
                        </div>
                      ) : !shelter.coordinates ? (
                        <div className="text-center">
                          <i className="bi bi-geo-alt text-muted" style={{ fontSize: '2rem' }}></i>
                          <p className="mt-2">Coordenadas no disponibles</p>
                        </div>
                      ) : (
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Cargando mapa...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contacto' && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title mb-4">Información de contacto</h3>
                
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Contacto directo</h5>
                      </div>
                      <div className="card-body">
                        <p className="mb-3">
                          <i className="bi bi-telephone me-2"></i>
                          <strong>Teléfono:</strong>{' '}
                          <a href={`tel:${shelter.contacto.telefono}`} className="text-decoration-none">
                            {shelter.contacto.telefono}
                          </a>
                        </p>
                        <p className="mb-3">
                          <i className="bi bi-envelope me-2"></i>
                          <strong>Email:</strong>{' '}
                          <a href={`mailto:${shelter.contacto.email}`} className="text-decoration-none">
                            {shelter.contacto.email}
                          </a>
                        </p>
                        <p className="mb-0">
                          <i className="bi bi-globe me-2"></i>
                          <strong>Sitio web:</strong>{' '}
                          <a 
                            href={shelter.contacto.web.startsWith('http') ? shelter.contacto.web : `https://${shelter.contacto.web}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >
                            {shelter.contacto.web}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-header bg-info text-white">
                        <h5 className="mb-0">Redes sociales</h5>
                      </div>
                      <div className="card-body">
                        {shelter.contacto.redesSociales ? (
                          <>
                            {shelter.contacto.redesSociales.facebook && (
                              <a 
                                href={`https://facebook.com/${shelter.contacto.redesSociales.facebook}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary mb-2 me-2"
                                aria-label="Facebook"
                                tabIndex={0}
                              >
                                <i className="bi bi-facebook me-2"></i>
                                Facebook
                              </a>
                            )}
                            
                            {shelter.contacto.redesSociales.instagram && (
                              <a 
                                href={`https://instagram.com/${shelter.contacto.redesSociales.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-danger mb-2 me-2"
                                aria-label="Instagram"
                                tabIndex={0}
                              >
                                <i className="bi bi-instagram me-2"></i>
                                Instagram
                              </a>
                            )}
                            
                            {shelter.contacto.redesSociales.twitter && (
                              <a 
                                href={`https://twitter.com/${shelter.contacto.redesSociales.twitter.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-info mb-2"
                                aria-label="Twitter"
                                tabIndex={0}
                              >
                                <i className="bi bi-twitter me-2"></i>
                                Twitter
                              </a>
                            )}
                          </>
                        ) : (
                          <p className="text-muted">No hay información de redes sociales disponible</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4>Contactar al refugio</h4>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre</label>
                      <input type="text" className="form-control" id="nombre" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="asunto" className="form-label">Asunto</label>
                      <input type="text" className="form-control" id="asunto" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mensaje" className="form-label">Mensaje</label>
                      <textarea className="form-control" id="mensaje" rows={5} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-send me-2"></i>
                      Enviar mensaje
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterDetail; 