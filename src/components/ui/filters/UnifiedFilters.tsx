import React from 'react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface FilterField {
  name: string;
  type: 'text' | 'select' | 'search';
  placeholder?: string;
  options?: FilterOption[];
  colSize?: number;
}

interface UnifiedFiltersProps<T extends Record<string, string | number | undefined>> {
  title?: string;
  fields: FilterField[];
  values: T;
  onFilterChange: (filters: T) => void;
  onReset: () => void;
  defaultValues: T;
  sortOptions?: SortOption[];
  onSortChange?: (sortBy: string) => void;
  currentSort?: string;
}

const UnifiedFilters = <T extends Record<string, string | number | undefined>>({
  title = 'Filtros',
  fields,
  values,
  onFilterChange,
  onReset,
  defaultValues,
  sortOptions,
  onSortChange,
  currentSort
}: UnifiedFiltersProps<T>) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...values, [name]: value };
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newFilters = { ...values, searchTerm: value };
    onFilterChange(newFilters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange?.(e.target.value);
  };

  const handleReset = () => {
    onFilterChange(defaultValues);
    onReset();
  };

  const renderField = (field: FilterField) => {
    const colSize = field.colSize || 4;
    const currentValue = (values?.[field.name] as string) ?? '';

    if (field.type === 'select') {
      return (
        <div key={field.name} className={`col-md-${colSize}`}>
          <select
            name={field.name}
            className="form-select"
            value={currentValue}
            onChange={handleInputChange}
          >
            <option value="">{field.placeholder}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={field.name} className={`col-md-${colSize}`}>
        <div className={field.type === 'search' ? 'input-group' : ''}>
          {field.type === 'search' && (
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
          )}
          <input
            type="text"
            name={field.name}
            className="form-control"
            placeholder={field.placeholder}
            value={currentValue}
            onChange={field.type === 'search' ? handleSearchChange : handleInputChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">{title}</h5>
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
            {fields.map(renderField)}

            {/* Sort and Reset Buttons */}
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                {sortOptions && onSortChange && (
                  <div className="d-flex align-items-center">
                    <span className="me-2">Ordenar por:</span>
                    <select
                      className="form-select form-select-sm"
                      value={currentSort}
                      onChange={handleSortChange}
                      style={{ width: 'auto' }}
                    >
                      <option value="">Seleccionar...</option>
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
    </div>
  );
};

export default UnifiedFilters;