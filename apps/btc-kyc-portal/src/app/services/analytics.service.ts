import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {


  getGroupedNaturalSubscribers(interval: string): Observable<any> {
    const toDate = new Date();
    let fromDate = new Date();
    if (interval === 'MONTHLY') {
      fromDate.setMonth(toDate.getMonth() - 6);
    } else if (interval === 'WEEKLY') {
      fromDate.setDate(toDate.getDate() - 7 * 7); // last 7 weeks
    } else {
      fromDate.setDate(toDate.getDate() - 7); // last 7 days
    }
    const from = fromDate.toISOString().slice(0, 10);
    const to = toDate.toISOString().slice(0, 10);
    return this.http.get(`${this.baseUrl}/natural-subscribers/grouped?fromDate=${from}&toDate=${to}&interval=${interval}`);
  }

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Dashboard Summary
  getDashboardSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/dashboard-summary`);
  }

  // Subscriber Overview
  getNaturalSubscriberSummary(fromDate: string, toDate: string, state?: string): Observable<any> {
    let url = `${this.baseUrl}/analytics/natural-subscribers/summary?fromDate=${fromDate}&toDate=${toDate}`;
    if (state) {
      url += `&state=${state}`;
    }
    return this.http.get(url);
  }

  getTopNationalities(fromDate: string, toDate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/natural-subscribers/top-nationalities?fromDate=${fromDate}&toDate=${toDate}`);
  }

  getAgeDistribution(fromDate: string, toDate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/natural-subscribers/age-distribution?fromDate=${fromDate}&toDate=${toDate}`);
  }

  // Subscriber Trends
  getGroupedSubscriberCounts(fromDate: string, toDate: string, interval: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/natural-subscribers/grouped?fromDate=${fromDate}&toDate=${toDate}&interval=${interval}`);
  }

  getNewSubscribers(fromDate: string, toDate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/new-subscribers`, {
      params: { fromDate, toDate }
    });
  }

  // MSISDN Analytics
  getMsisdnRegistrationStats(fromDate: string, toDate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/msisdn-registrations?fromDate=${fromDate}&toDate=${toDate}`);
  }

  getMsisdnLifecycleSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/msisdns/lifecycle-summary`);
  }

  getMsisdnStateTrends(fromDate: string, toDate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/msisdns/state-trends?fromDate=${fromDate}&toDate=${toDate}`);
  }

  // Billing Analytics
  getBillingFailures(page: number = 0, size: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/failed?page=${page}&size=${size}`);
  }

  getBillingFailuresByDateRange(start: string, end: string, page: number = 0, size: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/failed/range?start=${start}&end=${end}&page=${page}&size=${size}`);
  }

  getBillingFailureSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/failed/summary`);
  }

  getBillingSuccessSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/billing_success_summary`);
  }

  getMonthlySummary(month: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/monthly-summary?month=${month}`);
  }
} 