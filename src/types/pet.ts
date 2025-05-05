// src/types/pet.ts

import { Status, PetType, Size, Sex, AgeCategory } from '../constants/adoption';

// Main pet interface
export interface Pet {
  id: string;
  type: PetType;
  name: string;
  breed: string;
  age: {
    years: number;
    months: number;
  };
  sex: Sex;
  size: Size;
  weight: number;
  color: string;
  physicalCharacteristics: {
    coat: string;
    ears?: string;
    tail?: string;
    pattern?: string;
    specialMarks: string[];
  };
  health: {
    status: string;
    vaccines: string[];
    lastVaccine: string;
    sterilized: boolean;
    sterilizationDate: string;
    microchip: boolean;
    microchipNumber: string;
    specialConditions: string[];
    allergies: string[];
    medications: string[];
  };
  behavior: {
    energy: string;
    sociability: string;
    training: string;
    goodWithChildren: boolean;
    goodWithDogs: boolean;
    goodWithCats: boolean;
    character: string[];
    specialNeeds: string[];
  };
  history: {
    origin: string;
    rescueDate: string;
    rescueCircumstances: string;
    medicalHistory: string;
    specialNotes: string;
  };
  care: {
    feeding: string;
    exercise: string;
    grooming: string;
    specialNeeds: string[];
  };
  relationships: {
    currentShelter: string;
    shelterEntryDate: string;
    currentAdopter: string | null;
    adoptionDate?: string;
    previousAdopters: Array<{
      id: string;
      adoptionDate: string;
      returnDate: string;
      reason: string;
    }>;
    currentFoster: string | null;
    previousFosters: string[];
  };
  photos: string[];
  status: Status;
  registrationDate: string;
  lastUpdate: string;
}

// UI filter type (used in React components)
export interface PetFilterValues {
  type: PetType | '';
  age: AgeCategory | '';
  size: Size | '';
  sex: Sex | '';
  breed: string;
  status: Status | '';
  searchTerm: string; // UI only
}

// Backend/API filter type (used for API calls, etc.)
export interface PetFilters {
  type: PetType | '';
  size: Size | '';
  sex: Sex | '';
  age: AgeCategory | '';
  breed: string;
  search: string; // API/backend only
  status: Status | '';
}

// Error handling type
export interface PetErrors {
  type: boolean;
}

// Export other pet-related types here as needed (e.g., Mascota, Estado, etc.) 