import { describe, it, expect } from 'vitest';
import { getSponsors, getSponsor, createSponsor, updateSponsor, deleteSponsor } from '@/api/sponsors';
import Sponsor from '@/models/Sponsor';
import type { Sponsor as ISponsor } from '@/types/sponsor';

describe('Sponsors API', () => {
  const mockSponsor: Partial<ISponsor> = {
    id: 'S001',
    name: 'María González',
    type: 'individual',
    email: 'maria.gonzalez@email.com',
    phone: '+54 11 8765-4321',
    address: {
      street: 'Avenida Siempreviva 742',
      city: 'Buenos Aires',
      province: 'Buenos Aires',
      postalCode: 'C1234ABC',
      country: 'Argentina'
    },
    documents: {
      dni: '12345678',
      taxId: '20-12345678-9'
    },
    sponsorshipHistory: [
      {
        shelterId: 'SH001',
        shelterName: 'Refugio de Animales',
        amount: 5000,
        frequency: 'monthly',
        startDate: '2024-01-01',
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

  describe('GET /api/sponsors', () => {
    it('should return all sponsors', async () => {
      await Sponsor.create(mockSponsor);
      
      const sponsors = await getSponsors();
      
      expect(Array.isArray(sponsors)).toBe(true);
      expect(sponsors.length).toBeGreaterThan(0);
      expect(sponsors[0].name).toBe(mockSponsor.name);
    });
  });

  describe('GET /api/sponsors/[id]', () => {
    it('should return a sponsor by id', async () => {
      const sponsor = await Sponsor.create(mockSponsor);
      
      const foundSponsor = await getSponsor(sponsor.id);
      
      expect(foundSponsor.name).toBe(mockSponsor.name);
    });

    it('should throw error for non-existent sponsor', async () => {
      await expect(getSponsor('nonexistent')).rejects.toThrow('Failed to fetch sponsor');
    });
  });

  describe('POST /api/sponsors/create', () => {
    it('should create a new sponsor', async () => {
      const createdSponsor = await createSponsor(mockSponsor);
      
      expect(createdSponsor.name).toBe(mockSponsor.name);
    });
  });

  describe('PUT /api/sponsors/[id]/update', () => {
    it('should update a sponsor', async () => {
      const sponsor = await Sponsor.create(mockSponsor);
      const updatedName = 'María González Updated';
      
      const updatedSponsor = await updateSponsor(sponsor.id, { name: updatedName });
      
      expect(updatedSponsor.name).toBe(updatedName);
    });
  });

  describe('DELETE /api/sponsors/[id]/delete', () => {
    it('should delete a sponsor', async () => {
      const sponsor = await Sponsor.create(mockSponsor);
      
      await deleteSponsor(sponsor.id);
      
      const deletedSponsor = await Sponsor.findOne({ id: sponsor.id });
      expect(deletedSponsor).toBeNull();
    });
  });
}); 