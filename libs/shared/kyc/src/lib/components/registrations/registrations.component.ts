import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FooterComponent } from '@btc/shared/layout';

interface Registration {
  simNumber: string;
  customerName: string;
  customerId: string;
  phoneNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  registrationDate: Date;
  lastUpdated: Date;
}

interface DailyProgress {
  date: Date;
  total: number;
  successful: number;
  failed: number;
  pending: number;
  successRate: number;
}

interface RegistrationStats {
  total: number;
  successful: number;
  failed: number;
  pending: number;
  successRate: number;
  dailyProgress: DailyProgress[];
}

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FooterComponent
  ],
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Registration>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'simNumber',
    'customerName',
    'customerId',
    'phoneNumber',
    'status',
    'registrationDate',
    'lastUpdated',
    'actions'
  ];

  registrationStats: RegistrationStats = {
    total: 0,
    successful: 0,
    failed: 0,
    pending: 0,
    successRate: 0,
    dailyProgress: []
  };

  dataSource: Registration[] = [
    {
      simNumber: '26771234567',
      customerName: 'John Doe',
      customerId: '123456789',
      phoneNumber: '26771234567',
      status: 'pending',
      registrationDate: new Date('2024-01-15'),
      lastUpdated: new Date('2024-01-15')
    },
    {
      simNumber: '26771234568',
      customerName: 'Jane Smith',
      customerId: '987654321',
      phoneNumber: '26771234568',
      status: 'approved',
      registrationDate: new Date('2024-01-14'),
      lastUpdated: new Date('2024-01-14')
    },
    {
      simNumber: '26771234569',
      customerName: 'Robert Johnson',
      customerId: '456789123',
      phoneNumber: '26771234569',
      status: 'rejected',
      registrationDate: new Date('2024-01-13'),
      lastUpdated: new Date('2024-01-13')
    },
    {
      simNumber: '26771234570',
      customerName: 'Sarah Williams',
      customerId: '789123456',
      phoneNumber: '26771234570',
      status: 'pending',
      registrationDate: new Date('2024-01-12'),
      lastUpdated: new Date('2024-01-12')
    },
    {
      simNumber: '26771234571',
      customerName: 'Michael Brown',
      customerId: '321654987',
      phoneNumber: '26771234571',
      status: 'approved',
      registrationDate: new Date('2024-01-11'),
      lastUpdated: new Date('2024-01-11')
    },
    {
      simNumber: '26771234572',
      customerName: 'Emily Davis',
      customerId: '654987321',
      phoneNumber: '26771234572',
      status: 'pending',
      registrationDate: new Date('2024-01-10'),
      lastUpdated: new Date('2024-01-10')
    },
    {
      simNumber: '26771234573',
      customerName: 'David Wilson',
      customerId: '987321654',
      phoneNumber: '26771234573',
      status: 'approved',
      registrationDate: new Date('2024-01-09'),
      lastUpdated: new Date('2024-01-09')
    },
    {
      simNumber: '26771234574',
      customerName: 'Lisa Anderson',
      customerId: '321987654',
      phoneNumber: '26771234574',
      status: 'rejected',
      registrationDate: new Date('2024-01-08'),
      lastUpdated: new Date('2024-01-08')
    },
    {
      simNumber: '26771234575',
      customerName: 'James Taylor',
      customerId: '654321987',
      phoneNumber: '26771234575',
      status: 'pending',
      registrationDate: new Date('2024-01-07'),
      lastUpdated: new Date('2024-01-07')
    },
    {
      simNumber: '26771234576',
      customerName: 'Patricia Moore',
      customerId: '987654321',
      phoneNumber: '26771234576',
      status: 'approved',
      registrationDate: new Date('2024-01-06'),
      lastUpdated: new Date('2024-01-06')
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.calculateStats();
  }

  private calculateStats(): void {
    // Calculate total stats
    this.registrationStats.total = this.dataSource.length;
    this.registrationStats.successful = this.dataSource.filter(r => r.status === 'approved').length;
    this.registrationStats.failed = this.dataSource.filter(r => r.status === 'rejected').length;
    this.registrationStats.pending = this.dataSource.filter(r => r.status === 'pending').length;
    this.registrationStats.successRate = (this.registrationStats.successful / this.registrationStats.total) * 100;

    // Calculate daily progress
    const dailyMap = new Map<string, DailyProgress>();
    
    this.dataSource.forEach(registration => {
      const dateKey = registration.registrationDate.toISOString().split('T')[0];
      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, {
          date: registration.registrationDate,
          total: 0,
          successful: 0,
          failed: 0,
          pending: 0,
          successRate: 0
        });
      }
      
      const daily = dailyMap.get(dateKey)!;
      daily.total++;
      
      switch (registration.status) {
        case 'approved':
          daily.successful++;
          break;
        case 'rejected':
          daily.failed++;
          break;
        case 'pending':
          daily.pending++;
          break;
      }
      
      daily.successRate = (daily.successful / daily.total) * 100;
    });

    // Convert map to array and sort by date
    this.registrationStats.dailyProgress = Array.from(dailyMap.values())
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  }

  startSimRegistration(): void {
    this.router.navigate(['/sim-registration']);
  }

  viewDetails(registration: Registration): void {
    console.log('View details for:', registration);
    // TODO: Implement view details functionality
  }

  editRegistration(registration: Registration): void {
    console.log('Edit registration:', registration);
    // TODO: Implement edit functionality
  }

  deleteRegistration(registration: Registration): void {
    console.log('Delete registration:', registration);
    // TODO: Implement delete functionality
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // Implement your filtering logic here
    // For example:
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByStatus(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    // Implement your status filtering logic here
    // For example:
    // this.dataSource.filter = status;
  }

  goBack(): void {
    // TODO: Implement navigation back to dashboard
    console.log('Navigating back to dashboard');
  }
} 