export interface Post {
  id: string;
  title: string;
  content: string;
  type: 'adoption' | 'sponsorship' | 'event' | 'news';
  author: {
    id: string;
    type: 'shelter' | 'admin';
    name: string;
  };
  relatedEntities?: {
    petId?: string;
    shelterId?: string;
    eventId?: string;
  };
  media: {
    images: string[];
    videos?: string[];
  };
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  location?: {
    city: string;
    province: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  eventDetails?: {
    startDate: string;
    endDate: string;
    venue: string;
    capacity?: number;
    registrationRequired: boolean;
    registrationDeadline?: string;
  };
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
} 