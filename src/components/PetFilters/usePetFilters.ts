import { useState, useEffect, useRef } from 'react';
import { PetFilterValues } from '@/types/pet';

export const initialFilters: PetFilterValues = {
  tipo: '',
  sexo: '',
  edad: '',
  raza: '',
  tamaño: '',
  estado: 'disponible',
  searchTerm: '',
};

export function usePetFilters(
  onFilterChange: (filters: PetFilterValues) => void,
  onReset?: () => void
) {
  const [filters, setFilters] = useState<PetFilterValues>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(true);
  const [filtersModified, setFiltersModified] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
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
      setContentHeight(contentRef.current.scrollHeight);
    }
    setAnimating(true);
    setIsExpanded(!isExpanded);
    setTimeout(() => {
      setAnimating(false);
    }, 500);
  };

  // Handle mobile modal
  const handleMobileModalClose = () => {
    setShowMobileModal(false);
  };

  const handleMobileModalOpen = () => {
    setShowMobileModal(true);
  };

  return {
    filters,
    setFilters,
    isExpanded,
    setIsExpanded,
    filtersModified,
    setFiltersModified,
    animating,
    setAnimating,
    showMobileModal,
    setShowMobileModal,
    contentRef,
    contentHeight,
    setContentHeight,
    handleInputChange,
    handleReset,
    toggleFilters,
    handleMobileModalClose,
    handleMobileModalOpen,
  };
} 