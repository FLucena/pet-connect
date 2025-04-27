import React, { useState, useEffect, useMemo } from 'react';
import mascotasData from '@/data/pets.json';
import { Mascota } from '@/types/mascota';
import { MASCOTAS_POR_PAGINA } from '@/constants/adopcion';
import { PetCard } from '@/components/PetCard';
import { PetPagination } from '@/components/PetPagination';
import PetFilters, { PetFilterValues } from '@/components/PetFilters';

// Simulated API call
const fetchMascotas = async (): Promise<Mascota[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mascotasData as Mascota[];
};

const Adoptar: React.FC = () => {
  // State
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<PetFilterValues>({
    tipo: '',
    tamaño: '',
    sexo: '',
    edad: '',
    raza: '',
    estado: 'disponible',
    searchTerm: ''
  });
  const [paginaActual, setPaginaActual] = useState(1);

  // Effects
  useEffect(() => {
    const loadMascotas = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMascotas();
        setMascotas(data);
      } catch (err) {
        setError('Error al cargar las mascotas. Por favor, intente nuevamente.');
        console.error('Error loading pets:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMascotas();
  }, []);

  // Handlers
  const handleFilterChange = (newFilters: PetFilterValues) => {
    setActiveFilters(newFilters);
    setPaginaActual(1);
  };

  const handleResetFilters = () => {
    setPaginaActual(1);
  };

  // Memoized values
  const mascotasFiltradas = useMemo(() => {
    return mascotas.filter(mascota => {
      // Type filter
      const matchesTipo = !activeFilters.tipo || 
        mascota.tipo.toLowerCase() === activeFilters.tipo.toLowerCase();
      
      // Size filter
      const matchesTamaño = !activeFilters.tamaño || 
        mascota.tamaño.toLowerCase() === activeFilters.tamaño.toLowerCase();
      
      // Sex filter
      const matchesSexo = !activeFilters.sexo || 
        mascota.sexo.toLowerCase() === activeFilters.sexo.toLowerCase();
      
      // Age filter - Match by category rather than exact age
      const matchesEdad = !activeFilters.edad || matchesAgeCategory(mascota.edad, activeFilters.edad);
      
      // Breed filter
      const matchesRaza = !activeFilters.raza || 
        mascota.raza.toLowerCase().includes(activeFilters.raza.toLowerCase());
      
      // Status filter
      const matchesEstado = activeFilters.estado === 'todos' || 
        mascota.estado.toLowerCase() === activeFilters.estado.toLowerCase();
      
      // General search term - search in name and breed
      const matchesSearchTerm = !activeFilters.searchTerm || 
        mascota.nombre.toLowerCase().includes(activeFilters.searchTerm.toLowerCase()) ||
        mascota.raza.toLowerCase().includes(activeFilters.searchTerm.toLowerCase());

      return matchesTipo && matchesTamaño && matchesSexo && 
             matchesEdad && matchesRaza && matchesEstado && matchesSearchTerm;
    });
  }, [mascotas, activeFilters]);

  const mascotasActuales = useMemo(() => {
    const indiceUltimaMascota = paginaActual * MASCOTAS_POR_PAGINA;
    const indicePrimeraMascota = indiceUltimaMascota - MASCOTAS_POR_PAGINA;
    return mascotasFiltradas.slice(indicePrimeraMascota, indiceUltimaMascota);
  }, [mascotasFiltradas, paginaActual]);

  const totalPaginas = useMemo(() => 
    Math.ceil(mascotasFiltradas.length / MASCOTAS_POR_PAGINA),
    [mascotasFiltradas]
  );

  // Helper function to match age categories
  const matchesAgeCategory = (petAge: { años: number, meses: number }, category: string): boolean => {
    const totalMonths = (petAge.años * 12) + petAge.meses;
    
    switch(category.toLowerCase()) {
      case 'cachorro':
        return totalMonths <= 12; // 0-1 año
      case 'joven':
        return totalMonths > 12 && totalMonths <= 36; // 1-3 años
      case 'adulto':
        return totalMonths > 36 && totalMonths <= 96; // 3-8 años
      case 'senior':
        return totalMonths > 96; // 8+ años
      default:
        return false;
    }
  };

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container">
        <h1 className="text-center mb-4">Mascotas Disponibles para Adopción</h1>
        
        <PetFilters 
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando mascotas...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : (
          <>
            {/* Resultados count */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="mb-0">
                <strong>{mascotasFiltradas.length}</strong> mascotas encontradas
              </p>
              {mascotasFiltradas.length > 0 && (
                <div className="d-flex align-items-center">
                  <span className="me-2">Ordenar por:</span>
                  <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                    <option value="reciente">Más recientes</option>
                    <option value="nombre">Nombre</option>
                    <option value="edad-asc">Edad (menor a mayor)</option>
                    <option value="edad-desc">Edad (mayor a menor)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Pet cards */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
              {mascotasActuales.map((mascota) => (
                <PetCard key={mascota.id} mascota={mascota} />
              ))}
            </div>

            {/* Pagination */}
            {totalPaginas > 1 && (
              <PetPagination
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onPageChange={setPaginaActual}
              />
            )}

            {/* No results message */}
            {mascotasFiltradas.length === 0 && (
              <div className="alert alert-info text-center py-4">
                <i className="bi bi-search me-2 fs-4"></i>
                <p className="mb-0">
                  No se encontraron mascotas que coincidan con los criterios de búsqueda.
                </p>
                <p className="mb-0 mt-2">
                  Intenta con otros filtros o <button 
                    className="btn btn-link p-0" 
                    onClick={() => handleFilterChange({
                      tipo: '',
                      tamaño: '',
                      sexo: '',
                      edad: '',
                      raza: '',
                      estado: 'disponible',
                      searchTerm: ''
                    })}
                  >
                    reinicia la búsqueda
                  </button>.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Adoptar; 