import React, { useState, useEffect, useMemo, useCallback } from 'react';
import mascotasData from '@/data/pets.json';
import { Mascota, PetFilters as PetFiltersType, PetErrors } from '@/types/mascota';
import { ESTADOS, MASCOTAS_POR_PAGINA } from '@/constants/adopcion';
import { PetCard } from '@/components/PetCard';
import { PetPagination } from '@/components/PetPagination';
import { PetFilters } from '@/components/PetFilters';

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
  const [filtros, setFiltros] = useState<PetFiltersType>({
    tipo: '',
    tamaño: '',
    sexo: '',
    edad: '',
    raza: '',
    busqueda: '',
    estado: ESTADOS.DISPONIBLE
  });
  const [errores, setErrores] = useState<PetErrors>({ tipo: false });
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
  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'tipo') {
      setErrores(prev => ({
        ...prev,
        tipo: !value
      }));
    }
    
    setPaginaActual(1);
  }, []);

  // Memoized values
  const mascotasFiltradas = useMemo(() => {
    return mascotas.filter(mascota => {
      const matchesTipo = !filtros.tipo || mascota.tipo === filtros.tipo;
      const matchesTamaño = !filtros.tamaño || mascota.tamaño === filtros.tamaño;
      const matchesSexo = !filtros.sexo || mascota.sexo === filtros.sexo;
      const matchesEdad = !filtros.edad || mascota.edad.años.toString() === filtros.edad;
      const matchesRaza = !filtros.raza || 
        mascota.raza.toLowerCase().includes(filtros.raza.toLowerCase());
      const matchesBusqueda = !filtros.busqueda || 
        mascota.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        mascota.raza.toLowerCase().includes(filtros.busqueda.toLowerCase());
      const matchesEstado = !filtros.estado || mascota.estado === filtros.estado;

      return matchesTipo && matchesTamaño && matchesSexo && 
             matchesEdad && matchesRaza && matchesBusqueda && matchesEstado;
    });
  }, [mascotas, filtros]);

  const mascotasActuales = useMemo(() => {
    const indiceUltimaMascota = paginaActual * MASCOTAS_POR_PAGINA;
    const indicePrimeraMascota = indiceUltimaMascota - MASCOTAS_POR_PAGINA;
    return mascotasFiltradas.slice(indicePrimeraMascota, indiceUltimaMascota);
  }, [mascotasFiltradas, paginaActual]);

  const totalPaginas = useMemo(() => 
    Math.ceil(mascotasFiltradas.length / MASCOTAS_POR_PAGINA),
    [mascotasFiltradas]
  );

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container">
        <h1 className="text-center mb-4">Mascotas Disponibles para Adopción</h1>
        
        <PetFilters 
          filtros={filtros}
          errores={errores}
          onFilterChange={handleFilterChange}
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
            {/* Resultados */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {mascotasActuales.map((mascota) => (
                <PetCard key={mascota.id} mascota={mascota} />
              ))}
            </div>

            <PetPagination
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onPageChange={setPaginaActual}
            />

            {/* Mensaje si no hay resultados */}
            {mascotasFiltradas.length === 0 && (
              <div className="text-center py-4">
                <p className="text-muted">
                  No se encontraron mascotas que coincidan con los criterios de búsqueda.
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