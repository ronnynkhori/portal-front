export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  email?: string;
  dateOfBirth: Date;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  isKycVerified: boolean;
  kycStatus: KycStatus;
}

export enum KycStatus {
  NOT_STARTED = 'NOT_STARTED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  AGENT = 'AGENT',
  ADMIN = 'ADMIN'
} 