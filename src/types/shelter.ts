import { UseFormRegister, Path } from 'react-hook-form';

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface SocialMedia {
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
}

export interface Contact {
  phone: string;
  email: string;
  website?: string | null;
  socialMedia: SocialMedia;
}

export interface ShelterAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface ShelterSocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface ShelterContact {
  phone: string;
  email: string;
  website: string;
  socialMedia: ShelterSocialMedia;
}

export interface Shelter {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
    socialMedia: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  services: string[];
  statistics: {
    successfulAdoptions: number;
    rescuedAnimals: number;
    sterilizedAnimals: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  adoptionRequirements: string[];
  openingHours: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
  reviews?: {
    rating: number;
    count: number;
  };
  photos?: string[];
}

export interface SheltersData {
  shelters: Shelter[];
}

export interface NewShelterFormData {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
    socialMedia: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  services: string[];
  adoptionRequirements: string[];
  openingHours: Record<string, string>;
}

export interface ShelterFormFieldProps {
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  register: UseFormRegister<NewShelterFormData>;
  name: Path<NewShelterFormData>;
} 