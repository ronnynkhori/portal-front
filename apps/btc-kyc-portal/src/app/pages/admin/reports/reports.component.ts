import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../../services/analytics.service';
import { format, subDays } from 'date-fns';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  topNationalities: { name: string, count: number }[] = [];
  isLoading = false;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.fetchTopNationalities();
  }

  fetchTopNationalities(): void {
    this.isLoading = true;
    const toDate = format(new Date(), 'yyyy-MM-dd');
    const fromDate = format(subDays(new Date(), 30), 'yyyy-MM-dd');
    this.analyticsService.getTopNationalities(fromDate, toDate).subscribe({
      next: (data) => {
        this.topNationalities = Object.entries(data).map(([name, count]) => ({ name, count: Number(count) }));
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
} 