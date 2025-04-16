import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@btc/shared/environment';
import { Subscriber } from '../components/sim-registration/sim-registration.component';

@Injectable({
  providedIn: 'root'
})
export class SimRegistrationService {
  private apiUrl = `${environment.apiUrl}/sim-registration`;

  constructor(private http: HttpClient) {}

  registerSubscriber(data: Subscriber): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  validateMsisdn(msisdn: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/validate-msisdn/${msisdn}`);
  }

  validateIdNumber(idNumber: string, idType: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate-id`, { idNumber, idType });
  }
} 