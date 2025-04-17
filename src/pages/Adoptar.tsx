import React from 'react';

const Adoptar: React.FC = () => {
  return (
    <div className="min-h-screen bg-light p-4">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Adoptar una Mascota</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Aquí irá el listado de mascotas disponibles */}
          <p className="text-gray-600">Próximamente: Listado de mascotas disponibles para adopción</p>
        </div>
      </div>
    </div>
  );
};

export default Adoptar; 