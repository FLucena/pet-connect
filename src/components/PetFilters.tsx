import React from 'react';
import UnifiedFilters, { FilterField, SortOption } from './ui/filters/UnifiedFilters';
import { PetFilterValues } from '@/types/pet';

interface PetFiltersProps {
  onFilterChange: (filters: PetFilterValues) => void;
  onReset: () => void;
  values: PetFilterValues;
  sortOptions?: SortOption[];
  onSortChange?: (sortBy: string) => void;
  currentSort?: string;
}

const defaultFilters: PetFilterValues = {
  type: '',
  size: '',
  sex: '',
  age: '',
  breed: '',
  status: '',
  searchTerm: ''
};

const defaultSortOptions: SortOption[] = [
  { value: 'reciente', label: 'Más recientes' },
  { value: 'nombre', label: 'Nombre' },
  { value: 'edad', label: 'Edad' },
  { value: 'tamaño', label: 'Tamaño' }
];

const filterFields: FilterField[] = [
  {
    name: 'searchTerm',
    type: 'search',
    placeholder: 'Buscar mascotas...',
    colSize: 12
  },
  {
    name: 'type',
    type: 'select',
    placeholder: 'Tipo de mascota',
    options: [
      { value: 'dog', label: 'Perro' },
      { value: 'cat', label: 'Gato' },
      { value: 'other', label: 'Otro' }
    ]
  },
  {
    name: 'size',
    type: 'select',
    placeholder: 'Tamaño',
    options: [
      { value: 'small', label: 'Pequeño' },
      { value: 'medium', label: 'Mediano' },
      { value: 'large', label: 'Grande' }
    ]
  },
  {
    name: 'sex',
    type: 'select',
    placeholder: 'Sexo',
    options: [
      { value: 'male', label: 'Macho' },
      { value: 'female', label: 'Hembra' }
    ]
  },
  {
    name: 'age',
    type: 'select',
    placeholder: 'Edad',
    options: [
      { value: 'puppy', label: 'Cachorro' },
      { value: 'young', label: 'Joven' },
      { value: 'adult', label: 'Adulto' },
      { value: 'senior', label: 'Senior' }
    ]
  },
  {
    name: 'breed',
    type: 'select',
    placeholder: 'Raza',
    options: [
      { value: 'mixed', label: 'Mestizo' },
      { value: 'labrador', label: 'Labrador' },
      { value: 'german-shepherd', label: 'Pastor Alemán' },
      { value: 'golden-retriever', label: 'Golden Retriever' },
      { value: 'bulldog', label: 'Bulldog' },
      { value: 'beagle', label: 'Beagle' },
      { value: 'poodle', label: 'Poodle' },
      { value: 'rottweiler', label: 'Rottweiler' },
      { value: 'yorkshire', label: 'Yorkshire' },
      { value: 'boxer', label: 'Boxer' },
      { value: 'dachshund', label: 'Dachshund' }
    ]
  },
  {
    name: 'status',
    type: 'select',
    placeholder: 'Estado',
    options: [
      { value: 'available', label: 'Disponible' },
      { value: 'adopted', label: 'Adoptado' },
      { value: 'pending', label: 'Pendiente' }
    ]
  }
];

const PetFilters: React.FC<PetFiltersProps> = ({
  onFilterChange,
  onReset,
  values,
  sortOptions = defaultSortOptions,
  onSortChange,
  currentSort
}) => {
  return (
    <UnifiedFilters<PetFilterValues>
      title="Filtros de mascotas"
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

export default PetFilters; 