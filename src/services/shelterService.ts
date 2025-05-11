import sheltersData from '@/data/shelters.json';
import { calculateDistance, getCoordinatesFromAddress } from '@/utils/locationUtils';
import { Shelter, SheltersData } from '@/types/shelter';

// Service functions
export const getShelters = (): Shelter[] => {
  return ((sheltersData as unknown) as SheltersData).shelters;
};

export const getShelterById = (id: string): Shelter | undefined => {
  return getShelters().find(shelter => shelter.id === id);
};

export const getSheltersWithCoordinates = async (): Promise<Shelter[]> => {
  const shelters = getShelters();
  const sheltersWithCoordinates: Shelter[] = [];
  
  for (const shelter of shelters) {
    const addressStr = `${shelter.address.street}, ${shelter.address.city}, ${shelter.address.province}, ${shelter.address.country}`;
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