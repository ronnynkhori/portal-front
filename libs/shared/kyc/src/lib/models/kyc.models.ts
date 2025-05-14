export interface Subscriber {
  firstName: string;
  lastName: string;
  company?: string;
  msisdn: string;
  alternativePhone?: string;
  plotNumber: string;
  street?: string;
  cityTownVillage: string;
  city: string;
  billAddress4?: string;
  zipCode?: string;
  nextOfKin?: string;
  nextOfKinPhone?: string;
  emailAddress?: string;
  gender: 'MALE' | 'FEMALE';
  dateOfBirth: string; // Format: 'YYYY-MM-DD'
  nationality: string;
  residencePermitNo?: string;
  residencePermitDateOfExpiry?: string;
  residencePermitDateOfIssue?: string;
  workPermitNo?: string;
  workPermitDateOfExpiry?: string;
  workPermitDateOfIssue?: string;
  idType: 'PASSPORT' | 'NATIONAL_ID';
  idNumber: string;
  idIssueDate: string;
  idExpiryDate: string;
}

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
