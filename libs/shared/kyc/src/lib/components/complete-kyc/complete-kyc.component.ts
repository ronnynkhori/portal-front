import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

interface Step {
  id: number;
  label: string;
  description: string;
  status: 'complete' | 'active' | 'pending';
}

interface KycStatus {
  isValid: boolean;
  lastUpdated: Date;
  data?: any;
}

type OtpMethod = 'sms' | 'email';

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
    MatNativeDateModule,
    MatRadioModule
  ],
  templateUrl: './complete-kyc.component.html',
  styleUrls: ['./complete-kyc.component.css']
})
export class CompleteKycComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

  // Form Groups
  initialVerificationForm!: FormGroup;
  addressForm!: FormGroup;

  // State Management
  isRequestingOtp = false;
  isOtpSent = false;
  isOtpVerified = false;
  isVerifyingOtp = false;
  isMetaMapComplete = false;
  isSubmitting = false;
  isCheckingKyc = true;
  otpResendTimer = 0;
  otpTimerSubscription: Subscription = new Subscription();
  kycStatus: KycStatus | null = null;
  showUpdateForm = false;
  selectedOtpMethod: OtpMethod = 'sms';

  steps: Step[] = [
    {
      id: 1,
      label: 'Initial Verification',
      description: 'Citizenship and contact verification',
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
      description: 'Physical and postal address',
      status: 'pending'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.checkKycStatus();
  }

  private checkKycStatus(): void {
    this.isCheckingKyc = true;
    // Simulate API call to check KYC status
    setTimeout(() => {
      this.kycStatus = {
        isValid: false,
        lastUpdated: new Date()
      };
      this.isCheckingKyc = false;
    }, 2000);
  }

  private initializeForms(): void {
    // Initialize Initial Verification Form
    this.initialVerificationForm = this.fb.group({
      citizenshipStatus: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // Assuming 8 digit phone numbers
      email: ['', [Validators.email]], // Email is optional if SMS is selected
      otpMethod: ['sms', Validators.required],
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]] // 4 digit OTP
    });

    // Initialize Address Form
    this.addressForm = this.fb.group({
      physicalAddress: ['', Validators.required],
      postalAddress: ['', Validators.required],
      additionalNumbers: this.fb.array([])
    });

    // Watch for OTP method changes
    this.initialVerificationForm.get('otpMethod')?.valueChanges.subscribe((method: OtpMethod) => {
      this.selectedOtpMethod = method;
      const emailControl = this.initialVerificationForm.get('email');
      const phoneControl = this.initialVerificationForm.get('phoneNumber');
      
      if (method === 'email') {
        emailControl?.setValidators([Validators.required, Validators.email]);
        phoneControl?.clearValidators();
        phoneControl?.setValidators([Validators.pattern('^[0-9]{8}$')]);
      } else {
        phoneControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{8}$')]);
        emailControl?.clearValidators();
        emailControl?.setValidators([Validators.email]);
      }
      
      emailControl?.updateValueAndValidity();
      phoneControl?.updateValueAndValidity();
    });
  }

  // Additional Numbers Management
  get additionalNumbers() {
    return this.addressForm.get('additionalNumbers') as FormArray;
  }

  addNumber() {
    this.additionalNumbers.push(
      this.fb.control('', [Validators.pattern('^[0-9]{8}$')])
    );
  }

  removeNumber(index: number) {
    this.additionalNumbers.removeAt(index);
  }

  // OTP Functions
  async requestOtp(): Promise<void> {
    try {
      this.isRequestingOtp = true;
      const method = this.initialVerificationForm.get('otpMethod')?.value;
      const destination = method === 'sms' 
        ? this.initialVerificationForm.get('phoneNumber')?.value
        : this.initialVerificationForm.get('email')?.value;

      // Implement OTP request logic here based on method
      // if (method === 'sms') {
      //   await this.otpService.requestSmsOtp(destination);
      // } else {
      //   await this.otpService.requestEmailOtp(destination);
      // }
      
      // Simulate OTP send
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.isOtpSent = true;
      this.startOtpResendTimer();
    } catch (error) {
      console.error('Error requesting OTP:', error);
    } finally {
      this.isRequestingOtp = false;
    }
  }

  startOtpResendTimer(duration = 60): void {
    if (this.otpTimerSubscription) {
      this.otpTimerSubscription.unsubscribe();
    }
    this.otpResendTimer = duration;
    this.otpTimerSubscription = timer(0, 1000).subscribe(() => {
      if (this.otpResendTimer > 0) {
        this.otpResendTimer--;
      } else {
        this.otpTimerSubscription.unsubscribe();
      }
    });
  }

  async verifyOtpAndProceed(): Promise<void> {
    try {
      this.isVerifyingOtp = true;
      const otp = this.initialVerificationForm.get('otp')?.value;
      const method = this.initialVerificationForm.get('otpMethod')?.value;
      const destination = method === 'sms' 
        ? this.initialVerificationForm.get('phoneNumber')?.value
        : this.initialVerificationForm.get('email')?.value;

      // Implement OTP verification logic here
      // const isValid = await this.otpService.verifyOtp(otp, method, destination);
      
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.isOtpVerified = true;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // You might want to show an error message to the user here
    } finally {
      this.isVerifyingOtp = false;
    }
  }

  proceedToNextStep(): void {
    this.steps[0].status = 'complete';
    this.steps[1].status = 'active';
    if (this.stepper) {
      this.stepper.next();
    }
  }

  // MetaMap Functions
  async startMetaMapVerification(): Promise<void> {
    try {
      // Implement MetaMap verification logic here
      // const result = await this.metaMapService.startVerification();
      
      // Simulate MetaMap verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.isMetaMapComplete = true;
      this.steps[1].status = 'complete';
      this.steps[2].status = 'active';
      if (this.stepper) {
        this.stepper.next();
      }
    } catch (error) {
      console.error('Error during MetaMap verification:', error);
    }
  }

  // Form Submission
  async onSubmit(): Promise<void> {
    if (this.addressForm.valid && this.isMetaMapComplete && this.isOtpVerified) {
      try {
        this.isSubmitting = true;
        const formData = {
          ...this.initialVerificationForm.value,
          ...this.addressForm.value
        };
        
        // Simulate API submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.steps[2].status = 'complete';
        this.kycStatus = {
          isValid: true,
          lastUpdated: new Date(),
          data: formData
        };
        this.showUpdateForm = false;
      } catch (error) {
        console.error('Error submitting KYC data:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    if (this.otpTimerSubscription) {
      this.otpTimerSubscription.unsubscribe();
    }
  }
} 