import { describe, it, expect } from 'vitest';
import Pet from '../../models/Pet';
import { Pet as PetType } from '../../types/pet';

describe('Pet Model', () => {
  const mockPet: Partial<PetType> = {
    id: 'M001',
    type: 'perro',
    name: 'Luna',
    breed: 'Labrador Retriever',
    age: {
      years: 2,
      months: 6
    },
    sex: 'hembra',
    size: 'mediano',
    weight: 25,
    color: 'negro',
    physicalCharacteristics: {
      coat: 'corto',
      ears: 'caídas',
      tail: 'larga',
      specialMarks: ['mancha blanca en el pecho']
    },
    health: {
      status: 'saludable',
      vaccines: ['antirrábica', 'moquillo', 'parvovirus'],
      lastVaccine: '2025-01-15',
      sterilized: true,
      sterilizationDate: '2023-12-10',
      microchip: true,
      microchipNumber: 'AR123456789',
      specialConditions: [],
      allergies: [],
      medications: []
    },
    behavior: {
      energy: 'alta',
      sociability: 'alta',
      training: 'básico',
      goodWithChildren: true,
      goodWithDogs: true,
      goodWithCats: false,
      character: ['juguetón', 'amigable', 'activo'],
      specialNeeds: ['ejercicio diario', 'compañía frecuente']
    },
    history: {
      origin: 'rescate',
      rescueDate: '2023-10-05',
      rescueCircumstances: 'Encontrada abandonada en la calle',
      medicalHistory: 'Ninguna',
      specialNotes: 'Responde bien al entrenamiento positivo'
    },
    care: {
      feeding: '2 veces al día',
      exercise: '2-3 paseos diarios',
      grooming: 'baño mensual',
      specialNeeds: ['cepillado semanal']
    },
    relationships: {
      currentShelter: 'R001',
      shelterEntryDate: '2023-10-05',
      currentAdopter: null,
      previousAdopters: [],
      currentFoster: null,
      previousFosters: []
    },
    photos: [],
    status: 'available',
    registrationDate: new Date().toISOString(),
    lastUpdate: new Date().toISOString()
  };

  it('should create a pet successfully', async () => {
    const pet = new Pet(mockPet);
    const savedPet = await pet.save();
    
    expect(savedPet._id).toBeDefined();
    expect(savedPet.id).toBe(mockPet.id);
    expect(savedPet.name).toBe(mockPet.name);
  });

  it('should fail to create a pet without required fields', async () => {
    const pet = new Pet({});
    
    try {
      await pet.save();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should find a pet by id', async () => {
    const pet = new Pet(mockPet);
    await pet.save();
    
    const foundPet = await Pet.findOne({ id: mockPet.id });
    expect(foundPet).toBeDefined();
    expect(foundPet?.name).toBe(mockPet.name);
  });

  it('should update a pet', async () => {
    const pet = new Pet(mockPet);
    await pet.save();
    
    const newName = 'Luna Updated';
    await Pet.findOneAndUpdate(
      { id: mockPet.id },
      { name: newName }
    );
    
    const updatedPet = await Pet.findOne({ id: mockPet.id });
    expect(updatedPet?.name).toBe(newName);
  });

  it('should delete a pet', async () => {
    const pet = new Pet(mockPet);
    await pet.save();
    
    await Pet.findOneAndDelete({ id: mockPet.id });
    const deletedPet = await Pet.findOne({ id: mockPet.id });
    expect(deletedPet).toBeNull();
  });
}); 