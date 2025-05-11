import { describe, it, expect, beforeEach } from 'vitest';
import { GET, POST, PUT, DELETE } from '../../api/adopters';
import Adopter from '../../models/Adopter';
import { clearDatabase } from '../setup';

describe('Adopters API', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  const mockAdopter = {
    id: 'A001',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '+54 11 7654-3210',
    address: {
      street: 'Calle Principal 123',
      city: 'Buenos Aires',
      province: 'Buenos Aires',
      postalCode: 'C1234ABC',
      country: 'Argentina'
    },
    documents: {
      dni: '12345678',
      proofOfAddress: 'proof.pdf',
      incomeProof: 'income.pdf'
    },
    adoptionHistory: [
      {
        petId: 'M001',
        petName: 'Luna',
        adoptionDate: '2024-01-15',
        status: 'active'
      }
    ],
    preferences: {
      petType: ['perro', 'gato'],
      size: ['pequeño', 'mediano'],
      age: ['joven', 'adulto'],
      specialNeeds: false
    },
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  describe('GET /api/adopters', () => {
    it('should return all adopters', async () => {
      await Adopter.create(mockAdopter);
      
      const request = new Request('http://localhost:3000/api/adopters');
      const response = await GET(request);
      const body = await response.json();
      
      expect(response.status).toBe(200);
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
      expect(body[0].firstName).toBe(mockAdopter.firstName);
    });
  });

  describe('GET /api/adopters/[id]', () => {
    it('should return an adopter by id', async () => {
      const adopter = await Adopter.create(mockAdopter);
      
      const request = new Request(`http://localhost:3000/api/adopters?id=${adopter.id}`);
      const response = await GET(request);
      const body = await response.json();
      
      expect(response.status).toBe(200);
      expect(body.firstName).toBe(mockAdopter.firstName);
    });

    it('should return 404 for non-existent adopter', async () => {
      const request = new Request('http://localhost:3000/api/adopters?id=nonexistent');
      const response = await GET(request);
      
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/adopters', () => {
    it('should create a new adopter', async () => {
      const request = new Request('http://localhost:3000/api/adopters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockAdopter)
      });
      
      const response = await POST(request);
      const body = await response.json();
      
      expect(response.status).toBe(201);
      expect(body.firstName).toBe(mockAdopter.firstName);
    });
  });

  describe('PUT /api/adopters/[id]', () => {
    it('should update an adopter', async () => {
      const adopter = await Adopter.create(mockAdopter);
      const updatedFirstName = 'Carlos Updated';
      
      const request = new Request(`http://localhost:3000/api/adopters?id=${adopter.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName: updatedFirstName })
      });
      
      const response = await PUT(request);
      const body = await response.json();
      
      expect(response.status).toBe(200);
      expect(body.firstName).toBe(updatedFirstName);
    });
  });

  describe('DELETE /api/adopters/[id]', () => {
    it('should delete an adopter', async () => {
      const adopter = await Adopter.create(mockAdopter);
      
      const request = new Request(`http://localhost:3000/api/adopters?id=${adopter.id}`, {
        method: 'DELETE'
      });
      
      const response = await DELETE(request);
      
      expect(response.status).toBe(200);
      
      const deletedAdopter = await Adopter.findOne({ id: adopter.id });
      expect(deletedAdopter).toBeNull();
    });
  });
}); 