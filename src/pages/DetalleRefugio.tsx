import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getShelterById } from '@/services/shelterService';
import { useJsApiLoader } from '@react-google-maps/api';
import ShelterInfoTab from '@/components/shelter/ShelterInfoTab';
import ShelterLocationTab from '@/components/shelter/ShelterLocationTab';
import ShelterContactTab from '@/components/shelter/ShelterContactTab';
import DonationSection from '@/components/DonationSection';
import { Shelter } from '@/types/shelter';


const DetalleRefugio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('info');

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
  });

  useEffect(() => {
    const fetchShelter = async () => {
      try {
        if (!id) {
          throw new Error('No shelter ID provided');
        }
        const data = await getShelterById(id);
        if (data) {
          setShelter(data);
        } else {
          throw new Error('Shelter not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el refugio');
      } finally {
        setLoading(false);
      }
    };

    fetchShelter();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error || !shelter) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error || 'No se encontró el refugio'}
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/refugios">Refugios</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {shelter.name}
              </li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-md-8">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h1 className="h2 mb-4">{shelter.name}</h1>
                  <p className="lead">{shelter.description}</p>
                </div>
              </div>

              <ul className="nav nav-tabs mb-4" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveTab('info')}
                    role="tab"
                    aria-selected={activeTab === 'info'}
                  >
                    Información
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'location' ? 'active' : ''}`}
                    onClick={() => setActiveTab('location')}
                    role="tab"
                    aria-selected={activeTab === 'location'}
                  >
                    Ubicación
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contact')}
                    role="tab"
                    aria-selected={activeTab === 'contact'}
                  >
                    Contacto
                  </button>
                </li>
              </ul>

              <div className="tab-content">
                {activeTab === 'info' && <ShelterInfoTab shelter={shelter} />}
                {activeTab === 'location' && <ShelterLocationTab shelter={shelter} isMapLoaded={isLoaded} />}
                {activeTab === 'contact' && <ShelterContactTab shelter={shelter} />}
              </div>
            </div>
            
            <div className="col-md-4">
              <DonationSection 
                type="shelter"
                shelterName={shelter.name} 
                shelterId={shelter.id} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleRefugio; 