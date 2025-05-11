import mongoose from 'mongoose';
import { Post } from '../types/post';

const postSchema = new mongoose.Schema<Post>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, required: true, enum: ['adoption', 'sponsorship', 'event', 'news'] },
  author: {
    id: { type: String, required: true },
    type: { type: String, required: true, enum: ['shelter', 'admin'] },
    name: { type: String, required: true }
  },
  relatedEntities: {
    petId: String,
    shelterId: String,
    eventId: String
  },
  media: {
    images: [String],
    videos: [String]
  },
  status: { type: String, required: true, enum: ['draft', 'published', 'archived'] },
  tags: [String],
  location: {
    city: String,
    province: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  eventDetails: {
    startDate: String,
    endDate: String,
    venue: String,
    capacity: Number,
    registrationRequired: Boolean,
    registrationDeadline: String
  },
  engagement: {
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  },
  createdAt: { type: String, default: () => new Date().toISOString() },
  updatedAt: { type: String, default: () => new Date().toISOString() },
  publishedAt: String
});

export default mongoose.models.Post || mongoose.model<Post>('Post', postSchema); 