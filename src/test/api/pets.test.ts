import { describe, it, expect, beforeEach } from 'vitest';
import { GET, POST, PUT, DELETE } from '../../api/pets';
import Pet from '../../models/Pet';
import { clearDatabase } from '../setup';

describe('Pets API', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  const mockPet = {
    id: 'M001',
    type: 'dog',
    name: 'Luna',
    breed: 'Labrador Retriever',
    age: {
      years: 2,
      months: 6
    },
    sex: 'female',
    size: 'medium',
    weight: 25,
    color: 'black',
    physicalCharacteristics: {
      coat: 'short',
      ears: 'floppy',
      tail: 'long',
      pattern: 'solid',
      specialMarks: []
    },
    health: {
      status: 'healthy',
      vaccines: ['rabies', 'distemper', 'parvovirus'],
      lastVaccine: '2024-01-15',
      sterilized: true,
      sterilizationDate: '2023-06-15',
      microchip: true,
      microchipNumber: 'MC123456',
      specialConditions: [],
      allergies: [],
      medications: []
    },
    behavior: {
      energy: 'high',
      sociability: 'friendly',
      training: 'basic',
      goodWithChildren: true,
      goodWithDogs: true,
      goodWithCats: true,
      character: ['playful', 'gentle'],
      specialNeeds: []
    },
    history: {
      origin: 'rescue',
      rescueDate: '2023-01-15',
      rescueCircumstances: 'Found as a stray',
      medicalHistory: 'No major issues',
      specialNotes: ''
    },
    care: {
      feeding: 'twice daily',
      exercise: 'daily walks and play',
      grooming: 'weekly brushing',
      specialNeeds: []
    },
    relationships: {
      currentShelter: 'Happy Paws Shelter',
      shelterEntryDate: '2023-01-15',
      currentAdopter: null,
      previousAdopters: [],
      currentFoster: null,
      previousFosters: []
    },
    photos: ['luna1.jpg', 'luna2.jpg'],
    status: 'available',
    registrationDate: new Date().toISOString(),
    lastUpdate: new Date().toISOString()
  };

  describe('GET /api/pets', () => {
    it('should return all pets', async () => {
      await Pet.create(mockPet);
      
      const request = new Request('http://localhost:3000/api/pets');
      const response = await GET(request);
      const body = await response.json();
      
      expect(response.status).toBe(200);
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
      expect(body[0].name).toBe(mockPet.name);
    });
  });

  describe('GET /api/pets/[id]', () => {
    it('should return a pet by id', async () => {
      const pet = await Pet.create(mockPet);
      
      const request = new Request(`http://localhost:3000/api/pets?id=${pet.id}`);
      const response = await GET(request);
      const body = await response.json();
      
      expect(response.status).toBe(200);
      expect(body.name).toBe(mockPet.name);
    });

    it('should return 404 for non-existent pet', async () => {
      const request = new Request('http://localhost:3000/api/pets?id=nonexistent');
      const response = await GET(request);
      
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/pets', () => {
    it('should create a new pet', async () => {
      const request = new Request('http://localhost:3000/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockPet)
      });
      
      const response = await POST(request);
      const body = await response.json();
      
      expect(response.status).toBe(201);
      expect(body.name).toBe(mockPet.name);
    });
  });

  describe('PUT /api/pets/[id]', () => {
    it('should update a pet', async () => {
      const pet = await Pet.create(mockPet);
      const updatedName = 'Luna Updated';
      
      const request = new Request(`http://localhost:3000/api/pets?id=${pet.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: updatedName })
      });
      
      const response = await PUT(request);
      const body = await response.json();
      
      expect(response.status).toBe(200);
      expect(body.name).toBe(updatedName);
    });
  });

  describe('DELETE /api/pets/[id]', () => {
    it('should delete a pet', async () => {
      const pet = await Pet.create(mockPet);
      
      const request = new Request(`http://localhost:3000/api/pets?id=${pet.id}`, {
        method: 'DELETE'
      });
      
      const response = await DELETE(request);
      
      expect(response.status).toBe(200);
      
      const deletedPet = await Pet.findOne({ id: pet.id });
      expect(deletedPet).toBeNull();
    });
  });
}); 