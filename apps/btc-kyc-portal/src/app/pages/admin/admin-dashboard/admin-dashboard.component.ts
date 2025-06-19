import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { AnalyticsService } from '../../../services/analytics.service';
import { format, subMonths } from 'date-fns';
import * as feather from 'feather-icons';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

interface DashboardMetrics {
  billingFailuresTodayCount: number;
  subscribersVerifiedToday: number;
  billingSuccessesTodayCount: number;
  subscriberVerificationsFailedToday: number;
  totalNaturalSubscribers: number;
  newSubscribersToday: number;
  mobileNumbersRegisteredToday: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  // Dashboard summary metrics
  dashboardMetrics: DashboardMetrics = {
    billingFailuresTodayCount: 0,
    subscribersVerifiedToday: 0,
    billingSuccessesTodayCount: 0,
    subscriberVerificationsFailedToday: 0,
    totalNaturalSubscribers: 0,
    newSubscribersToday: 0,
    mobileNumbersRegisteredToday: 0
  };
  
  // Chart options
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  };
  
  // Charts configurations
  subscriberTrendsChart: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        label: 'New Subscribers',
        data: [],
        borderColor: '#3B82F6',
        tension: 0.1
      }
    ]
  };
  
  msisdnStateChart: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#3B82F6', // blue for PREACTIVE
          '#10B981', // green for ACTIVE
        ]
      }
    ]
  };
  
  billingChart: ChartConfiguration['data'] = {
    labels: ['Success', 'Failures'],
    datasets: [
      {
        label: 'Billing Operations',
        data: [],
        backgroundColor: ['#10B981', '#EF4444']
      }
    ]
  };

  // Interval dropdown for subscriber trends
  intervalOptions = [
    { label: 'Day', value: 'DAILY' },
    { label: 'Week', value: 'WEEKLY' },
    { label: 'Month', value: 'MONTHLY' }
  ];
  selectedInterval = 'DAILY';

  isTrendsLoading = false;
  isDashboardLoading = false;
  isMsisdnLoading = false;
  isBillingLoading = false;

  constructor(
    private analyticsService: AnalyticsService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadDashboardSummary();
    this.loadSubscriberTrends();
    this.loadMsisdnAnalytics();
    this.loadBillingAnalytics();
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        feather.replace();
      }, 100);
    });
  }

  onIntervalChange(): void {
    this.loadSubscriberTrends();
  }

  private loadDashboardSummary(): void {
    this.isDashboardLoading = true;
    this.analyticsService.getDashboardSummary().subscribe({
      next: (data) => {
        this.dashboardMetrics = data;
        this.isDashboardLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard summary:', error);
        this.isDashboardLoading = false;
      }
    });
  }

  private loadSubscriberTrends(): void {
    this.isTrendsLoading = true;
    this.analyticsService.getGroupedNaturalSubscribers(this.selectedInterval).subscribe({
      next: (data:any) => {
        const labels = Object.keys(data);
        const values = Object.values(data).map(Number);
        const N = this.selectedInterval === 'MONTHLY' ? 6 : 7;
        this.subscriberTrendsChart.labels = labels.slice(-N);
        this.subscriberTrendsChart.datasets[0].data = values.slice(-N);
        this.isTrendsLoading = false;
      },
      error: (error:any) => {
        console.error('Error loading subscriber trends:', error);
        this.isTrendsLoading = false;
      }
    });
  }

  private loadMsisdnAnalytics(): void {
    this.analyticsService.getMsisdnLifecycleSummary().subscribe({
      next: (data) => {
        this.msisdnStateChart.labels = Object.keys(data);
        this.msisdnStateChart.datasets[0].data = Object.values(data);
      },
      error: (error:any) => {
        console.error('Error loading MSISDN analytics:', error);
      }
    });
  }

  private loadBillingAnalytics(): void {
    // Load success summary
    this.analyticsService.getBillingSuccessSummary().subscribe({
      next: (successData) => {
        const values = Object.values(successData) as number[];
        const successCount = values.reduce((a, b) => a + b, 0);
        
        // Load failure summary
        this.analyticsService.getBillingFailureSummary().subscribe({
          next: (failureData) => {
            const failureCount = failureData.reduce((sum: number, item: { count: number }) => sum + item.count, 0);
            this.billingChart.datasets[0].data = [successCount, failureCount];
          },
          error: (error:any) => {
            console.error('Error loading billing failures:', error);
          }
        });
      },
      error: (error:any) => {
        console.error('Error loading billing successes:', error);
      }
    });
  }
} 