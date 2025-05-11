import { Sponsor as ISponsor } from '../types/sponsor';
import Sponsor from '../models/Sponsor';

interface Sponsorship {
  shelterId: string;
  shelterName: string;
  amount: number;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'cancelled';
}

export async function getSponsors() {
  const sponsors = await Sponsor.find({});
  return sponsors;
}

export async function getSponsor(id: string) {
  const sponsor = await Sponsor.findOne({ id });
  if (!sponsor) {
    throw new Error('Failed to fetch sponsor');
  }
  return sponsor;
}

export async function createSponsor(sponsorData: Partial<ISponsor>) {
  const sponsor = await Sponsor.create(sponsorData);
  return sponsor;
}

export async function updateSponsor(id: string, sponsorData: Partial<ISponsor>) {
  const sponsor = await Sponsor.findOneAndUpdate(
    { id },
    sponsorData,
    { new: true }
  );
  if (!sponsor) {
    throw new Error('Failed to update sponsor');
  }
  return sponsor;
}

export async function deleteSponsor(id: string) {
  const result = await Sponsor.findOneAndDelete({ id });
  if (!result) {
    throw new Error('Failed to delete sponsor');
  }
  return result;
}

// Additional utility functions for sponsor-specific operations
export async function getActiveSponsorships(sponsorId: string) {
  const sponsor = await getSponsor(sponsorId);
  return sponsor.sponsorshipHistory.filter(
    (sponsorship: Sponsorship) => sponsorship.status === 'active'
  );
}

export async function getSponsorshipHistory(sponsorId: string) {
  const sponsor = await getSponsor(sponsorId);
  return sponsor.sponsorshipHistory;
} 