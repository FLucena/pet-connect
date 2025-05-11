import mongoose from 'mongoose';
import { Adopter } from '../types/adopter';

const adopterSchema = new mongoose.Schema<Adopter>({
  id: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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
    dni: { type: String, required: true },
    proofOfAddress: { type: String, required: true },
    incomeProof: String
  },
  adoptionHistory: [{
    petId: { type: String, required: true },
    petName: { type: String, required: true },
    adoptionDate: { type: String, required: true },
    status: { type: String, required: true, enum: ['active', 'returned', 'pending'] },
    returnReason: String
  }],
  preferences: {
    petType: [String],
    size: [String],
    age: [String],
    specialNeeds: { type: Boolean, default: false }
  },
  status: { type: String, required: true, enum: ['active', 'inactive', 'blacklisted'] },
  createdAt: { type: String, default: () => new Date().toISOString() },
  updatedAt: { type: String, default: () => new Date().toISOString() }
});

export default mongoose.models.Adopter || mongoose.model<Adopter>('Adopter', adopterSchema); 