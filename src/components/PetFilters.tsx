import React, { useState, useRef, useEffect } from 'react';
import { PetFilters as PetFiltersType, PetErrors } from '../types/mascota';
import { 
  TIPOS_MASCOTA, 
  TAMAÑOS, 
  SEXOS, 
  EDADES, 
  ESTADOS 
} from '../constants/adopcion';

interface PetFiltersProps {
  filtros: PetFiltersType;
  errores: PetErrors;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

export const PetFilters: React.FC<PetFiltersProps> = ({ 
  filtros, 
  errores, 
  onFilterChange 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateContentHeight = () => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    updateContentHeight();
    window.addEventListener('resize', updateContentHeight);
    return () => window.removeEventListener('resize', updateContentHeight);
  }, []);

  useEffect(() => {
    updateContentHeight();
  }, [filtros]); // Update height when filters change

  const toggleFilters = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="card mb-4 overflow-hidden">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Filtros de Búsqueda</h5>
        <button
          className="btn btn-link p-0 transition-all duration-500 ease-in-out"
          onClick={toggleFilters}
          aria-expanded={!isCollapsed}
          aria-controls="filtersCollapse"
          style={{ 
            transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <i className="bi bi-chevron-down"></i>
        </button>
      </div>
      <div 
        ref={contentRef}
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{ 
          maxHeight: isCollapsed ? '0px' : `${contentHeight}px`,
          opacity: isCollapsed ? '0' : '1',
          transition: 'max-height 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="card-body">
          <div className="row g-3">
            {/* Campo obligatorio */}
            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="tipo" className="form-label">
                Tipo de Mascota <span className="text-danger">*</span>
              </label>
              <select
                id="tipo"
                name="tipo"
                className={`form-select ${errores.tipo ? 'is-invalid' : ''}`}
                value={filtros.tipo}
                onChange={onFilterChange}
                required
                aria-required="true"
                aria-invalid={errores.tipo}
              >
                <option value="">Seleccione un tipo</option>
                {TIPOS_MASCOTA.map(tipo => (
                  <option key={tipo} value={tipo}>
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </option>
                ))}
              </select>
              {errores.tipo && (
                <div className="invalid-feedback" role="alert">
                  Por favor, seleccione un tipo de mascota
                </div>
              )}
            </div>

            {/* Campos opcionales */}
            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="busqueda" className="form-label">
                Buscar por nombre o raza
              </label>
              <input
                id="busqueda"
                type="text"
                name="busqueda"
                placeholder="Buscar por nombre o raza..."
                className="form-control"
                value={filtros.busqueda}
                onChange={onFilterChange}
                aria-label="Buscar por nombre o raza"
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="tamaño" className="form-label">
                Tamaño
              </label>
              <select
                id="tamaño"
                name="tamaño"
                className="form-select"
                value={filtros.tamaño}
                onChange={onFilterChange}
                aria-label="Filtrar por tamaño"
              >
                <option value="">Todos los tamaños</option>
                {TAMAÑOS.map(tamaño => (
                  <option key={tamaño} value={tamaño}>
                    {tamaño.charAt(0).toUpperCase() + tamaño.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="sexo" className="form-label">
                Sexo
              </label>
              <select
                id="sexo"
                name="sexo"
                className="form-select"
                value={filtros.sexo}
                onChange={onFilterChange}
                aria-label="Filtrar por sexo"
              >
                <option value="">Cualquier sexo</option>
                {SEXOS.map(sexo => (
                  <option key={sexo} value={sexo}>
                    {sexo.charAt(0).toUpperCase() + sexo.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="edad" className="form-label">
                Edad
              </label>
              <select
                id="edad"
                name="edad"
                className="form-select"
                value={filtros.edad}
                onChange={onFilterChange}
                aria-label="Filtrar por edad"
              >
                <option value="">Cualquier edad</option>
                {EDADES.map(edad => (
                  <option key={edad} value={edad}>
                    {edad.charAt(0).toUpperCase() + edad.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="raza" className="form-label">
                Buscar por raza
              </label>
              <input
                id="raza"
                type="text"
                name="raza"
                placeholder="Buscar por raza..."
                className="form-control"
                value={filtros.raza}
                onChange={onFilterChange}
                aria-label="Buscar por raza"
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="estado" className="form-label">
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                className="form-select"
                value={filtros.estado}
                onChange={onFilterChange}
                aria-label="Filtrar por estado"
              >
                <option value="">Todos los estados</option>
                {Object.entries(ESTADOS).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3">
            <small className="text-muted">
              <span className="text-danger">*</span> Campos obligatorios
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}; 