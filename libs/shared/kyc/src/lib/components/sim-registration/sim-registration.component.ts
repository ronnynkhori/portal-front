import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { SimRegistrationService } from '../../services/sim-registration.service';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterComponent } from '../../../../../layout/src/lib/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

export interface Subscriber {
  firstName: string;
  lastName: string;
  company?: string;
  msisdn: string;
  alternativePhone?: string;
  plotNumber: string;
  street?: string;
  cityTownVillage: string;
  city: string;
  billAddress4?: string;
  zipCode?: string;
  nextOfKin?: string;
  nextOfKinPhone?: string;
  emailAddress?: string;
  gender: 'MALE' | 'FEMALE';
  dateOfBirth: string; // Format: 'YYYY-MM-DD'
  nationality: string;
  residencePermitNo?: string;
  residencePermitDateOfExpiry?: string;
  residencePermitDateOfIssue?: string;
  workPermitNo?: string;
  workPermitDateOfExpiry?: string;
  workPermitDateOfIssue?: string;
  idType: 'PASSPORT' | 'NATIONAL_ID';
  idNumber: string;
  idIssueDate: string;
  idExpiryDate: string;
}

interface Step {
  id: number;
  label: string;
  description: string;
  status: 'complete' | 'active' | 'pending';
}

@Component({
  selector: 'app-sim-registration',
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
    MatSnackBarModule,
    HttpClientModule,
    FooterComponent,
  ],
  templateUrl: './sim-registration.component.html',
  styleUrls: ['./sim-registration.component.css']
})
export class SimRegistrationComponent implements OnInit, OnDestroy {
  personalInfoForm!: FormGroup;
  addressForm!: FormGroup;
  identificationForm!: FormGroup;
  permitForm!: FormGroup;
  
  isLoading = false;
  isValidatingMsisdn = false;
  isValidatingId = false;
  isNonCitizen = false;
  
  private destroy$ = new Subject<void>();

