import { usePetFilters } from './PetFilters/usePetFilters';
import PetDesktopFilters from './PetFilters/PetDesktopFilters';
import PetFiltersModal from './PetFilters/PetMobileFiltersModal';
import { PetFilterValues } from '../types/pet';

type PetFiltersProps = {
  onFilterChange: (filters: PetFilterValues) => void;
  onReset?: () => void;
};

const PetFilters = ({ onFilterChange, onReset }: PetFiltersProps) => {
  const {
    filters,
    isExpanded,
    filtersModified,
    showMobileModal,
    contentRef,
    handleInputChange,
    handleReset,
    toggleFilters,
    handleMobileModalClose,
    handleMobileModalOpen,
  } = usePetFilters(onFilterChange, onReset);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="d-sm-none mb-3">
        <button
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleMobileModalOpen}
        >
          <i className="bi bi-funnel"></i>
          <span>Filtros de Mascotas</span>
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="d-none d-sm-block">
        <PetDesktopFilters
          filters={filters}
          handleInputChange={handleInputChange}
          handleReset={handleReset}
          filtersModified={filtersModified}
          isExpanded={isExpanded}
          toggleFilters={toggleFilters}
          contentRef={contentRef}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* Mobile Modal */}
      {showMobileModal && (
        <PetFiltersModal
          petFilters={filters}
          onPetFilterChange={handleInputChange}
          onPetFiltersReset={handleReset}
          petFiltersModified={filtersModified}
          onClose={handleMobileModalClose}
        />
      )}
    </>
  );
};

export default PetFilters; 