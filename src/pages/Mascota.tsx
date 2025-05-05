import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import petsData from '@/data/pets.json'
import type { Pet } from '@/types/pet';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { handleApiError } from '@/utils/errorHandler';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { PhotoGallery } from '@/components/pet/PhotoGallery';
import { PetInfo } from '@/components/pet/PetInfo';
import { PetCharacteristics } from '@/components/pet/PetCharacteristics';
import { PetHealth } from '@/components/pet/PetHealth';
import { PetBehavior } from '@/components/pet/PetBehavior';
import { PetHistory } from '@/components/pet/PetHistory';
import { PetCare } from '@/components/pet/PetCare';
import { PetStatus } from '@/components/pet/PetStatus';

const PetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPet = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundPet = (petsData as unknown as Pet[]).find(p => p.id === id);
        
        if (!foundPet) {
          throw new Error('Mascota no encontrada');
        }
        
        setPet(foundPet);
      } catch (err) {
        const apiError = handleApiError(err);
        setError(apiError.message);
        console.error('Error loading pet:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPet();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-vh-100 bg-light p-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 mb-4">
              <div className="card shadow-sm">
                <div className="position-relative overflow-hidden" style={{ height: '400px' }}>
                  <div className="skeleton-image w-100 h-100"></div>
                </div>
                <div className="card-body">
                  <div className="d-flex gap-2">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="skeleton-image" style={{ width: '100px', height: '100px' }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <div className="skeleton-title mb-3"></div>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <div className="skeleton-badge"></div>
                    <div className="skeleton-badge"></div>
                    <div className="skeleton-badge"></div>
                  </div>
                  <div className="skeleton-text mb-2"></div>
                  <div className="skeleton-text"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <ErrorMessage 
        error={error || 'Mascota no encontrada'} 
        onRetry={() => navigate('/adoptar')}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-vh-100 bg-light p-4">
        <div className="container">
          <div className="d-flex align-items-center gap-3 mb-4">
            <button 
              className="btn btn-link text-decoration-none p-0"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h1 className="h2 mb-0">{pet.name}</h1>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6 mb-4">
              {pet.photos && pet.photos.length > 0 ? (
                <PhotoGallery photos={pet.photos} name={pet.name} breed={pet.breed} />
              ) : (
                <div className="card shadow-sm">
                  <div className="position-relative overflow-hidden" style={{ height: '400px' }}>
                    <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                      <i className="bi bi-image text-muted" style={{ fontSize: '3rem' }}></i>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-muted text-center mb-0">No hay fotos disponibles</p>
                  </div>
                </div>
              )}
            </div>
            <div className="col-12 col-lg-6">
              <PetInfo pet={pet} />
              <PetCharacteristics characteristics={pet.physicalCharacteristics} />
              <PetHealth health={pet.health} />
              <PetBehavior behavior={pet.behavior} />
              <PetHistory history={pet.history} />
              <PetCare care={pet.care} />
              <PetStatus status={pet.status} relationships={pet.relationships} name={pet.name} />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PetDetail; 