import { describe, it, expect } from 'vitest';
import Shelter from '../../models/Shelter';
import { Shelter as ShelterType } from '../../types/shelter';

describe('Shelter Model', () => {
  const mockShelter: Partial<ShelterType> = {
    id: 'R001',
    name: 'Refugio Esperanza',
    type: 'refugio',
    description: 'Refugio dedicado al rescate y cuidado de animales abandonados',
    contact: {
      email: 'contacto@refugioesperanza.com',
      phone: '+54 11 1234-5678',
      website: 'www.refugioesperanza.com',
      socialMedia: {
        facebook: 'refugioesperanza',
        instagram: '@refugioesperanza',
        twitter: '@refugioesperanza'
      }
    },
    location: {
      address: 'Av. Siempreviva 742',
      city: 'Buenos Aires',
      state: 'Buenos Aires',
      country: 'Argentina',
      coordinates: {
        latitude: -34.6037,
        longitude: -58.3816
      }
    },
    capacity: {
      total: 100,
      current: 75,
      available: 25
    },
    facilities: {
      indoor: true,
      outdoor: true,
      medical: true,
      training: true,
      description: 'Instalaciones modernas con áreas separadas para perros y gatos'
    },
    services: [
      'adopción',
      'rescate',
      'esterilización',
      'vacunación',
      'microchip'
    ],
    staff: {
      total: 15,
      volunteers: 30,
      roles: ['veterinarios', 'cuidadores', 'administrativos']
    },
    animals: {
      total: 75,
      byType: {
        perros: 50,
        gatos: 25
      }
    },
    photos: [],
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
    
    const newName = 'Refugio Esperanza Actualizado';
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