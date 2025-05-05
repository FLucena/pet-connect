import React, { RefObject } from 'react';
import FilterField from './PetFilterField';
import { PetFilterValues } from '../../types/pet';

type PetDesktopFiltersProps = {
  filters: PetFilterValues;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleReset: () => void;
  filtersModified: boolean;
  isExpanded: boolean;
  toggleFilters: () => void;
  contentRef: RefObject<HTMLDivElement | null>;
  onFilterChange: (filters: PetFilterValues) => void;
};

const PetDesktopFilters: React.FC<PetDesktopFiltersProps> = ({
  filters,
  handleInputChange,
  handleReset,
  filtersModified,
  isExpanded,
  toggleFilters,
  contentRef,
  onFilterChange,
}) => (
  <div className="card shadow-sm mb-4">
    <div 
      className="card-header d-flex justify-content-between align-items-center bg-light" 
      onClick={toggleFilters} 
      style={{ cursor: 'pointer' }}
    >
      <h5 className="mb-0">
        <span>Filtros de Búsqueda</span>
      </h5>
      <button 
        className="btn btn-link p-0" 
        aria-label={isExpanded ? 'Ocultar filtros' : 'Mostrar filtros'}
      >
        <span className={`fs-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
      </button>
    </div>
    <div 
      ref={contentRef} 
      className="card-body"
      style={{ 
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
        transform: isExpanded ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        opacity: isExpanded ? '1' : '0',
        height: isExpanded ? 'auto' : '0',
        padding: isExpanded ? '1rem' : '0',
        margin: isExpanded ? '0' : '0'
      }}
    >
      <div className="d-flex gap-4 flex-wrap">
        <div className="flex-grow-1 flex-basis-0" style={{ minWidth: 250 }}>
          <div className="mt-5">
            <FilterField label="Tipo de mascota" id="tipo-desktop">
              <select
                className="form-select"
                id="tipo-desktop"
                name="tipo"
                value={filters.tipo}
                onChange={handleInputChange}
                aria-label="Filtrar por tipo de mascota"
              >
                <option value="">Todos los tipos</option>
                <option value="perro">Perros</option>
                <option value="gato">Gatos</option>
                <option value="ave">Aves</option>
                <option value="conejo">Conejos</option>
                <option value="otro">Otros</option>
              </select>
            </FilterField>
          </div>
          <FilterField label="Raza" id="raza-desktop">
            <input
              type="text"
              className="form-control"
              id="raza-desktop"
              name="raza"
              placeholder="Todas las razas"
              value={filters.raza}
              onChange={handleInputChange}
              aria-label="Filtrar por raza"
            />
          </FilterField>
          <FilterField label="Edad" id="edad-desktop">
            <select
              className="form-select"
              id="edad-desktop"
              name="edad"
              value={filters.edad}
              onChange={handleInputChange}
              aria-label="Filtrar por edad"
            >
              <option value="">Cualquier edad</option>
              <option value="cachorro">Cachorro/Cría (0-1 año)</option>
              <option value="joven">Joven (1-3 años)</option>
              <option value="adulto">Adulto (3-8 años)</option>
              <option value="senior">Senior (8+ años)</option>
            </select>
          </FilterField>
          <FilterField label="Estado" id="estado-desktop">
            <select
              className="form-select"
              id="estado-desktop"
              name="estado"
              value={filters.estado}
              onChange={handleInputChange}
              aria-label="Filtrar por estado"
            >
              <option value="disponible">Disponible</option>
              <option value="en-proceso">En proceso de adopción</option>
              <option value="adoptado">Adoptado</option>
              <option value="todos">Todos</option>
            </select>
          </FilterField>
        </div>
        <div className="flex-grow-1 flex-basis-0" style={{ minWidth: 250 }}>
          <div className="mt-5">
            <FilterField label="Buscar por nombre o descripción" id="searchTerm-desktop">
              <input
                type="text"
                className="form-control"
                id="searchTerm-desktop"
                name="searchTerm"
                placeholder="Buscar por nombre o descripción"
                value={filters.searchTerm}
                onChange={handleInputChange}
                aria-label="Buscar mascotas"
              />
            </FilterField>
          </div>
          <FilterField label="Sexo" id="sexo-desktop">
            <select
              className="form-select"
              id="sexo-desktop"
              name="sexo"
              value={filters.sexo}
              onChange={handleInputChange}
              aria-label="Filtrar por sexo"
            >
              <option value="">Cualquier sexo</option>
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
            </select>
          </FilterField>
          <FilterField label="Tamaño" id="tamaño-desktop">
            <select
              className="form-select"
              id="tamaño-desktop"
              name="tamaño"
              value={filters.tamaño}
              onChange={handleInputChange}
              aria-label="Filtrar por tamaño"
            >
              <option value="">Todos los tamaños</option>
              <option value="pequeno">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
              <option value="muy-grande">Muy grande</option>
            </select>
          </FilterField>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-end gap-2 mt-3">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleReset}
          disabled={!filtersModified}
          aria-label="Reiniciar filtros"
        >
          <span>Reiniciar</span>
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onFilterChange(filters)}
          aria-label="Aplicar filtros"
        >
          <span>Aplicar filtros</span>
        </button>
      </div>
    </div>
  </div>
);

export default PetDesktopFilters; 