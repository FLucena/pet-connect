import { describe, it, expect, beforeEach } from 'vitest';
import Shelter from '../../models/Shelter';
import { Shelter as ShelterType } from '../../types/shelter';
import { clearDatabase } from '../setup';

describe('Shelter Model', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

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

  it('should create a shelter successfully', async () => {
    const shelter = new Shelter(mockShelter);
    const savedShelter = await shelter.save();
    
    expect(savedShelter._id).toBeDefined();
    expect(savedShelter.id).toBe(mockShelter.id);
    expect(savedShelter.name).toBe(mockShelter.name);
  });

  it('should fail to create a shelter without required fields', async () => {
    const shelter = new Shelter({});
    
    try {
      await shelter.save();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should find a shelter by id', async () => {
    const shelter = new Shelter(mockShelter);
    await shelter.save();
    
    const foundShelter = await Shelter.findOne({ id: mockShelter.id });
    expect(foundShelter).toBeDefined();
    expect(foundShelter?.name).toBe(mockShelter.name);
  });

  it('should update a shelter', async () => {
    const shelter = new Shelter(mockShelter);
    await shelter.save();
    
    const newName = 'Refugio de Animales San Francisco Actualizado';
    await Shelter.findOneAndUpdate(
      { id: mockShelter.id },
      { name: newName }
    );
    
    const updatedShelter = await Shelter.findOne({ id: mockShelter.id });
    expect(updatedShelter?.name).toBe(newName);
  });

  it('should delete a shelter', async () => {
    const shelter = new Shelter(mockShelter);
    await shelter.save();
    
    await Shelter.findOneAndDelete({ id: mockShelter.id });
    const deletedShelter = await Shelter.findOne({ id: mockShelter.id });
    expect(deletedShelter).toBeNull();
  });
}); 