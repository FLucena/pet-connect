export interface Sponsor {
  id: string;
  name: string;
  type: 'individual' | 'company';
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
    dni?: string;
    companyRegistration?: string;
    taxId: string;
  };
  sponsorshipHistory: Array<{
    shelterId: string;
    shelterName: string;
    amount: number;
    frequency: 'one-time' | 'monthly' | 'quarterly' | 'yearly';
    startDate: string;
    endDate?: string;
    status: 'active' | 'completed' | 'cancelled';
  }>;
  preferences: {
    shelters: string[];
    maxAmount: number;
    frequency: 'one-time' | 'monthly' | 'quarterly' | 'yearly';
  };
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
} 