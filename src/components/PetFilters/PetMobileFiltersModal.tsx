import React from 'react';
import FilterField from './PetFilterField';
import { PetFilterValues } from '../../types/pet';

type PetFiltersModalProps = {
  petFilters: PetFilterValues;
  onPetFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPetFiltersReset: () => void;
  petFiltersModified: boolean;
  onClose: () => void;
};

const PetFiltersModal: React.FC<PetFiltersModalProps> = ({
  petFilters,
  onPetFilterChange,
  onPetFiltersReset,
  petFiltersModified,
  onClose,
}) => (
  <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header bg-light">
          <h5 className="modal-title mb-0">Filtros de Mascotas</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            aria-label="Cerrar"
          />
        </div>
        <div className="modal-body">
          <div className="d-flex flex-column gap-3">
            <FilterField label="Tipo de mascota" id="type">
              <select
                className="form-select"
                id="type"
                name="type"
                value={petFilters.type}
                onChange={onPetFilterChange}
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
            <FilterField label="Buscar por nombre o descripción" id="searchTerm">
              <input
                type="text"
                className="form-control"
                id="searchTerm"
                name="searchTerm"
                placeholder="Buscar por nombre o descripción"
                value={petFilters.searchTerm}
                onChange={onPetFilterChange}
                aria-label="Buscar mascotas"
              />
            </FilterField>
            <FilterField label="Raza" id="breed">
              <input
                type="text"
                className="form-control"
                id="breed"
                name="breed"
                placeholder="Todas las razas"
                value={petFilters.breed}
                onChange={onPetFilterChange}
                aria-label="Filtrar por raza"
              />
            </FilterField>
            <FilterField label="Sexo" id="sex">
              <select
                className="form-select"
                id="sex"
                name="sex"
                value={petFilters.sex}
                onChange={onPetFilterChange}
                aria-label="Filtrar por sexo"
              >
                <option value="">Cualquier sexo</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </FilterField>
            <FilterField label="Edad" id="age">
              <select
                className="form-select"
                id="age"
                name="age"
                value={petFilters.age}
                onChange={onPetFilterChange}
                aria-label="Filtrar por edad"
              >
                <option value="">Cualquier edad</option>
                <option value="cachorro">Cachorro/Cría (0-1 año)</option>
                <option value="joven">Joven (1-3 años)</option>
                <option value="adulto">Adulto (3-8 años)</option>
                <option value="senior">Senior (8+ años)</option>
              </select>
            </FilterField>
            <FilterField label="Tamaño" id="size">
              <select
                className="form-select"
                id="size"
                name="size"
                value={petFilters.size}
                onChange={onPetFilterChange}
                aria-label="Filtrar por tamaño"
              >
                <option value="">Todos los tamaños</option>
                <option value="pequeno">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
                <option value="muy-grande">Muy grande</option>
              </select>
            </FilterField>
            <FilterField label="Estado" id="status">
              <select
                className="form-select"
                id="status"
                name="status"
                value={petFilters.status}
                onChange={onPetFilterChange}
                aria-label="Filtrar por estado"
              >
                <option value="disponible">Disponible</option>
                <option value="en-proceso">En proceso de adopción</option>
                <option value="adoptado">Adoptado</option>
                <option value="todos">Todos</option>
              </select>
            </FilterField>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onPetFiltersReset}
            disabled={!petFiltersModified}
            aria-label="Reiniciar filtros"
          >
            <span>Reiniciar</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
            aria-label="Aplicar filtros"
          >
            <span>Aplicar filtros</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default PetFiltersModal; 