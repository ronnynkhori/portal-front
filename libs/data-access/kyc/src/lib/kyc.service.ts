import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { KycApplication, KycVerificationResult } from 'libs/models/src/lib/kyc.model';
import { KycStatus } from 'libs/models/src/lib/user.model';

@Injectable({
  providedIn: 'root'
})
export class KycService {
  private mockKycApplications: KycApplication[] = [
    {
      id: '1',
      userId: '101',
      nationalIdNumber: 'ID123456',
      nationalIdImageUrl: 'assets/mock/id-front.jpg',
      proofOfAddressImageUrl: 'assets/mock/proof-address.jpg',
      selfieImageUrl: 'assets/mock/selfie.jpg',
      status: KycStatus.VERIFIED,
      submittedAt: new Date('2023-01-15'),
      verifiedAt: new Date('2023-01-20'),
      verifiedBy: 'admin1'
    },
    {
      id: '2',
      userId: '102',
      nationalIdNumber: 'ID789012',
      nationalIdImageUrl: 'assets/mock/id-front-2.jpg',
      proofOfAddressImageUrl: 'assets/mock/proof-address-2.jpg',
      selfieImageUrl: 'assets/mock/selfie-2.jpg',
      status: KycStatus.PENDING,
      submittedAt: new Date('2023-02-10')
    },
    {
      id: '3',
      userId: '103',
      nationalIdNumber: 'ID345678',
      nationalIdImageUrl: 'assets/mock/id-front-3.jpg',
      proofOfAddressImageUrl: 'assets/mock/proof-address-3.jpg',
      selfieImageUrl: 'assets/mock/selfie-3.jpg',
      status: KycStatus.REJECTED,
      comments: 'ID document is not clear. Please resubmit.',
      submittedAt: new Date('2023-02-20'),
      verifiedAt: new Date('2023-02-25'),
      verifiedBy: 'admin2'
    }
  ];

  constructor() { }

  // Submit a new KYC application
  submitKycApplication(application: Partial<KycApplication>): Observable<KycApplication> {
    // This is a mock implementation. In a real app, this would make an HTTP request
    const newApplication: KycApplication = {
      id: Math.random().toString(36).substring(2, 9),
      userId: application.userId || '',
      nationalIdNumber: application.nationalIdNumber || '',
      nationalIdImageUrl: application.nationalIdImageUrl || '',
      proofOfAddressImageUrl: application.proofOfAddressImageUrl || '',
      selfieImageUrl: application.selfieImageUrl || '',
      status: KycStatus.PENDING,
      submittedAt: new Date(),
      ...application
    };

    this.mockKycApplications.push(newApplication);
    
    return of(newApplication).pipe(delay(1000));
  }

  // Get KYC status for a user
  getKycStatus(userId: string): Observable<KycStatus> {
    const application = this.mockKycApplications.find(app => app.userId === userId);
    
    if (!application) {
      return of(KycStatus.NOT_STARTED).pipe(delay(500));
    }
    
    return of(application.status).pipe(delay(500));
  }

  // Get KYC application details
  getKycApplication(applicationId: string): Observable<KycApplication> {
    const application = this.mockKycApplications.find(app => app.id === applicationId);
    
    if (!application) {
      return throwError(() => new Error('KYC application not found'));
    }
    
    return of(application).pipe(delay(500));
  }

  // Get all KYC applications for a user
  getUserKycApplications(userId: string): Observable<KycApplication[]> {
    const applications = this.mockKycApplications.filter(app => app.userId === userId);
    return of(applications).pipe(delay(500));
  }

  // For admin to approve or reject KYC
  verifyKycApplication(applicationId: string, result: KycVerificationResult): Observable<KycApplication> {
    const application = this.mockKycApplications.find(app => app.id === applicationId);
    
    if (!application) {
      return throwError(() => new Error('KYC application not found'));
    }
    
    application.status = result.isVerified ? KycStatus.VERIFIED : KycStatus.REJECTED;
    application.comments = result.message;
    application.verifiedAt = result.verifiedAt;
    application.verifiedBy = result.verifiedBy;
    
    return of(application).pipe(delay(1000));
  }

  // Get all pending KYC applications (for admin)
  getPendingKycApplications(): Observable<KycApplication[]> {
    const pendingApplications = this.mockKycApplications.filter(app => app.status === KycStatus.PENDING);
    return of(pendingApplications).pipe(delay(500));
  }
} 