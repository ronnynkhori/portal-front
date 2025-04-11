import { KycStatus } from './user.model';

export interface KycApplication {
  id: string;
  userId: string;
  nationalIdNumber: string;
  nationalIdImageUrl: string;
  proofOfAddressImageUrl: string;
  selfieImageUrl: string;
  status: KycStatus;
  comments?: string;
  submittedAt: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
}

export interface KycVerificationResult {
  isVerified: boolean;
  message: string;
  verifiedAt: Date;
  verifiedBy: string;
} 