import React from 'react';
import ModeSelector from './ModeSelector';
import Logo from './Logo';
const HomeContent: React.FC = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="py-5 position-relative">
        <div className="container py-5">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end mb-4 mb-md-0">
              <div className="w-100">
                <Logo size="large" />
              </div>
            </div>
            <div className="col-12 col-md-6 text-center text-md-left d-flex flex-column align-items-center align-items-md-start">
              <h1 className="display-4 fw-bold mb-5">
                Conectando Refugios con Hogares
              </h1>
              <p className="lead text-secondary mb-4" style={{ maxWidth: '600px', margin: '0 auto 0 0' }}>
                Pet Connect es una plataforma que facilita la adopción responsable de mascotas,
                conectando refugios de animales con personas que buscan dar un hogar amoroso
                a un nuevo miembro de la familia.
              </p>
            </div>
          </div>
        </div>
        {/* Sombra inferior */}
        <div className="position-absolute bottom-0 w-100" style={{ height: '15px', boxShadow: '0 6px 6px -6px rgba(0,0,0,0.3)', zIndex: 10 }}></div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <h2 className="text-center mb-5 fw-bold">¿Cómo funciona Pet Connect?</h2> {/* Agregue un titulo al final de la pagina principal para inicitar al usuario a bajar/avanzar con la informacion de la pagina */}
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
      <section className="py-5 px-0 bg-white">
              <ModeSelector />
      </section>
    </div>
  );
};

export default HomeContent; 