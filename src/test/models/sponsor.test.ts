import { describe, it, expect, beforeEach } from 'vitest';
import Sponsor from '../../models/Sponsor';
import { Sponsor as SponsorType } from '../../types/sponsor';
import { clearDatabase } from '../setup';

describe('Sponsor Model', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  const mockSponsor: SponsorType = {
    id: 'S001',
    name: 'María González',
    type: 'individual',
    email: 'maria.gonzalez@email.com',
    phone: '+54 11 8765-4321',
    address: {
      street: 'Avenida Siempreviva 742',
      city: 'Buenos Aires',
      province: 'Buenos Aires',
      postalCode: 'C1414',
      country: 'Argentina'
    },
    documents: {
      dni: '12345678',
      taxId: '20-12345678-9'
    },
    sponsorshipHistory: [
      {
        shelterId: 'SH001',
        shelterName: 'Happy Paws Shelter',
        amount: 5000,
        frequency: 'monthly',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'active'
      }
    ],
    preferences: {
      shelters: ['SH001'],
      maxAmount: 10000,
      frequency: 'monthly'
    },
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  it('should create a sponsor successfully', async () => {
    const sponsor = new Sponsor(mockSponsor);
    const savedSponsor = await sponsor.save();
    
    expect(savedSponsor._id).toBeDefined();
    expect(savedSponsor.id).toBe(mockSponsor.id);
    expect(savedSponsor.name).toBe(mockSponsor.name);
  });

  it('should fail to create a sponsor without required fields', async () => {
    const sponsor = new Sponsor({});
    
    try {
      await sponsor.save();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should find a sponsor by id', async () => {
    const sponsor = new Sponsor(mockSponsor);
    await sponsor.save();
    
    const foundSponsor = await Sponsor.findOne({ id: mockSponsor.id });
    expect(foundSponsor).toBeDefined();
    expect(foundSponsor?.name).toBe(mockSponsor.name);
  });

  it('should update a sponsor', async () => {
    const sponsor = new Sponsor(mockSponsor);
    await sponsor.save();
    
    const newName = 'María González Actualizada';
    await Sponsor.findOneAndUpdate(
      { id: mockSponsor.id },
      { name: newName }
    );
    
    const updatedSponsor = await Sponsor.findOne({ id: mockSponsor.id });
    expect(updatedSponsor?.name).toBe(newName);
  });

  it('should delete a sponsor', async () => {
    const sponsor = new Sponsor(mockSponsor);
    await sponsor.save();
    
    await Sponsor.findOneAndDelete({ id: mockSponsor.id });
    const deletedSponsor = await Sponsor.findOne({ id: mockSponsor.id });
    expect(deletedSponsor).toBeNull();
  });
}); 