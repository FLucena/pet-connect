import mongoose from 'mongoose';
import { Pet } from '../types/pet';

const petSchema = new mongoose.Schema<Pet>({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: {
    years: { type: Number, required: true },
    months: { type: Number, required: true }
  },
  sex: { type: String, required: true },
  size: { type: String, required: true },
  weight: { type: Number, required: true },
  color: { type: String, required: true },
  physicalCharacteristics: {
    coat: { type: String, required: true },
    ears: String,
    tail: String,
    pattern: String,
    specialMarks: [String]
  },
  health: {
    status: { type: String, required: true },
    vaccines: [String],
    lastVaccine: String,
    sterilized: { type: Boolean, required: true },
    sterilizationDate: String,
    microchip: { type: Boolean, required: true },
    microchipNumber: String,
    specialConditions: [String],
    allergies: [String],
    medications: [String]
  },
  behavior: {
    energy: { type: String, required: true },
    sociability: { type: String, required: true },
    training: { type: String, required: true },
    goodWithChildren: { type: Boolean, required: true },
    goodWithDogs: { type: Boolean, required: true },
    goodWithCats: { type: Boolean, required: true },
    character: [String],
    specialNeeds: [String]
  },
  history: {
    origin: { type: String, required: true },
    rescueDate: { type: String, required: true },
    rescueCircumstances: String,
    medicalHistory: String,
    specialNotes: String
  },
  care: {
    feeding: { type: String, required: true },
    exercise: { type: String, required: true },
    grooming: { type: String, required: true },
    specialNeeds: [String]
  },
  relationships: {
    currentShelter: { type: String, required: true },
    shelterEntryDate: { type: String, required: true },
    currentAdopter: String,
    adoptionDate: String,
    previousAdopters: [{
      id: String,
      adoptionDate: String,
      returnDate: String,
      reason: String
    }],
    currentFoster: String,
    previousFosters: [String]
  },
  photos: [String],
  status: { type: String, required: true },
  registrationDate: { type: String, required: true },
  lastUpdate: { type: String, required: true }
});

export default mongoose.models.Pet || mongoose.model<Pet>('Pet', petSchema); 