import React, { useState } from 'react';
import sheltersData from '@/data/shelters.json';
import ShelterCard from '@/components/ui/cards/ShelterCard';
import ShelterRegistrationModal from '@/components/features/shelter/ShelterRegistrationModal.tsx';
import { NewShelterFormData, SheltersData, Shelter } from '@/types/shelter';

const Shelters: React.FC = () => {
  const { shelters } = sheltersData as SheltersData;
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateRefugio = () => {
    setError(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setError(null);
  };

  const handleSubmitRefugio = async (data: NewShelterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      console.log('New shelter data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowForm(false);
    } catch (err) {
      setError('Error al crear el refugio. Por favor, inténtalo de nuevo.');
      console.error('Error creating shelter:', err);
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading || showForm}
            >
              Crear Nuevo Refugio
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <ShelterRegistrationModal
          isOpen={showForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmitRefugio}
          isLoading={isLoading}
        />

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {shelters.map((shelter: Shelter) => (
            <div key={shelter.id} className="col">
              <ShelterCard shelter={shelter} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shelters; 