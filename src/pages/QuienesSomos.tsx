import React from 'react';

const QuienesSomos: React.FC = () => {
  return (
    <div className="min-h-screen bg-light p-4">
      <div className="container py-5">
        <h1 className="text-3xl font-bold mb-6">Quiénes Somos</h1>
        
        <div className="row gy-4">
          <div className="col-md-6">
            <h2 className="h3 mb-4">Nuestra Misión</h2>
            <p className="text-muted mb-4">
              En Pet Connect, nos dedicamos a crear conexiones significativas entre refugios de animales y personas que desean adoptar una mascota. Nuestra plataforma facilita el proceso de adopción responsable, asegurando que cada animal encuentre un hogar amoroso.
            </p>
          </div>
          
          <div className="col-md-6">
            <h2 className="h3 mb-4">Nuestra Visión</h2>
            <p className="text-muted mb-4">
              Aspiramos a ser la plataforma líder en conectar refugios con adoptantes potenciales, promoviendo la adopción responsable y el bienestar animal en toda la comunidad.
            </p>
          </div>

          <div className="col-12">
            <h2 className="h3 mb-4">Nuestros Valores</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 mb-3">Compromiso</h3>
                    <p className="text-muted">
                      Nos comprometemos a facilitar adopciones responsables y promover el bienestar animal.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 mb-3">Transparencia</h3>
                    <p className="text-muted">
                      Mantenemos procesos claros y honestos en todas nuestras operaciones.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 mb-3">Responsabilidad</h3>
                    <p className="text-muted">
                      Promovemos la adopción responsable y el cuidado adecuado de las mascotas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mt-5">
            <h2 className="h3 mb-4">Nuestro Equipo</h2>
            <p className="text-muted mb-4">
              Somos un equipo apasionado de amantes de los animales, desarrolladores y profesionales comprometidos con hacer una diferencia en la vida de las mascotas y las personas que desean adoptarlas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos; 