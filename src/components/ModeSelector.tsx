import React, { useState } from 'react';

const ModeSelector: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string>('adopt');

  const modes = [
    { id: 'shelter', label: 'Soy un Refugio', icon: '🏠' },
    { id: 'adopt', label: 'Quiero Adoptar', icon: '🐾' },
    { id: 'help', label: 'Quiero Ayudar', icon: '❤️' },
  ];

  return (
    <div className="card shadow-sm">
      <div className="card-body">
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
  );
};

export default ModeSelector; 