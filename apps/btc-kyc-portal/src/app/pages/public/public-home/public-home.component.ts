import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as feather from 'feather-icons';
import { SessionModalComponent } from '../session-modal/session-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export type ServiceType = 'kyc' | 'sim-registration' | 'number-transfer' | 'check-status';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule],
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.css']
})
export class PublicHomeComponent implements OnInit, AfterViewInit {
  activeCard = 0;

  constructor(
    private ngZone: NgZone,
    private dialog: MatDialog
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

  openModal(serviceType: ServiceType = 'kyc'): void {
    this.dialog.open(SessionModalComponent, {
      width: '100%',
      maxWidth: '600px',
      panelClass: ['bg-transparent', 'rounded-lg'],
      disableClose: false,
      backdropClass: 'modal-backdrop',
      hasBackdrop: true,
      data: { serviceType }
    });
  }
} 