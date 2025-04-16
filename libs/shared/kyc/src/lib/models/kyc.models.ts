export interface Step {
  id: number;
  label: string;
  description: string;
  status: 'complete' | 'active' | 'pending';
}

export interface KycStatus {
  isValid: boolean;
  lastUpdated: Date;
  data?: any;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  phoneNumber: string;
  citizenshipStatus: string;
  termsAccepted: boolean;
}

export interface AddressInfo {
  addressType: string;
  street: string;
  city: string;
} 