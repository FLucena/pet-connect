import sheltersData from '@/data/shelters.json';
import { calculateDistance, getCoordinatesFromAddress } from '@/utils/locationUtils';

// Define types
export interface ShelterAddress {
  calle: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  pais: string;
}

export interface ShelterContact {
  telefono: string;
  email: string;
  web: string;
  redesSociales: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Shelter {
  id: string;
  nombre: string;
  descripcion: string;
  direccion: ShelterAddress;
  contacto: ShelterContact;
  rating: number;
  reseñas: number;
  fotos: string[];
  estado: string;
  servicios?: string[];
  requisitosAdopcion?: string[];
  horarios?: Record<string, string>;
  estadisticas?: {
    adopcionesExitosas: number;
    animalesRescatados: number;
    animalesEsterilizados: number;
  };
  capacidad?: {
    maxima: number;
    actual: number;
  };
  fechaRegistro?: string;
  // Added by our service:
  coordinates?: {
    lat: number;
    lng: number;
  };
  distance?: number;
}

interface SheltersData {
  refugios: Shelter[];
}

// Service functions
export const getShelters = (): Shelter[] => {
  return (sheltersData as SheltersData).refugios;
};

export const getShelterById = (id: string): Shelter | undefined => {
  return getShelters().find(shelter => shelter.id === id);
};

export const getSheltersWithCoordinates = async (): Promise<Shelter[]> => {
  const shelters = getShelters();
  const sheltersWithCoordinates: Shelter[] = [];
  
  for (const shelter of shelters) {
    const addressStr = `${shelter.direccion.calle}, ${shelter.direccion.ciudad}, ${shelter.direccion.provincia}, ${shelter.direccion.pais}`;
    const coordinates = await getCoordinatesFromAddress(addressStr);
    
    if (coordinates) {
      sheltersWithCoordinates.push({
        ...shelter,
        coordinates
      });
    } else {
      sheltersWithCoordinates.push(shelter);
    }
  }
  
  return sheltersWithCoordinates;
};

export const getNearestShelters = (
  shelters: Shelter[],
  userLocation: { lat: number; lng: number },
  maxDistance: number = Infinity
): Shelter[] => {
  return shelters
    .filter(shelter => shelter.coordinates)
    .map(shelter => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        shelter.coordinates!.lat,
        shelter.coordinates!.lng
      );
      
      return {
        ...shelter,
        distance
      };
    })
    .filter(shelter => shelter.distance !== undefined && shelter.distance <= maxDistance)
    .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
}; 