import React, { RefObject } from 'react';
import { PetFilterValues } from '@/types/pet';

type PetDesktopFiltersProps = {
  filters: PetFilterValues;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleReset: () => void;
  filtersModified: boolean;
  isExpanded: boolean;
  toggleFilters: () => void;
  contentRef: RefObject<HTMLDivElement | null>;
};

const PetDesktopFilters: React.FC<PetDesktopFiltersProps> = ({
  filters,
  handleInputChange,
  handleReset,
  filtersModified,
  isExpanded,
  toggleFilters,
  contentRef,
}) => (
  <div className="card shadow-sm mb-4">
    <div 
      className="card-header d-flex justify-content-between align-items-center bg-light" 
      onClick={toggleFilters}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFilters();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls="filters-content"
      style={{ cursor: 'pointer' }}
    >
      <h5 className="mb-0">
        <span>Filtros de Búsqueda</span>
      </h5>
      <button 
        className="btn btn-link p-0" 
        aria-label={isExpanded ? 'Ocultar filtros' : 'Mostrar filtros'}
        onClick={(e) => {
          e.stopPropagation();
          toggleFilters();
        }}
      >
        <span 
          className={`fs-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>
    </div>
    <div
      id="filters-content"
      ref={contentRef}
      className={`card-body ${isExpanded ? '' : 'd-none'}`}
      role="region"
      aria-labelledby="filters-header"
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="type" className="form-label">Tipo</label>
            <select
              id="type"
              name="type"
              className="form-select"
              value={filters.type}
              onChange={handleInputChange}
              aria-label="Seleccionar tipo"
            >
              <option value="">Todos</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="age" className="form-label">Edad</label>
            <select
              id="age"
              name="age"
              className="form-select"
              value={filters.age}
              onChange={handleInputChange}
              aria-label="Seleccionar edad"
            >
              <option value="">Todas</option>
              <option value="cachorro">Cachorro</option>
              <option value="joven">Joven</option>
              <option value="adulto">Adulto</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="size" className="form-label">Tamaño</label>
            <select
              id="size"
              name="size"
              className="form-select"
              value={filters.size}
              onChange={handleInputChange}
              aria-label="Seleccionar tamaño"
            >
              <option value="">Todos</option>
              <option value="pequeno">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
          </div>
        </div>
        {filtersModified && (
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleReset}
              aria-label="Restablecer filtros"
            >
              Restablecer
            </button>
          </div>
        )}
      </form>
    </div>
  </div>
);

export default PetDesktopFilters; 