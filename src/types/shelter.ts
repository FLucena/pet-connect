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
  web?: string | null;
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
  web: string;
  socialMedia: ShelterSocialMedia;
}

export interface Shelter {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  services: string[];
  adoptionRequirements: string[];
  openingHours: Record<string, string>;
  statistics: {
    successfulAdoptions: number;
    rescuedAnimals: number;
    sterilizedAnimals: number;
  };
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
    website: string;
    socialMedia: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  rating: number;
  reviews: number;
  photos: string[];
}

export interface SheltersData {
  shelters: Shelter[];
}

export interface NewShelterFormData {
  name: string;
  description: string;
  address: Address;
  contact: Contact;
} 