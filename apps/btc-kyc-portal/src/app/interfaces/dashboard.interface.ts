export interface DashboardMetrics {
  totalSubscribers: number;
  activeSubscribers: number;
  pendingVerifications: number;
  rejectedVerifications: number;
  totalMsisdns: number;
  activeMsisdns: number;
  suspendedMsisdns: number;
  failedBillings: number;
  successfulBillings: number;
  topNationalities: Array<{
    name: string;
    count: number;
  }>;
} 