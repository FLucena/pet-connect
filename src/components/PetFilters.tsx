import { useState, useEffect, useRef } from 'react';

type PetFiltersProps = {
  onFilterChange: (filters: PetFilterValues) => void;
  onReset?: () => void;
};

export type PetFilterValues = {
  tipo: string;
  sexo: string;
  edad: string;
  raza: string;
  tamaño: string;
  estado: string;
  searchTerm: string;
};

const initialFilters: PetFilterValues = {
  tipo: '',
  sexo: '',
  edad: '',
  raza: '',
  tamaño: '',
  estado: 'disponible',
  searchTerm: '',
};

const PetFilters = ({ onFilterChange, onReset }: PetFiltersProps) => {
  const [filters, setFilters] = useState<PetFilterValues>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(true);
  const [filtersModified, setFiltersModified] = useState(false);
  const [animating, setAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  // Measure content height when it changes
  useEffect(() => {
    if (contentRef.current && isExpanded) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded, filters]);

  // Check if filters have been modified from initial state
  useEffect(() => {
    const isModified = Object.keys(filters).some(key => {
      const k = key as keyof PetFilterValues;
      return filters[k] !== initialFilters[k];
    });
    setFiltersModified(isModified);
  }, [filters]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle reset
  const handleReset = () => {
    setFilters(initialFilters);
    if (onReset) onReset();
    else onFilterChange(initialFilters);
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    if (contentRef.current && !isExpanded) {
      // Update height before expanding
      setContentHeight(contentRef.current.scrollHeight);
    }
    
    setAnimating(true);
    setIsExpanded(!isExpanded);
    
    // After animation completes, reset animating state
    setTimeout(() => {
      setAnimating(false);
    }, 500); // Match this with the CSS transition duration
  };

  // Custom styles for select elements to add animation
  const selectStyle = {
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px`,
  };

  // Generate hover class for inputs and selects
  const inputHoverClass = "hover-effect";

  return (
    <div className="card mb-4 border shadow-sm">
      <div 
        className="card-header d-flex justify-content-between align-items-center py-3"
        style={{ cursor: 'pointer' }}
        onClick={toggleFilters}
      >
        <h5 className="mb-0 d-flex align-items-center">
          <i className="bi bi-funnel me-2"></i>
          Filtros de Búsqueda
        </h5>
        <button 
          className="btn btn-link p-0 text-primary"
          aria-label={isExpanded ? 'Ocultar filtros' : 'Mostrar filtros'}
        >
          <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'} fs-5 transition-icon`}></i>
        </button>
      </div>
      
      <div 
        className="collapse-section overflow-hidden" 
        style={{ 
          maxHeight: isExpanded ? `${contentHeight}px` : '0', 
          transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-in-out',
          opacity: isExpanded ? 1 : 0,
          visibility: isExpanded || animating ? 'visible' : 'hidden'
        }}
      >
        <div className="card-body" ref={contentRef}>
          {/* Headers Row */}
          <div className="row border-bottom pb-2 mb-3">
            <div className="col-3">
              <span className="fw-medium">Tipo de mascota</span>
            </div>
            <div className="col-3">
              <span className="fw-medium">Buscar por nombre o descripciones</span>
            </div>
            <div className="col-2">
              <span className="fw-medium">Raza</span>
            </div>
            <div className="col-2">
              <span className="fw-medium">Sexo</span>
            </div>
            <div className="col-2">
              <span className="fw-medium">Edad</span>
            </div>
          </div>

          {/* First row of inputs */}
          <div className="row mb-4">
            <div className="col-3">
              <select
                className={`form-select ${inputHoverClass}`}
                style={selectStyle}
                id="tipo"
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
            </div>

            <div className="col-3">
              <input
                type="text"
                className={`form-control ${inputHoverClass}`}
                style={{ transition: 'all 0.2s ease-in-out' }}
                id="searchTerm"
                name="searchTerm"
                placeholder="Buscar por nombre o descripción"
                value={filters.searchTerm}
                onChange={handleInputChange}
                aria-label="Buscar mascotas"
              />
            </div>

            <div className="col-2">
              <input
                type="text"
                className={`form-control ${inputHoverClass}`}
                style={{ transition: 'all 0.2s ease-in-out' }}
                id="raza"
                name="raza"
                placeholder="Todas las razas"
                value={filters.raza}
                onChange={handleInputChange}
                aria-label="Filtrar por raza"
              />
            </div>

            <div className="col-2">
              <select
                className={`form-select ${inputHoverClass}`}
                style={selectStyle}
                id="sexo"
                name="sexo"
                value={filters.sexo}
                onChange={handleInputChange}
                aria-label="Filtrar por sexo"
              >
                <option value="">Cualquier sexo</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>

            <div className="col-2">
              <select
                className={`form-select ${inputHoverClass}`}
                style={selectStyle}
                id="edad"
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
            </div>
          </div>

          {/* Second headers row */}
          <div className="row mb-2">
            <div className="col-3">
              <span className="fw-medium">Tamaño</span>
            </div>
            <div className="col-3">
              <span className="fw-medium">Estado</span>
            </div>
          </div>

          {/* Second row of inputs */}
          <div className="row">
            <div className="col-3">
              <select
                className={`form-select ${inputHoverClass}`}
                style={selectStyle}
                id="tamaño"
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
            </div>

            <div className="col-3">
              <select
                className={`form-select ${inputHoverClass}`}
                style={selectStyle}
                id="estado"
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
            </div>

            <div className="col-6 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary me-2 transition-btn"
                onClick={handleReset}
                disabled={!filtersModified}
                aria-label="Reiniciar filtros"
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Reiniciar
              </button>
              <button
                type="button"
                className="btn btn-primary transition-btn"
                onClick={() => onFilterChange(filters)}
                aria-label="Aplicar filtros"
              >
                <i className="bi bi-funnel-fill me-2"></i>
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        .transition-icon {
          transition: transform 0.3s ease-in-out;
        }
        .hover-effect:hover {
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
          border-color: #86b7fe;
        }
        .transition-btn {
          transition: all 0.2s ease-in-out;
        }
        .transition-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .collapse-section {
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-in-out;
        }
        `}
      </style>
    </div>
  );
};

export default PetFilters; 