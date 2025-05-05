import React, { useState, useEffect, useMemo } from 'react';
import { Pet } from '@/types/pet';
import { PETS_PER_PAGE, PetType, Size , Sex, Status } from '@/constants/adoption';
import { PetCard } from '@/components/ui/cards/PetCard';
import { PetPagination } from '@/components/PetPagination';
import PetFilters from '@/components/PetFilters';
import { PetFilterValues } from '@/types/pet';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Simulated API call
const fetchPets = async (): Promise<Pet[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const data = (await import('@/data/pets.json')).default;
  
  // Transform the data to match our Pet interface
  return data.map(pet => ({
    id: pet.id,
    type: pet.tipo as PetType,
    name: pet.nombre,
    breed: pet.raza,
    age: {
      years: pet.edad.años,
      months: pet.edad.meses
    },
    sex: pet.sexo as Sex,
    size: pet.tamaño as Size,
    weight: pet.peso,
    color: pet.color,
    physicalCharacteristics: {
      coat: pet.caracteristicasFisicas.pelaje,
      ears: pet.caracteristicasFisicas.orejas,
      tail: pet.caracteristicasFisicas.cola,
      specialMarks: pet.caracteristicasFisicas.marcasEspeciales
    },
    health: {
      status: pet.salud.estado,
      vaccines: pet.salud.vacunas,
      lastVaccine: pet.salud.ultimaVacuna,
      sterilized: pet.salud.esterilizado,
      sterilizationDate: pet.salud.fechaEsterilizacion,
      microchip: pet.salud.microchip,
      microchipNumber: pet.salud.numeroMicrochip,
      specialConditions: pet.salud.condicionesEspeciales,
      allergies: pet.salud.alergias,
      medications: pet.salud.medicamentos
    },
    behavior: {
      energy: pet.comportamiento.energia,
      sociability: pet.comportamiento.sociabilidad,
      training: pet.comportamiento.entrenamiento,
      goodWithChildren: pet.comportamiento.buenoConNinos,
      goodWithDogs: pet.comportamiento.buenoConPerros,
      goodWithCats: pet.comportamiento.buenoConGatos,
      character: pet.comportamiento.caracter,
      specialNeeds: pet.comportamiento.necesidadesEspeciales
    },
    history: {
      origin: pet.historia.origen,
      rescueDate: pet.historia.fechaRescate,
      rescueCircumstances: pet.historia.circunstanciasRescate,
      medicalHistory: pet.historia.historiaMedica,
      specialNotes: pet.historia.notasEspeciales
    },
    care: {
      feeding: pet.cuidados.alimentacion,
      exercise: pet.cuidados.ejercicio,
      grooming: pet.cuidados.aseo,
      specialNeeds: pet.cuidados.necesidadesEspeciales
    },
    relationships: {
      currentShelter: pet.relaciones.refugioActual,
      shelterEntryDate: pet.relaciones.fechaIngresoRefugio,
      currentAdopter: pet.relaciones.adoptanteActual,
      previousAdopters: pet.relaciones.adoptantesAnteriores,
      currentFoster: pet.relaciones.fosterActual,
      previousFosters: pet.relaciones.fostersAnteriores
    },
    photos: pet.fotos,
    status: pet.estado as Status,
    registrationDate: pet.fechaRegistro,
    lastUpdate: pet.ultimaActualizacion
  }));
};

