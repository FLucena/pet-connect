import React from 'react';
import { Shelter } from '@/types/shelter';

interface ShelterInfoTabProps {
  shelter: Shelter;
}

const ShelterInfoTab: React.FC<ShelterInfoTabProps> = ({ shelter }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Sobre el refugio</h3>
        <p className="card-text">{shelter.description}</p>
        
        <h4 className="mt-4">Estado del refugio</h4>
        <span className={`badge ${shelter.status === 'active' ? 'bg-success' : 'bg-warning'} mb-3`}>
          {shelter.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>

        <div className="row mt-4">
          <div className="col-md-6">
            <h4>Servicios</h4>
            <ul className="list-group list-group-flush">
              {shelter.services ? (
                shelter.services.map((service: string, index: number) => (
                  <li key={index} className="list-group-item">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    {service}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">No hay información disponible</li>
              )}
            </ul>
          </div>
          <div className="col-md-6">
            <h4>Requisitos de adopción</h4>
            <ul className="list-group list-group-flush">
              {shelter.adoptionRequirements ? (
                shelter.adoptionRequirements.map((requirement: string, index: number) => (
                  <li key={index} className="list-group-item">
                    <i className="bi bi-clipboard-check text-primary me-2"></i>
                    {requirement}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">No hay información disponible</li>
              )}
            </ul>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <h4>Horarios</h4>
            {shelter.openingHours ? (
              <table className="table table-bordered">
                <tbody>
                  {Object.entries(shelter.openingHours).map(([day, hours]) => (
                    <tr key={day}>
                      <td className="fw-bold text-capitalize">{day}</td>
                      <td>{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">No hay información disponible</p>
            )}
          </div>
          <div className="col-md-6">
            <h4>Estadísticas</h4>
            {shelter.statistics ? (
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>Adopciones exitosas:</span>
                  <span className="badge bg-success">{shelter.statistics.successfulAdoptions}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>Animales rescatados:</span>
                  <span className="badge bg-primary">{shelter.statistics.rescuedAnimals}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Animales esterilizados:</span>
                  <span className="badge bg-info">{shelter.statistics.sterilizedAnimals}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted">No hay información disponible</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterInfoTab; 