import React from 'react';
import ModeSelector from './ModeSelector';

const HomeContent: React.FC = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="py-5">
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold mb-4">
            Conectando Refugios con Familias Amorosas
          </h1>
          <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Pet Connect es una plataforma que facilita la adopción responsable de mascotas,
            conectando refugios de animales con personas que buscan dar un hogar amoroso
            a un nuevo miembro de la familia.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="display-4 mb-3">🏠</div>
                <h3 className="h4 mb-3">Para Refugios</h3>
                <p className="text-muted">
                  Publica información sobre los animales disponibles para adopción y encuentra
                  familias responsables.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="display-4 mb-3">🐾</div>
                <h3 className="h4 mb-3">Para Adoptantes</h3>
                <p className="text-muted">
                  Encuentra tu compañero perfecto y da un hogar a un animal que lo necesita.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="display-4 mb-3">❤️</div>
                <h3 className="h4 mb-3">Para Voluntarios</h3>
                <p className="text-muted">
                  Ayuda a los refugios con donaciones, voluntariado o difusión de sus causas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mode Selector Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <ModeSelector />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent; 