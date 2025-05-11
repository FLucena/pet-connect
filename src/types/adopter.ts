export interface Adopter {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  documents: {
    dni: string;
    proofOfAddress: string;
    incomeProof?: string;
  };
  adoptionHistory: Array<{
    petId: string;
    petName: string;
    adoptionDate: string;
    status: 'active' | 'returned' | 'pending';
    returnReason?: string;
  }>;
  preferences: {
    petType: string[];
    size: string[];
    age: string[];
    specialNeeds: boolean;
  };
  status: 'active' | 'inactive' | 'blacklisted';
  createdAt: string;
  updatedAt: string;
} 