const Adoptar: React.FC = () => {
  // State
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<PetFilterValues>({
    type: '',
    size: '',
    sex: '',
    age: '',
    breed: '',
    status: 'disponible',
    searchTerm: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  // Effects
  useEffect(() => {
    const loadPets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchPets();
        setPets(data);
      } catch (err) {
        setError('Error al cargar las mascotas. Por favor, intente nuevamente.');
        console.error('Error loading pets:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPets();
  }, []);

  // Handlers
  const handleFilterChange = (newFilters: PetFilterValues) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveFilters({
      type: '',
      size: '',
      sex: '',
      age: '',
      breed: '',
      status: 'disponible',
      searchTerm: ''
    });
    setCurrentPage(1);
  };

  // Memoized values
  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      // Type filter
      const matchesType = !activeFilters.type || 
        pet.type.toLowerCase() === activeFilters.type.toLowerCase();
      
      // Size filter
      const matchesSize = !activeFilters.size || 
        pet.size.toLowerCase() === activeFilters.size.toLowerCase();
      
      // Sex filter
      const matchesSex = !activeFilters.sex || 
        pet.sex.toLowerCase() === activeFilters.sex.toLowerCase();
      
      // Age filter - Match by category rather than exact age
      const matchesAge = !activeFilters.age || matchesAgeCategory(pet.age, activeFilters.age);
      
      // Breed filter
      const matchesBreed = !activeFilters.breed || 
        pet.breed.toLowerCase().includes(activeFilters.breed.toLowerCase());
      
      // Status filter
      const matchesStatus = activeFilters.status === '' || 
        pet.status.toLowerCase() === activeFilters.status.toLowerCase();
      
      // General search term - search in name and breed
      const matchesSearchTerm = !activeFilters.searchTerm || 
        pet.name.toLowerCase().includes(activeFilters.searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(activeFilters.searchTerm.toLowerCase());

      return matchesType && matchesSize && matchesSex && 
             matchesAge && matchesBreed && matchesStatus && matchesSearchTerm;
    });
  }, [pets, activeFilters]);

  const currentPets = useMemo(() => {
    const lastPetIndex = currentPage * PETS_PER_PAGE;
    const firstPetIndex = lastPetIndex - PETS_PER_PAGE;
    return filteredPets.slice(firstPetIndex, lastPetIndex);
  }, [filteredPets, currentPage]);

  const totalPages = useMemo(() => 
    Math.ceil(filteredPets.length / PETS_PER_PAGE),
    [filteredPets]
  );

  // Helper function to match age categories
  const matchesAgeCategory = (petAge: { years: number, months: number }, category: string): boolean => {
    const totalMonths = (petAge.years * 12) + petAge.months;
    
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
    <div className="bg-light p-2 p-sm-3 p-md-4 my-5">
      <div className="container">
        <h1 className="text-center mb-3 mb-md-4 fs-4 fs-sm-3 fs-md-2">Mascotas esperando su hogar</h1>
        
        <PetFilters 
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {isLoading ? (
          <div className="text-center py-4 py-md-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 fs-6">Cargando mascotas...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : (
          <>
            {/* Resultados count */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-3 mb-md-4 gap-2 gap-sm-0">
              <p className="mb-0 fs-6 fs-sm-5">
                <strong>{filteredPets.length}</strong> mascotas encontradas
              </p>
              {filteredPets.length > 0 && (
                <div className="d-flex align-items-center w-100 w-sm-auto">
                  <span className="me-2 d-none d-sm-inline">Ordenar por:</span>
                  <select className="form-select form-select-sm w-100 w-sm-auto">
                    <option value="reciente">Más recientes</option>
                    <option value="nombre">Nombre</option>
                    <option value="edad-asc">Edad (menor a mayor)</option>
                    <option value="edad-desc">Edad (mayor a menor)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Pet cards */}
            {isMobile ? (
              <Swiper
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                style={{ paddingBottom: 32 }}
              >
                {currentPets.map((pet) => (
                  <SwiperSlide key={pet.id}>
                    <div className="px-2 h-100">
                      <div className="h-100">
                        <PetCard pet={pet} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2 g-sm-3 g-md-4 mb-4">
                {currentPets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
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

            {/* No results message */}
            {filteredPets.length === 0 && (
              <div className="alert alert-info text-center py-3 py-md-4">
                <i className="bi bi-search me-2 fs-4"></i>
                <p className="mb-0 fs-6">
                  No se encontraron mascotas que coincidan con los criterios de búsqueda.
                </p>
                <p className="mb-0 mt-2 fs-6">
                  Intenta con otros filtros o <button 
                    className="btn btn-link p-0" 
                    onClick={() => handleFilterChange({
                      type: '',
                      size: '',
                      sex: '',
                      age: '',
                      breed: '',
                      status: 'disponible',
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