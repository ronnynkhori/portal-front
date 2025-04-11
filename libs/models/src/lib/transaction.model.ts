export interface Transaction {
  id: string;
  type: TransactionType;
  customerId: string;
  agentId?: string;
  phoneNumber?: string;
  kycId?: string;
  status: TransactionStatus;
  createdAt: Date;
  completedAt?: Date;
  details?: any;
}

export enum TransactionType {
  SIM_REGISTRATION = 'SIM_REGISTRATION',
  KYC_VERIFICATION = 'KYC_VERIFICATION',
  NUMBER_TRANSFER = 'NUMBER_TRANSFER',
  ADDING_NEW_NUMBER = 'ADDING_NEW_NUMBER'
}

export enum TransactionStatus {
  INITIATED = 'INITIATED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
} 