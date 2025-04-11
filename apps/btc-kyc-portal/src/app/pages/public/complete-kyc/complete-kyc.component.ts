import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

interface Step {
  id: number;
  label: string;
  description: string;
  status: 'complete' | 'active' | 'pending';
}

@Component({
  selector: 'app-complete-kyc',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './complete-kyc.component.html',
  styleUrls: ['./complete-kyc.component.css']
})
export class CompleteKycComponent implements OnDestroy {
  personalInfoForm!: FormGroup;
  addressForm!: FormGroup;
  isLoading = false;
  otpValue = '';
  otpResendTimer = 0;
  otpTimerSubscription: Subscription = new Subscription();
  verificationId: string | null = null;
  isProcessComplete = false;
  isMetaMapComplete = false;

  steps: Step[] = [
    {
      id: 1,
      label: 'Personal Information',
      description: 'Basic details and contact information',
      status: 'active'
    },
    {
      id: 2,
      label: 'Identity Verification',
      description: 'Verify your identity with MetaMap',
      status: 'pending'
    },
    {
      id: 3,
      label: 'Address Details',
      description: 'Current residential address',
      status: 'pending'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      citizenshipStatus: ['citizen', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });

    this.addressForm = this.fb.group({
      addressType: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onPersonalInfoSubmit(): void {
    if (this.personalInfoForm.valid) {
      console.log('Personal Info:', this.personalInfoForm.value);
      this.steps[0].status = 'complete';
      this.steps[1].status = 'active';
      // Don't manually navigate, let the matStepperNext handle it
    }
  }

  onMetaMapComplete(): void {
    this.isMetaMapComplete = true;
    this.steps[1].status = 'complete';
    this.steps[2].status = 'active';
  }

  onAddressSubmit(): void {
    if (this.addressForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Address:', this.addressForm.value);
        this.isLoading = false;
        this.onSubmit();
      }, 1500);
    }
  }

  onSubmit(): void {
    if (this.personalInfoForm.valid && this.addressForm.valid && this.isMetaMapComplete) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Submitting KYC:', {
          ...this.personalInfoForm.value,
          ...this.addressForm.value,
          isIdentityVerified: this.isMetaMapComplete
        });
        this.isLoading = false;
        this.steps[2].status = 'complete';
        this.isProcessComplete = true;
      }, 2000);
    }
  }

  startOtpResendTimer(duration = 60): void {
    this.otpResendTimer = duration;
    this.otpTimerSubscription = timer(0, 1000).subscribe(() => {
      if (this.otpResendTimer > 0) {
        this.otpResendTimer--;
      } else {
        this.otpTimerSubscription.unsubscribe();
      }
    });
  }

  resendOtp(): void {
    // Implement OTP resend logic
    this.startOtpResendTimer();
  }

  verifyOtp(): void {
    if (this.otpValue.length === 4) {
      // Implement OTP verification logic
      console.log('Verifying OTP:', this.otpValue);
    }
  }

  ngOnDestroy(): void {
    if (this.otpTimerSubscription) {
      this.otpTimerSubscription.unsubscribe();
    }
  }
} 