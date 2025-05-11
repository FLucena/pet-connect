import { describe, it, expect, beforeEach } from 'vitest';
import { getShelters, getShelterById, createShelter, updateShelter, deleteShelter } from '../../api/shelters';
import { clearDatabase } from '../setup';
import { Shelter as ShelterType } from '../../types/shelter';
import Shelter from '../../models/Shelter';

const mockShelter: Partial<ShelterType> = {
  id: 'S001',
  name: 'Refugio de Animales San Francisco',
  type: 'refugio',
  description: 'Un refugio dedicado al cuidado y protección de animales abandonados',
  contact: {
    email: 'contacto@refugiosf.com',
    phone: '123-456-7890',
    website: 'www.refugiosf.com',
    socialMedia: {
      facebook: 'refugiosf',
      instagram: 'refugiosf',
      twitter: 'refugiosf'
    }
  },
  location: {
    address: 'Calle Principal 123',
    city: 'San Francisco',
    state: 'Buenos Aires',
    country: 'Argentina',
    coordinates: {
      latitude: -34.6037,
      longitude: -58.3816
    }
  },
  capacity: {
    total: 100,
    current: 50,
    available: 50
  },
  facilities: {
    indoor: true,
    outdoor: true,
    medical: true,
    training: true,
    description: 'Área de cuarentena, Clínica veterinaria, Patio de juegos'
  },
  services: ['Adopción', 'Esterilización', 'Vacunación'],
  staff: {
    total: 17,
    volunteers: 10,
    roles: ['veterinario', 'cuidador', 'voluntario']
  },
  animals: {
    total: 50,
    byType: {
      perros: 30,
      gatos: 20
    }
  },
  photos: ['foto1.jpg', 'foto2.jpg'],
  status: 'active',
  registrationDate: new Date().toISOString(),
  lastUpdate: new Date().toISOString()
};

describe('Shelters API', () => {
  beforeEach(async () => {
    await clearDatabase();
    // Create a test shelter before each test
    await new Shelter(mockShelter).save();
  });

  describe('getShelters', () => {
    it('should return all shelters', async () => {
      const shelters = await getShelters();
      expect(Array.isArray(shelters)).toBe(true);
      expect(shelters.length).toBeGreaterThan(0);
      expect(shelters[0]).toMatchObject(mockShelter);
    });
  });

  describe('getShelterById', () => {
    it('should return a shelter by id', async () => {
      const shelter = await getShelterById('S001');
      expect(shelter).toMatchObject(mockShelter);
    });

    it('should throw error for non-existent shelter', async () => {
      await expect(getShelterById('nonexistent')).rejects.toThrow('Shelter not found');
    });
  });

  describe('createShelter', () => {
    it('should create a new shelter', async () => {
      const shelterData = { ...mockShelter };
      delete shelterData.id;
      const result = await createShelter(shelterData as Omit<ShelterType, 'id'>);
      expect(result).toBeDefined();
      expect(result.insertedId).toBeDefined();
    });
  });

  describe('updateShelter', () => {
    it('should update an existing shelter', async () => {
      const updateData: Partial<ShelterType> = {
        name: 'Refugio de Animales San Francisco Actualizado',
        description: 'Descripción actualizada'
      };
      const result = await updateShelter('S001', updateData);
      expect(result.modifiedCount).toBe(1);
    });

    it('should throw error when updating non-existent shelter', async () => {
      const updateData: Partial<ShelterType> = { name: 'Nuevo Nombre' };
      await expect(updateShelter('nonexistent', updateData)).rejects.toThrow('Shelter not found');
    });
  });

  describe('deleteShelter', () => {
    it('should delete a shelter', async () => {
      const result = await deleteShelter('S001');
      expect(result.deletedCount).toBe(1);
    });

    it('should throw error when deleting non-existent shelter', async () => {
      await expect(deleteShelter('nonexistent')).rejects.toThrow('Shelter not found');
    });
  });
}); 