  steps: Step[] = [
    {
      id: 1,
      label: 'Personal Information',
      description: 'Basic details and contact information',
      status: 'active'
    },
    {
      id: 2,
      label: 'Address Details',
      description: 'Residential and billing address',
      status: 'pending'
    },
    {
      id: 3,
      label: 'Identification',
      description: 'ID verification and details',
      status: 'pending'
    },
    {
      id: 4,
      label: 'Permits',
      description: 'Work and residence permits',
      status: 'pending'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private simRegistrationService: SimRegistrationService,
    private snackBar: MatSnackBar
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    // Watch for MSISDN changes and validate
    this.personalInfoForm.get('msisdn')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value && value.length === 10) {
          this.validateMsisdn(value);
        }
      });

    // Watch for ID changes and validate
    this.identificationForm.get('idNumber')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        const idType = this.identificationForm.get('idType')?.value;
        if (value && idType) {
          this.validateIdNumber(value, idType);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private validateMsisdn(msisdn: string): void {
    this.isValidatingMsisdn = true;
    this.simRegistrationService.validateMsisdn(msisdn)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (!response.valid) {
            this.personalInfoForm.get('msisdn')?.setErrors({ invalid: true });
            this.showError('Invalid phone number or already registered');
          }
        },
        error: (error) => {
          this.showError('Error validating phone number');
          console.error('MSISDN validation error:', error);
        },
        complete: () => {
          this.isValidatingMsisdn = false;
        }
      });
  }

  private validateIdNumber(idNumber: string, idType: string): void {
    this.isValidatingId = true;
    this.simRegistrationService.validateIdNumber(idNumber, idType)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (!response.valid) {
            this.identificationForm.get('idNumber')?.setErrors({ invalid: true });
            this.showError('Invalid ID number or already registered');
          }
        },
        error: (error) => {
          this.showError('Error validating ID number');
          console.error('ID validation error:', error);
        },
        complete: () => {
          this.isValidatingId = false;
        }
      });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private initializeForms(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      company: [''],
      msisdn: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      alternativePhone: ['', Validators.pattern('^[0-9]{10}$')],
      emailAddress: ['', [Validators.email]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['', Validators.required],
      nextOfKin: [''],
      nextOfKinPhone: ['', Validators.pattern('^[0-9]{10}$')]
    });

    this.addressForm = this.fb.group({
      plotNumber: ['', Validators.required],
      street: [''],
      cityTownVillage: ['', Validators.required],
      city: ['', Validators.required],
      billAddress4: [''],
      zipCode: ['']
    });

    this.identificationForm = this.fb.group({
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      idIssueDate: ['', Validators.required],
      idExpiryDate: ['', Validators.required]
    });

    this.permitForm = this.fb.group({
      residencePermitNo: [''],
      residencePermitDateOfExpiry: [''],
      residencePermitDateOfIssue: [''],
      workPermitNo: [''],
      workPermitDateOfExpiry: [''],
      workPermitDateOfIssue: ['']
    });

    // Watch for nationality changes to toggle permit requirements
    this.personalInfoForm.get('nationality')?.valueChanges.subscribe(value => {
      this.isNonCitizen = value !== 'Botswana';
      if (this.isNonCitizen) {
        Object.keys(this.permitForm.controls).forEach(key => {
          this.permitForm.get(key)?.setValidators(Validators.required);
          this.permitForm.get(key)?.updateValueAndValidity();
        });
      } else {
        Object.keys(this.permitForm.controls).forEach(key => {
          this.permitForm.get(key)?.clearValidators();
          this.permitForm.get(key)?.updateValueAndValidity();
        });
      }
    });
  }

  onPersonalInfoSubmit(): void {
    if (this.personalInfoForm.valid && !this.isValidatingMsisdn) {
      this.steps[0].status = 'complete';
      this.steps[1].status = 'active';
    }
  }

  onAddressSubmit(): void {
    if (this.addressForm.valid) {
      this.steps[1].status = 'complete';
      this.steps[2].status = 'active';
    }
  }

  onIdentificationSubmit(): void {
    if (this.identificationForm.valid && !this.isValidatingId) {
      this.steps[2].status = 'complete';
      this.steps[3].status = 'active';
    }
  }

  onPermitSubmit(): void {
    if (this.permitForm.valid) {
      this.steps[3].status = 'complete';
      this.onFinalSubmit();
    }
  }

  onFinalSubmit(): void {
    if (this.personalInfoForm.valid && 
        this.addressForm.valid && 
        this.identificationForm.valid &&
        (!this.isNonCitizen || this.permitForm.valid)) {
      
      this.isLoading = true;
      
      const formData: Subscriber = {
        ...this.personalInfoForm.value,
        ...this.addressForm.value,
        ...this.identificationForm.value,
        ...(this.isNonCitizen ? this.permitForm.value : {}),
        dateOfBirth: this.formatDate(this.personalInfoForm.get('dateOfBirth')?.value),
        idIssueDate: this.formatDate(this.identificationForm.get('idIssueDate')?.value),
        idExpiryDate: this.formatDate(this.identificationForm.get('idExpiryDate')?.value),
        residencePermitDateOfIssue: this.formatDate(this.permitForm.get('residencePermitDateOfIssue')?.value),
        residencePermitDateOfExpiry: this.formatDate(this.permitForm.get('residencePermitDateOfExpiry')?.value),
        workPermitDateOfIssue: this.formatDate(this.permitForm.get('workPermitDateOfIssue')?.value),
        workPermitDateOfExpiry: this.formatDate(this.permitForm.get('workPermitDateOfExpiry')?.value)
      };

      this.simRegistrationService.registerSubscriber(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.showSuccess('SIM registration completed successfully');
            setTimeout(() => {
              this.router.navigate(['/agent/dashboard']);
            }, 2000);
          },
          error: (error) => {
            this.showError('Error submitting registration. Please try again.');
            console.error('Registration error:', error);
            this.isLoading = false;
          }
        });
    }
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }

  goBack(): void {
    this.router.navigate(['/agent']);
  }
} 