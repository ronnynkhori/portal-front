import { Component, OnDestroy, OnInit, AfterViewInit, NgZone, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';
import { ServiceType } from '../public-home/public-home.component';

interface DialogData {
  serviceType: ServiceType;
}

@Component({
  selector: 'app-session-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './session-modal.component.html',
  styleUrls: ['./session-modal.component.css']
})
export class SessionModalComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly modalId = 'session-modal';
  currentStep = 1;
  isLoading = false;
  otpError: string | null = null;
  resendTimer = 0;
  verificationForm: FormGroup;
  otpForm: FormGroup;
  private resendTimerInterval: any;

  // Service type related properties
  serviceType: ServiceType;
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

  get serviceTitle(): string {
    return this.serviceTitles[this.serviceType] || 'Start Session';
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SessionModalComponent>,
    private ngZone: NgZone,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.serviceType = this.data?.serviceType || 'kyc';
    
    this.verificationForm = this.fb.group({
      documentNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

    this.otpForm = this.fb.group({
      digit0: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit3: ['', [Validators.required, Validators.pattern('^[0-9]$')]]
    });
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

  ngOnDestroy(): void {
    if (this.resendTimerInterval) {
      clearInterval(this.resendTimerInterval);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitVerificationForm(): void {
    if (this.verificationForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.currentStep = 2;
        this.startResendTimer();
      }, 1500);
    }
  }

  submitOtpForm(): void {
    if (this.otpForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.currentStep = 3;
      }, 1500);
    }
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 1 && /^\d$/.test(value)) {
      if (index < 3) {
        const nextInput = document.getElementById(`digit${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      const input = event.target as HTMLInputElement;
      if (!input.value && index > 0) {
        const prevInput = document.getElementById(`digit${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  }

  onKeyPress(event: KeyboardEvent): boolean {
    // Allow only number inputs (0-9)
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  isOtpComplete(): boolean {
    return this.otpForm.valid;
  }

  resendOtp(): void {
    if (this.resendTimer === 0) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.startResendTimer();
      }, 1500);
    }
  }

  private startResendTimer(): void {
    this.resendTimer = 30;
    this.resendTimerInterval = setInterval(() => {
      if (this.resendTimer > 0) {
        this.resendTimer--;
      } else {
        clearInterval(this.resendTimerInterval);
      }
    }, 1000);
  }

  onSuccess(): void {
    const route = this.serviceRoutes[this.serviceType];
    if (route) {
      this.closeDialog();
      this.router.navigate([route]);
    } else {
      this.closeDialog();
    }
  }
} 