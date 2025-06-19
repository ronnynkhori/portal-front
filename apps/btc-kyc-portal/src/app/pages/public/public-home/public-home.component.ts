import {Component, OnInit, AfterViewInit, NgZone, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import * as feather from 'feather-icons';
import { SessionModalComponent } from '../session-modal/session-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {SharedService} from "../../../../../../../libs/shared/kyc/src/lib/services/shared.service";

export type ServiceType = 'kyc' | 'sim-registration' | 'number-transfer' | 'check-status';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule,SessionModalComponent],
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.css']
})
export class PublicHomeComponent implements OnInit, AfterViewInit {
  @ViewChild(SessionModalComponent) sessionModal!: SessionModalComponent;
  activeCard = 0;
  serviceType: ServiceType = 'kyc';
  serviceTitles: Record<ServiceType, string> = {
    'kyc': 'Complete KYC Verification',
    'sim-registration': 'SIM Card Registration',
    'number-transfer': 'Number Transfer',
    'check-status': 'Check Service Status'
  };

  serviceRoutes: Record<ServiceType, string> = {
    'kyc': '/public/complete-kyc',
    'sim-registration': '/public/sim-registration',
    'number-transfer': '/public/number-transfer',
    'check-status': '/public/kyc-status'
  };
  constructor(
    private dialog: MatDialog, private ngZone: NgZone, private router: Router,
  ) {
    // Auto-rotate cards every 5 seconds
    setInterval(() => {
      this.activeCard = (this.activeCard + 1) % 3;
    }, 5000);
  }

  ngOnInit(): void {
    // Initial attempt to replace icons
    setTimeout(() => {
      this.initializeIcons();
    }, 0);
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => setTimeout(() => this.initializeIcons(), 100));
  }

  initializeIcons(): void {
    try {
      feather.replace();
    } catch (error) {
      console.error('Error initializing feather icons:', error);
    }
  }

  openModal(serviceType: ServiceType = 'kyc'): void {
    this.sessionModal.serviceType = serviceType;
    this.onSuccess();
  }

  onSuccess(): void {
    const route = this.serviceRoutes[this.serviceType];
    if (route) {

      this.router.navigate([route]);
    } else {

    }
  }

}
