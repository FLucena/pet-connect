import { UseFormRegister, Path } from 'react-hook-form';

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface Contact {
  email: string;
  phone: string;
  website?: string;
  socialMedia: SocialMedia;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Capacity {
  total: number;
  current: number;
  available: number;
}

export interface Facilities {
  indoor: boolean;
  outdoor: boolean;
  medical: boolean;
  training: boolean;
  description?: string;
}

export interface Staff {
  total: number;
  volunteers: number;
  roles: string[];
}

export interface Animals {
  total: number;
  byType: {
    perros: number;
    gatos: number;
  };
}

export interface Shelter {
  id: string;
  name: string;
  type: string;
  description: string;
  contact: Contact;
  address: Address;
  location: Location;
  capacity: Capacity;
  facilities: Facilities;
  services: string[];
  staff: Staff;
  animals: Animals;
  photos: string[];
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
  lastUpdate: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  openingHours?: Record<string, string>;
  adoptionRequirements?: string[];
  statistics?: {
    successfulAdoptions: number;
    rescuedAnimals: number;
    sterilizedAnimals: number;
  };
  reviewStats?: {
    rating: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
  images: string[];
  rating?: number;
  reviewCount?: number;
}

export interface SheltersData {
  shelters: Shelter[];
}

export interface NewShelterFormData {
  name: string;
  type: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    website?: string;
    socialMedia?: SocialMedia;
  };
  location: {
    city: string;
    state: string;
    address: string;
    postalCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  services: string[];
  capacity: {
    total: number;
    current: number;
    available: number;
  };
  images: string[];
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