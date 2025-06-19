import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../../services/analytics.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  monthlySummary: any = null;
  isMonthlySummaryLoading = false;
  currentMonth: string = format(new Date(), 'yyyy-MM');

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.fetchMonthlySummary();
  }

  fetchMonthlySummary(): void {
    this.isMonthlySummaryLoading = true;
    this.analyticsService.getMonthlySummary(this.currentMonth).subscribe({
      next: (data) => {
        this.monthlySummary = data;
        this.isMonthlySummaryLoading = false;
      },
      error: (error) => {
        this.isMonthlySummaryLoading = false;
        console.error('Error fetching monthly summary:', error);
      }
    });
  }
} 