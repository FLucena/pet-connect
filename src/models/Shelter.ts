import mongoose from 'mongoose';
import { Shelter } from '../types/shelter';

const shelterSchema = new mongoose.Schema<Shelter>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  contact: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String
    }
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  capacity: {
    total: { type: Number, required: true },
    current: { type: Number, required: true },
    available: { type: Number, required: true }
  },
  facilities: {
    indoor: Boolean,
    outdoor: Boolean,
    medical: Boolean,
    training: Boolean,
    description: String
  },
  services: [String],
  staff: {
    total: Number,
    volunteers: Number,
    roles: [String]
  },
  animals: {
    total: Number,
    byType: {
      perros: Number,
      gatos: Number
    }
  },
  photos: [String],
  status: { type: String, required: true, enum: ['active', 'inactive'] },
  registrationDate: { type: String, required: true },
  lastUpdate: { type: String, required: true }
});

export default mongoose.models.Shelter || mongoose.model<Shelter>('Shelter', shelterSchema); 