import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModeSelector: React.FC = () => {
  const navigate = useNavigate();

  const modes = [
    { id: 'shelter', label: 'Soy un Refugio', icon: '🏠', path: '/refugios' },
    { id: 'adopt', label: 'Quiero Adoptar', icon: '🐾', path: '/adoptar' },
    { id: 'help', label: 'Quiero Ayudar', icon: '❤️', path: '/donar' },
  ];

  return (
    <div 
      className="position-relative w-100 d-flex align-items-center"
      style={{
        backgroundImage: 'url(/gatito.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: '0% 20%',
        minHeight: '100vh'
      }}
    >
      {/* Overlay negro semitransparente */}
      <div 
        className="position-absolute w-100 h-100" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      ></div>
      
      {/* Contenedor del selector alineado a la derecha */}
      <div className="container position-relative">
        <div className="row">
          <div className="col-12 col-md-6 ms-auto">
            <div className="card bg-white p-4 w-100 shadow-lg">
              <h2 className="card-title text-center mb-4">
                ¿Cómo quieres participar?
              </h2>
              <div className="d-grid gap-3">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => navigate(mode.path)}
                    className="btn btn-lg d-flex align-items-center justify-content-center gap-3 btn-outline-primary"
                  >
                    <span className="fs-4">{mode.icon}</span>
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;