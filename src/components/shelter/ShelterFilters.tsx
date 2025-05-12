import React from 'react';
import UnifiedFilters, { FilterField, SortOption } from '../ui/filters/UnifiedFilters';

export interface ShelterFilterValues {
  name: string;
  city: string;
  state: string;
  services: string;
  status: string;
  searchTerm: string;
  [key: string]: string | undefined;
}

interface ShelterFiltersProps {
  onFilterChange: (filters: ShelterFilterValues) => void;
  onReset: () => void;
  values: ShelterFilterValues;
  sortOptions?: SortOption[];
  onSortChange?: (sortBy: string) => void;
  currentSort?: string;
}

const defaultFilters: ShelterFilterValues = {
  name: '',
  city: '',
  state: '',
  services: '',
  status: '',
  searchTerm: ''
};

const filterFields: FilterField[] = [
  {
    name: 'searchTerm',
    type: 'search',
    placeholder: 'Buscar refugios...',
    colSize: 12
  },
  {
    name: 'name',
    type: 'text',
    placeholder: 'Nombre del refugio',
    colSize: 6
  },
  {
    name: 'city',
    type: 'text',
    placeholder: 'Ciudad',
    colSize: 3
  },
  {
    name: 'state',
    type: 'text',
    placeholder: 'Estado',
    colSize: 3
  },
  {
    name: 'services',
    type: 'select',
    placeholder: 'Servicios',
    options: [
      { value: 'adoption', label: 'Adopción' },
      { value: 'fostering', label: 'Acogida temporal' },
      { value: 'veterinary', label: 'Servicios veterinarios' },
      { value: 'training', label: 'Entrenamiento' },
      { value: 'boarding', label: 'Alojamiento' }
    ]
  },
  {
    name: 'status',
    type: 'select',
    placeholder: 'Estado',
    options: [
      { value: 'active', label: 'Activo' },
      { value: 'inactive', label: 'Inactivo' },
      { value: 'pending', label: 'Pendiente' }
    ]
  }
];

const ShelterFilters: React.FC<ShelterFiltersProps> = ({
  onFilterChange,
  onReset,
  values,
  sortOptions,
  onSortChange,
  currentSort
}) => {
  return (
    <UnifiedFilters<ShelterFilterValues>
      title="Filtros de refugios"
      fields={filterFields}
      values={values}
      onFilterChange={onFilterChange}
      onReset={onReset}
      defaultValues={defaultFilters}
      sortOptions={sortOptions}
      onSortChange={onSortChange}
      currentSort={currentSort}
    />
  );
};

export default ShelterFilters; 