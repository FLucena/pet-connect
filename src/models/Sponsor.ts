import mongoose from 'mongoose';
import { Sponsor } from '../types/sponsor';

const sponsorSchema = new mongoose.Schema<Sponsor>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['individual', 'company'] },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  documents: {
    dni: String,
    companyRegistration: String,
    taxId: { type: String, required: true }
  },
  sponsorshipHistory: [{
    shelterId: { type: String, required: true },
    shelterName: { type: String, required: true },
    amount: { type: Number, required: true },
    frequency: { type: String, required: true, enum: ['one-time', 'monthly', 'quarterly', 'yearly'] },
    startDate: { type: String, required: true },
    endDate: String,
    status: { type: String, required: true, enum: ['active', 'completed', 'cancelled'] }
  }],
  preferences: {
    shelters: [String],
    maxAmount: { type: Number, required: true },
    frequency: { type: String, required: true, enum: ['one-time', 'monthly', 'quarterly', 'yearly'] }
  },
  status: { type: String, required: true, enum: ['active', 'inactive'] },
  createdAt: { type: String, default: () => new Date().toISOString() },
  updatedAt: { type: String, default: () => new Date().toISOString() }
});

export default mongoose.models.Sponsor || mongoose.model<Sponsor>('Sponsor', sponsorSchema); 