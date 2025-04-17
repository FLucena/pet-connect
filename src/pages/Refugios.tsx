import React from 'react';
import refugiosData from '@/data/shelters.json';
import RefugioCard from '@/components/RefugioCard';

interface Refugio {
  id: string;
  nombre: string;
  descripcion: string;
  direccion: {
    calle: string;
    ciudad: string;
    provincia: string;
    codigoPostal: string;
    pais: string;
  };
  contacto: {
    telefono: string;
    email: string;
    web: string;
    redesSociales: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  rating: number;
  reseñas: number;
  fotos: string[];
  estado: string;
}

interface RefugiosData {
  refugios: Refugio[];
}

const Refugios: React.FC = () => {
  const { refugios } = refugiosData as RefugiosData;

  const handleCreateRefugio = () => {
    // TODO: Implement create refugio functionality
    console.log('Create new refugio clicked');
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold mb-2">Refugios</h1>
            <p className="lead text-muted">
              Encuentra el refugio perfecto para adoptar a tu nueva mascota
            </p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <button
              onClick={handleCreateRefugio}
              className="btn btn-primary btn-lg"
            >
              Crear Nuevo Refugio
            </button>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {refugios.map((refugio) => (
            <div key={refugio.id} className="col">
              <RefugioCard refugio={refugio} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Refugios; 