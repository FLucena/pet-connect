import React, { useState, useEffect, useMemo, useCallback } from 'react';
import sheltersData from '@/data/shelters.json';
import ShelterCard from '@/components/ui/cards/ShelterCard';
import ShelterRegistrationModal from '@/components/features/shelter/ShelterRegistrationModal.tsx';
import { NewShelterFormData, SheltersData, Shelter } from '@/types/shelter';
import ShelterFilters, { ShelterFilterValues } from '@/components/shelter/ShelterFilters';
import { PetPagination } from '@/components/PetPagination';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const SHELTERS_PER_PAGE = 6;

const sortOptions = [
  { value: 'reciente', label: 'Más recientes' },
  { value: 'nombre', label: 'Nombre' },
  { value: 'capacidad', label: 'Capacidad' }
];

// Utility to deep clean an object (remove empty strings, undefined, null, and empty objects)
function deepClean<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(deepClean) as T;
  } else if (obj && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = deepClean(value);
      if (
        cleanedValue !== '' &&
        cleanedValue !== undefined &&
        cleanedValue !== null &&
        !(typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0)
      ) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {} as Record<string, unknown>) as T;
  }
  return obj;
}

const Shelters: React.FC = () => {
  const mockShelters = (sheltersData as unknown as SheltersData).shelters;
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [useMockData, setUseMockData] = useState(import.meta.env.MODE === 'development');
  const [isLoadingShelters, setIsLoadingShelters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ShelterFilterValues>({
    name: '',
    city: '',
    state: '',
    services: '',
    status: '',
    searchTerm: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const [currentSort, setCurrentSort] = useState('');

  // Fetch shelters
  const fetchShelters = useCallback(async () => {
    try {
      setIsLoadingShelters(true);
      setError(null);
      
      if (useMockData) {
        setShelters(mockShelters);
        return;
      }

      const response = await fetch('/.netlify/functions/shelters');
      
      if (!response.ok) {
        const errorText = await response.text();
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
  }, [useMockData, mockShelters]);

  // Create shelter
  const createShelter = async (data: NewShelterFormData) => {
    try {
      console.log('Starting shelter creation...', { data });
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      // Deep clean all optional fields
      const cleanedData = deepClean(data);
      
      console.log('Sending POST request to /shelters...');
      const response = await fetch('/.netlify/functions/shelters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      console.log('Response received:', { status: response.status });
      const responseData = await response.text();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(`Failed to create shelter: ${response.status} ${responseData}`);
      }
      
      console.log('Shelter created successfully, refreshing list...');
      await fetchShelters();
      setShowForm(false);
      setSuccessMessage('¡Refugio registrado exitosamente!');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (err) {
      console.error('Error creating shelter:', err);
      setError('Error al crear el refugio. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update shelter
  const updateShelter = async (id: string, data: Partial<Shelter>) => {
    try {
      setIsLoading(true);
      setError(null);

      // Deep clean all optional fields
      const cleanedData = deepClean(data);
      
      // Ensure the data matches the Shelter type
      const shelterData: Partial<Shelter> = {
        ...cleanedData,
        id,
        contact: cleanedData.contact ? {
          email: cleanedData.contact.email || '',
          phone: cleanedData.contact.phone || '',
          website: cleanedData.contact.website || '',
          socialMedia: cleanedData.contact.socialMedia || {}
        } : undefined
      };
      
      const response = await fetch('/.netlify/functions/shelters', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shelterData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update shelter: ${response.status} ${errorText}`);
      }
      
      await fetchShelters();
    } catch (err) {
      console.error('Error updating shelter:', err);
      setError('Error al actualizar el refugio. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete shelter
  const deleteShelter = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este refugio?')) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/.netlify/functions/shelters', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete shelter: ${response.status} ${errorText}`);
      }
      
      await fetchShelters();
    } catch (err) {
      console.error('Error deleting shelter:', err);
      setError('Error al eliminar el refugio. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShelters();
  }, [fetchShelters]);

  const handleCreateRefugio = () => {
    setError(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setError(null);
  };

  const handleSubmitRefugio = async (data: NewShelterFormData) => {
    await createShelter(data);
  };

  const handleFilterChange = (newFilters: ShelterFilterValues) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveFilters({
      name: '',
      city: '',
      state: '',
      services: '',
      status: '',
      searchTerm: ''
    });
    setCurrentPage(1);
  };

  // Memoized sorted and filtered shelters
  const filteredShelters = useMemo(() => {
    let filtered = shelters.filter(shelter => {
      // Name filter
      const matchesName = !activeFilters.name || 
        shelter.name.toLowerCase().includes(activeFilters.name.toLowerCase());
      
      // City filter
      const matchesCity = !activeFilters.city || 
        shelter.location.city.toLowerCase().includes(activeFilters.city.toLowerCase());
      
      // State filter
      const matchesState = !activeFilters.state || 
        shelter.location.state.toLowerCase().includes(activeFilters.state.toLowerCase());
      
      // Status filter
      const matchesStatus = !activeFilters.status || 
        shelter.status.toLowerCase() === activeFilters.status.toLowerCase();
      
      // Services filter
      const matchesServices = !activeFilters.services || 
        shelter.services.includes(activeFilters.services);
      
      // General search term
      const matchesSearchTerm = !activeFilters.searchTerm || 
        shelter.name.toLowerCase().includes(activeFilters.searchTerm.toLowerCase()) ||
        shelter.description.toLowerCase().includes(activeFilters.searchTerm.toLowerCase());

      return matchesName && matchesCity && matchesState && 
             matchesStatus && matchesServices && matchesSearchTerm;
    });

    // Apply sorting
    if (currentSort) {
      filtered = [...filtered].sort((a, b) => {
        switch (currentSort) {
          case 'reciente':
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          case 'nombre':
            return a.name.localeCompare(b.name);
          case 'capacidad':
            const capacityA = a.capacity?.total || 0;
            const capacityB = b.capacity?.total || 0;
            return capacityB - capacityA;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [shelters, activeFilters, currentSort]);

  // Memoized current page shelters
  const currentShelters = useMemo(() => {
    const lastShelterIndex = currentPage * SHELTERS_PER_PAGE;
    const firstShelterIndex = lastShelterIndex - SHELTERS_PER_PAGE;
    return filteredShelters.slice(firstShelterIndex, lastShelterIndex);
  }, [filteredShelters, currentPage]);

  // Memoized total pages
  const totalPages = useMemo(() => 
    Math.ceil(filteredShelters.length / SHELTERS_PER_PAGE),
    [filteredShelters]
  );

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
              <div className="d-flex align-items-center gap-4 mb-3">
                {/* Left label: only show when toggle is off */}
                <span
                  className={`transition-opacity ${useMockData ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                  style={{ minWidth: 110, transition: 'opacity 0.3s', marginRight: 40 }}
                >
                  {useMockData && 'Datos de Prueba'}
                </span>
                <div className="form-check form-switch m-0 p-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="useMockData"
                    checked={!useMockData}
                    onChange={e => setUseMockData(!e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                {/* Right label: only show when toggle is on */}
                <span
                  className={`transition-opacity ${!useMockData ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                  style={{ minWidth: 100, transition: 'opacity 0.3s' }}
                >
                  {!useMockData && 'Base de Datos'}
                </span>
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
          <div
            className="alert alert-danger"
            style={{ backgroundColor: 'black', color: '#fff' }}
            role="alert"
          >
            {error}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setSuccessMessage(null)}
              aria-label="Close"
            />
          </div>
        )}

        <ShelterRegistrationModal
          isOpen={showForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmitRefugio}
          isLoading={isLoading}
        />

        <ShelterFilters
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          values={activeFilters}
          sortOptions={sortOptions}
          onSortChange={setCurrentSort}
          currentSort={currentSort}
        />

        {isLoadingShelters ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-3 mb-md-4 gap-2 gap-sm-0">
              <p className="mb-0 fs-6 fs-sm-5">
                <strong>{filteredShelters.length}</strong> refugios encontrados
              </p>
            </div>

            {/* Shelter cards */}
            {isMobile ? (
              <Swiper
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                style={{ paddingBottom: 32 }}
              >
                {currentShelters.map((shelter) => (
                  <SwiperSlide key={shelter.id}>
                    <div className="px-2 h-100">
                      <div className="h-100">
                        <ShelterCard 
                          shelter={shelter} 
                          onUpdate={(data) => updateShelter(shelter.id, data)}
                          onDelete={() => deleteShelter(shelter.id)}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2 g-sm-3 g-md-4 mb-4">
                {currentShelters.map((shelter) => (
                  <div key={shelter.id} className="col">
                    <ShelterCard 
                      shelter={shelter}
                      onUpdate={(data) => updateShelter(shelter.id, data)}
                      onDelete={() => deleteShelter(shelter.id)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* No results message */}
            {filteredShelters.length === 0 && (
              <div className="alert alert-info text-center py-3 py-md-4">
                <i className="bi bi-search me-2 fs-4"></i>
                <p className="mb-0 fs-6">
                  No se encontraron refugios que coincidan con los criterios de búsqueda.
                </p>
                <p className="mb-0 mt-2 fs-6">
                  Intenta con otros filtros o <button 
                    className="btn btn-link p-0" 
                    onClick={handleResetFilters}
                  >
                    reinicia la búsqueda
                  </button>.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !isMobile && (
              <PetPagination
                paginaActual={currentPage}
                totalPaginas={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shelters; 