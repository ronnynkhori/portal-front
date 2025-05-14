import { Component, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import * as feather from 'feather-icons';
// eslint-disable-next-line
import { AuthService } from 'libs/data-access/auth/src/lib/auth.service';
import { FooterComponent } from '../../../layout/footer/footer.component';

interface RecentActivity {
  title: string;
  description: string;
  time: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  status?: string;
  statusColor?: string;
  statusTextColor?: string;
}

interface Stats {
  totalRegistrations: number;
  totalRegistrationsProgress: number;
  pendingApprovals: number;
  pendingApprovalsProgress: number;
  pendingApprovalsChange: string;
  successRate: number;
  successRateChange: string;
}

interface Notification {
  message: string;
  time: string;
  read: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
}

@Component({
  selector: 'app-agent-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.css']
})
export class AgentHomeComponent implements OnInit, AfterViewInit {
  // Agent info properties
  agentName = 'Sarah Johnson';
  agentId = 'AG-2023-458';
  agentInitials = 'SJ';
  currentTime = new Date();

  // Statistics
  stats: Stats = {
    totalRegistrations: 145,
    totalRegistrationsProgress: 85,
    pendingApprovals: 12,
    pendingApprovalsProgress: 40,
    pendingApprovalsChange: '+3 today',
    successRate: 92,
    successRateChange: '+2.5%'
  };

  // Recent Activities
  recentActivities: RecentActivity[] = [
    {
      title: 'New SIM Registration',
      description: 'Completed registration for John Doe',
      time: '2 hours ago',
      icon: 'M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      status: 'Completed',
      statusColor: 'bg-green-500',
      statusTextColor: 'text-green-700'
    },
    {
      title: 'KYC Verification',
      description: 'Pending approval for Jane Smith',
      time: '4 hours ago',
      icon: 'M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      status: 'Pending',
      statusColor: 'bg-yellow-500',
      statusTextColor: 'text-yellow-700'
    }
  ];

  // Notifications
  notifications: Notification[] = [
    {
      message: 'New KYC guidelines available',
      time: '1 hour ago',
      read: false,
      icon: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      message: 'System maintenance scheduled',
      time: '2 hours ago',
      read: true,
      icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];
  
  constructor(
    private ngZone: NgZone,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get current user data - in a real app this would fetch from AuthService
    this.getCurrentUser();
    
    // Initial attempt to replace icons
    setTimeout(() => {
      this.initializeIcons();
    }, 0);

    // Update time every minute
    setInterval(() => {
      this.currentTime = new Date();
    }, 60000);
  }

  ngAfterViewInit(): void {
    // Ensure icons are replaced after view is fully rendered
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.initializeIcons();
      }, 100);
    });
  }

  initializeIcons(): void {
    try {
      feather.replace();
    } catch (error) {
      console.error('Error initializing feather icons:', error);
    }
  }
  
  getCurrentUser(): void {
    // In a real implementation, this would get the current user from the AuthService
    // For now, we're using mock data
    try {
      // This would be replaced with actual auth service call
      // this.authService.getCurrentUser().subscribe(user => {
      //   this.agentName = user.name;
      //   this.agentId = user.id;
      //   this.agentInitials = this.getInitials(user.name);
      // });
      
      // Mock data for demonstration
      this.agentName = 'Sarah Johnson';
      this.agentId = 'AG-2023-458';
      this.agentInitials = this.getInitials(this.agentName);
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  }
  
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  startKycProcess(): void {
    this.router.navigate(['/agent/kyc']);
  }

  startSimRegistration(): void {
    this.router.navigate(['/agent/sim-registration']);
  }

  startSimTransfer(): void {
    this.router.navigate(['/agent/sim-transfer']);
  }

  viewRegistrations(): void {
    this.router.navigate(['/agent/registrations']);
  }

  generateReport(): void {
    this.router.navigate(['/agent/reports']);
  }
} 