import React, { useState, useEffect } from 'react';
import sheltersData from '@/data/shelters.json';
import ShelterCard from '@/components/ui/cards/ShelterCard';
import ShelterRegistrationModal from '@/components/features/shelter/ShelterRegistrationModal.tsx';
import { NewShelterFormData, SheltersData, Shelter } from '@/types/shelter';

const Shelters: React.FC = () => {
  
  const mockShelters = (sheltersData as unknown as SheltersData).shelters;
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [useMockData, setUseMockData] = useState(true); // Always start with mock data
  const [isLoadingShelters, setIsLoadingShelters] = useState(false);

  useEffect(() => {
    const fetchShelters = async () => {  
      if (useMockData) {
        setShelters(mockShelters);
        return;
      }

      try {
        setIsLoadingShelters(true);
        const response = await fetch('/api/shelters');
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error response:', errorText);
          throw new Error(`Failed to fetch shelters: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        setShelters(data);
      } catch (err) {
        console.error('Error fetching shelters:', err);
        setError('Error al cargar los refugios. Por favor, inténtalo de nuevo.');
      } finally {
        setIsLoadingShelters(false);
      }
    };

    fetchShelters();
  }, [useMockData, mockShelters]);

  const handleToggleMockData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseMockData(e.target.checked);
  };

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
      
      const response = await fetch('/api/shelters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create shelter');
      
      // Refresh shelters list
      const updatedResponse = await fetch('/api/shelters');
      if (!updatedResponse.ok) throw new Error('Failed to fetch updated shelters');
      const updatedData = await updatedResponse.json();
      setShelters(updatedData);
      
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
            {import.meta.env.MODE === 'development' && (
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="useMockData"
                  checked={useMockData}
                  onChange={handleToggleMockData}
                />
                <label className="form-check-label" htmlFor="useMockData">
                  {useMockData ? 'Datos de Prueba' : 'Base de Datos'}
                </label>
              </div>
            )}
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

        {isLoadingShelters ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {shelters.map((shelter: Shelter) => (
              <div key={shelter.id} className="col">
                <ShelterCard shelter={shelter} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shelters; 