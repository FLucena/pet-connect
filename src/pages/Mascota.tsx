import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mascotasData from '../data/mascotas.json';
import type { Mascota } from '../types/mascota';

const Mascota: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photoTransition, setPhotoTransition] = useState<'next' | 'prev' | null>(null);

  useEffect(() => {
    const loadMascota = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const mascotaEncontrada = mascotasData.mascotas.find(m => m.id === id);
        
        if (!mascotaEncontrada) {
          setError('Mascota no encontrada');
          return;
        }
        
        setMascota(mascotaEncontrada as Mascota);
      } catch (err) {
        setError('Error al cargar la información de la mascota');
        console.error('Error loading pet:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMascota();
  }, [id]);

  const handlePreviousPhoto = () => {
    setPhotoTransition('prev');
    setTimeout(() => {
      setCurrentPhotoIndex(prev => 
        prev === 0 ? (mascota?.fotos.length || 1) - 1 : prev - 1
      );
      setPhotoTransition(null);
    }, 300);
  };

  const handleNextPhoto = () => {
    setPhotoTransition('next');
    setTimeout(() => {
      setCurrentPhotoIndex(prev => 
        prev === (mascota?.fotos.length || 1) - 1 ? 0 : prev + 1
      );
      setPhotoTransition(null);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 bg-light p-4">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando información de la mascota...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !mascota) {
    return (
      <div className="min-vh-100 bg-light p-4">
        <div className="container">
          <div className="alert alert-danger text-center" role="alert">
            {error || 'Mascota no encontrada'}
          </div>
          <div className="text-center mt-4">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/adoptar')}
            >
              Volver a la lista de mascotas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container">
        <div className="row">
          {/* Fotos */}
          <div className="col-12 col-lg-6 mb-4">
            <div className="card shadow-sm">
              <div className="position-relative overflow-hidden" style={{ height: '400px' }}>
                <div 
                  className={`position-absolute w-100 h-100 transition-all duration-300 ${
                    photoTransition === 'next' ? 'slide-out-left' : 
                    photoTransition === 'prev' ? 'slide-out-right' : ''
                  }`}
                  style={{
                    transform: photoTransition === 'next' ? 'translateX(-100%)' : 
                              photoTransition === 'prev' ? 'translateX(100%)' : 'translateX(0)',
                    opacity: photoTransition ? 0 : 1
                  }}
                >
                  <img
                    src={mascota?.fotos[currentPhotoIndex]}
                    alt={`${mascota?.nombre} - ${mascota?.raza}`}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                {mascota?.fotos.length > 1 && (
                  <>
                    <button
                      className="position-absolute top-50 start-0 translate-middle-y btn btn-light rounded-circle shadow-sm opacity-75 hover-opacity-100 transition-opacity"
                      onClick={handlePreviousPhoto}
                      aria-label="Foto anterior"
                      style={{ zIndex: 1 }}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                      className="position-absolute top-50 end-0 translate-middle-y btn btn-light rounded-circle shadow-sm opacity-75 hover-opacity-100 transition-opacity"
                      onClick={handleNextPhoto}
                      aria-label="Foto siguiente"
                      style={{ zIndex: 1 }}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </>
                )}
              </div>
              <div className="card-body">
                <div className="d-flex gap-2 overflow-auto">
                  {mascota?.fotos.map((foto, index) => (
                    <img
                      key={index}
                      src={foto}
                      alt={`${mascota.nombre} - ${mascota.raza} - Foto ${index + 1}`}
                      className={`img-thumbnail cursor-pointer transition-all duration-200 ${
                        currentPhotoIndex === index ? 'border-primary scale-105' : 'opacity-75'
                      }`}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      onClick={() => {
                        setPhotoTransition(index > currentPhotoIndex ? 'next' : 'prev');
                        setTimeout(() => {
                          setCurrentPhotoIndex(index);
                          setPhotoTransition(null);
                        }, 300);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Información */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h1 className="card-title h2 mb-3">{mascota.nombre}</h1>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-primary">{mascota.tipo}</span>
                  <span className="badge bg-success">{mascota.raza}</span>
                  <span className="badge bg-info text-dark">{mascota.sexo}</span>
                  <span className="badge bg-secondary">{mascota.tamaño}</span>
                  <span className="badge bg-warning text-dark">
                    {mascota.edad.años} años {mascota.edad.meses > 0 && `y ${mascota.edad.meses} meses`}
                  </span>
                </div>
                <p className="card-text">
                  <strong>Color:</strong> {mascota.color}<br />
                  <strong>Peso:</strong> {mascota.peso} kg
                </p>
              </div>
            </div>

            {/* Características Físicas */}
            <div className="card shadow-sm mb-4">
              <div className="card-header">
                <h2 className="h5 mb-0">Características Físicas</h2>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><strong>Pelaje:</strong> {mascota.caracteristicasFisicas.pelaje}</li>
                  {mascota.caracteristicasFisicas.orejas && (
                    <li><strong>Orejas:</strong> {mascota.caracteristicasFisicas.orejas}</li>
                  )}
                  {mascota.caracteristicasFisicas.cola && (
                    <li><strong>Cola:</strong> {mascota.caracteristicasFisicas.cola}</li>
                  )}
                  {mascota.caracteristicasFisicas.patron && (
                    <li><strong>Patrón:</strong> {mascota.caracteristicasFisicas.patron}</li>
                  )}
                  {mascota.caracteristicasFisicas.marcasEspeciales.length > 0 && (
                    <li>
                      <strong>Marcas Especiales:</strong>
                      <ul>
                        {mascota.caracteristicasFisicas.marcasEspeciales.map((marca, index) => (
                          <li key={index}>{marca}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Salud */}
            <div className="card shadow-sm mb-4">
              <div className="card-header">
                <h2 className="h5 mb-0">Salud</h2>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><strong>Estado:</strong> {mascota.salud.estado}</li>
                  <li><strong>Vacunas:</strong> {mascota.salud.vacunas.join(', ')}</li>
                  <li><strong>Última vacuna:</strong> {mascota.salud.ultimaVacuna}</li>
                  <li><strong>Esterilizado:</strong> {mascota.salud.esterilizado ? 'Sí' : 'No'}</li>
                  {mascota.salud.esterilizado && (
                    <li><strong>Fecha de esterilización:</strong> {mascota.salud.fechaEsterilizacion}</li>
                  )}
                  <li><strong>Microchip:</strong> {mascota.salud.microchip ? 'Sí' : 'No'}</li>
                  {mascota.salud.microchip && (
                    <li><strong>Número de microchip:</strong> {mascota.salud.numeroMicrochip}</li>
                  )}
                  {mascota.salud.condicionesEspeciales.length > 0 && (
                    <li>
                      <strong>Condiciones Especiales:</strong>
                      <ul>
                        {mascota.salud.condicionesEspeciales.map((condicion, index) => (
                          <li key={index}>{condicion}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                  {mascota.salud.alergias.length > 0 && (
                    <li>
                      <strong>Alergias:</strong>
                      <ul>
                        {mascota.salud.alergias.map((alergia, index) => (
                          <li key={index}>{alergia}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Comportamiento */}
            <div className="card shadow-sm mb-4">
              <div className="card-header">
                <h2 className="h5 mb-0">Comportamiento</h2>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><strong>Energía:</strong> {mascota.comportamiento.energia}</li>
                  <li><strong>Sociabilidad:</strong> {mascota.comportamiento.sociabilidad}</li>
                  <li><strong>Entrenamiento:</strong> {mascota.comportamiento.entrenamiento}</li>
                  <li><strong>Bueno con niños:</strong> {mascota.comportamiento.buenoConNinos ? 'Sí' : 'No'}</li>
                  <li><strong>Bueno con perros:</strong> {mascota.comportamiento.buenoConPerros ? 'Sí' : 'No'}</li>
                  <li><strong>Bueno con gatos:</strong> {mascota.comportamiento.buenoConGatos ? 'Sí' : 'No'}</li>
                  <li>
                    <strong>Carácter:</strong>
                    <ul>
                      {mascota.comportamiento.caracter.map((trait, index) => (
                        <li key={index}>{trait}</li>
                      ))}
                    </ul>
                  </li>
                  {mascota.comportamiento.necesidadesEspeciales.length > 0 && (
                    <li>
                      <strong>Necesidades Especiales:</strong>
                      <ul>
                        {mascota.comportamiento.necesidadesEspeciales.map((necesidad, index) => (
                          <li key={index}>{necesidad}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Historia */}
            <div className="card shadow-sm mb-4">
              <div className="card-header">
                <h2 className="h5 mb-0">Historia</h2>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><strong>Origen:</strong> {mascota.historia.origen}</li>
                  <li><strong>Fecha de rescate:</strong> {mascota.historia.fechaRescate}</li>
                  <li><strong>Circunstancias del rescate:</strong> {mascota.historia.circunstanciasRescate}</li>
                  <li><strong>Historia médica:</strong> {mascota.historia.historiaMedica}</li>
                  <li><strong>Notas especiales:</strong> {mascota.historia.notasEspeciales}</li>
                </ul>
              </div>
            </div>

            {/* Cuidados */}
            <div className="card shadow-sm mb-4">
              <div className="card-header">
                <h2 className="h5 mb-0">Cuidados</h2>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><strong>Alimentación:</strong> {mascota.cuidados.alimentacion}</li>
                  <li><strong>Ejercicio:</strong> {mascota.cuidados.ejercicio}</li>
                  <li><strong>Aseo:</strong> {mascota.cuidados.aseo}</li>
                  {mascota.cuidados.necesidadesEspeciales.length > 0 && (
                    <li>
                      <strong>Necesidades Especiales:</strong>
                      <ul>
                        {mascota.cuidados.necesidadesEspeciales.map((necesidad, index) => (
                          <li key={index}>{necesidad}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Estado y Relaciones */}
            <div className="card shadow-sm">
              <div className="card-header">
                <h2 className="h5 mb-0">Estado y Relaciones</h2>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><strong>Estado actual:</strong> {mascota.estado}</li>
                  <li><strong>Refugio actual:</strong> {mascota.relaciones.refugioActual}</li>
                  <li><strong>Fecha de ingreso al refugio:</strong> {mascota.relaciones.fechaIngresoRefugio}</li>
                  {mascota.relaciones.adoptanteActual && (
                    <li><strong>Adoptante actual:</strong> {mascota.relaciones.adoptanteActual}</li>
                  )}
                  {mascota.relaciones.fechaAdopcion && (
                    <li><strong>Fecha de adopción:</strong> {mascota.relaciones.fechaAdopcion}</li>
                  )}
                  {mascota.relaciones.fosterActual && (
                    <li><strong>Foster actual:</strong> {mascota.relaciones.fosterActual}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mascota; 