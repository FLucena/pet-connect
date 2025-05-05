import React from 'react';
import { PetFilterValues } from '@/types/pet';

interface PetFiltersProps {
  onFilterChange: (filters: PetFilterValues) => void;
  onReset: () => void;
}

const PetFilters: React.FC<PetFiltersProps> = ({ onFilterChange, onReset }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [filters, setFilters] = React.useState<PetFilterValues>({
    type: '',
    size: '',
    sex: '',
    age: '',
    breed: '',
    status: 'disponible',
    searchTerm: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newFilters = { ...filters, searchTerm: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters: PetFilterValues = {
      type: '',
      size: '',
      sex: '',
      age: '',
      breed: '',
      status: 'disponible',
      searchTerm: ''
    };
    setFilters(defaultFilters);
    onReset();
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Filtros</h5>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Ocultar filtros' : 'Mostrar filtros'}
          >
            <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
          </button>
        </div>

        <div 
          className="filters-container"
          style={{
            maxHeight: isExpanded ? '1000px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-in-out'
          }}
        >
          <div className="row g-3">
            {/* Search Bar */}
            <div className="col-12">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre o raza..."
                  value={filters.searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="col-md-3">
              <select
                name="type"
                className="form-select"
                value={filters.type}
                onChange={handleInputChange}
              >
                <option value="">Tipo de mascota</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
              </select>
            </div>

            {/* Size Filter */}
            <div className="col-md-3">
              <select
                name="size"
                className="form-select"
                value={filters.size}
                onChange={handleInputChange}
              >
                <option value="">Tamaño</option>
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>

            {/* Sex Filter */}
            <div className="col-md-3">
              <select
                name="sex"
                className="form-select"
                value={filters.sex}
                onChange={handleInputChange}
              >
                <option value="">Sexo</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>

            {/* Age Filter */}
            <div className="col-md-3">
              <select
                name="age"
                className="form-select"
                value={filters.age}
                onChange={handleInputChange}
              >
                <option value="">Edad</option>
                <option value="cachorro">Cachorro</option>
                <option value="joven">Joven</option>
                <option value="adulto">Adulto</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            {/* Breed Filter */}
            <div className="col-md-6">
              <input
                type="text"
                name="breed"
                className="form-control"
                placeholder="Buscar por raza..."
                value={filters.breed}
                onChange={handleInputChange}
              />
            </div>

            {/* Status Filter */}
            <div className="col-md-6">
              <select
                name="status"
                className="form-select"
                value={filters.status}
                onChange={handleInputChange}
              >
                <option value="disponible">Disponible</option>
                <option value="adoptado">Adoptado</option>
                <option value="en_proceso">En proceso</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="col-12 text-end">
              <button
                className="btn btn-outline-secondary"
                onClick={handleReset}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Reiniciar filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetFilters; 