import React from 'react';
import { Shelter } from '@/types/shelter';

interface ShelterContactTabProps {
  shelter: Shelter;
}

const ShelterContactTab: React.FC<ShelterContactTabProps> = ({ shelter }) => {
  return (
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
  );
};

export default ShelterContactTab; 