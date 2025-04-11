export interface Agent {
  id: string;
  userId: string;
  agentCode: string;
  commissionRate: number;
  status: AgentStatus;
  registeredCustomers: number;
  completedKycs: number;
  processedTransfers: number;
  earnings: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum AgentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
} 