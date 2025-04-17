import React, { useState } from 'react';

const ModeSelector: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string>('adopt');

  const modes = [
    { id: 'shelter', label: 'Soy un Refugio', icon: '🏠' },
    { id: 'adopt', label: 'Quiero Adoptar', icon: '🐾' },
    { id: 'help', label: 'Quiero Ayudar', icon: '❤️' },
  ];

  return (
    <div 
      className="position-relative w-100"
      style={{
        backgroundImage: 'url(../../public/gatito.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: '0% 20%',
        minHeight: '500px'
      }}
    >
      {/* Overlay negro semitransparente */}
      <div 
        className="position-absolute w-100 h-100" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      ></div>
      
      {/* Contenedor del selector alineado a la derecha */}
      <div className="container h-100 position-relative">
        <div className="row h-100">
          <div className="col-12 col-md-6 ms-auto d-flex align-items-center py-5">
            <div className="card bg-white p-4 w-100 shadow-lg">
              <h2 className="card-title text-center mb-4">
                ¿Cómo quieres participar?
              </h2>
              <div className="d-grid gap-3">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`btn btn-lg d-flex align-items-center justify-content-center gap-3 ${
                      selectedMode === mode.id
                        ? 'btn-primary'
                        : 'btn-outline-primary'
                    }`}
                  >
                    <span className="fs-4">{mode.icon}</span>
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    // Aquí iría la lógica para redirigir según el modo seleccionado
                    console.log('Modo seleccionado:', selectedMode);
                  }}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;