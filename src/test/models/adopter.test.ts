import { describe, it, expect } from 'vitest';
import Adopter from '../../models/Adopter';
import { Adopter as AdopterType } from '../../types/adopter';

describe('Adopter Model', () => {
  const mockAdopter: AdopterType = {
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

  it('should create an adopter successfully', async () => {
    const adopter = new Adopter(mockAdopter);
    const savedAdopter = await adopter.save();
    
    expect(savedAdopter._id).toBeDefined();
    expect(savedAdopter.id).toBe(mockAdopter.id);
    expect(savedAdopter.firstName).toBe(mockAdopter.firstName);
    expect(savedAdopter.lastName).toBe(mockAdopter.lastName);
  });

  it('should fail to create an adopter without required fields', async () => {
    const adopter = new Adopter({});
    
    try {
      await adopter.save();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should find an adopter by id', async () => {
    const adopter = new Adopter(mockAdopter);
    await adopter.save();
    
    const foundAdopter = await Adopter.findOne({ id: mockAdopter.id });
    expect(foundAdopter).toBeDefined();
    expect(foundAdopter?.firstName).toBe(mockAdopter.firstName);
    expect(foundAdopter?.lastName).toBe(mockAdopter.lastName);
  });

  it('should update an adopter', async () => {
    const adopter = new Adopter(mockAdopter);
    await adopter.save();
    
    const updatedFirstName = 'Carlos Updated';
    await Adopter.findOneAndUpdate(
      { id: mockAdopter.id },
      { firstName: updatedFirstName }
    );
    
    const updatedAdopter = await Adopter.findOne({ id: mockAdopter.id });
    expect(updatedAdopter?.firstName).toBe(updatedFirstName);
  });

  it('should delete an adopter', async () => {
    const adopter = new Adopter(mockAdopter);
    await adopter.save();
    
    await Adopter.findOneAndDelete({ id: mockAdopter.id });
    const deletedAdopter = await Adopter.findOne({ id: mockAdopter.id });
    expect(deletedAdopter).toBeNull();
  });
}); 