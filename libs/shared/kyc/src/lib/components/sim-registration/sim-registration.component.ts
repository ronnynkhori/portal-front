import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { SimRegistrationService } from '../../services/sim-registration.service';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Step, Subscriber } from "../../models/kyc.models";
import { SnackbarService } from '../../services/snackbar.service';
import { FooterComponent } from '@btc/shared/layout';

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
    FooterComponent,
  ],
  templateUrl: './sim-registration.component.html',
  styleUrls: ['./sim-registration.component.css']
})
export class SimRegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

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
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private simRegistrationService: SimRegistrationService,
    private snackbar: SnackbarService
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
        if (value && value.length === 8) {
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

    // Watch for nationality changes
    this.personalInfoForm.get('nationality')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.isNonCitizen = value !== 'Botswana';
        this.updateStepsBasedOnNationality();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private validateMsisdn(msisdn: string): void {
    this.isValidatingMsisdn = true;
    // Simulating API call with successful validation
    setTimeout(() => {
      this.isValidatingMsisdn = false;
      // Always return valid
      this.personalInfoForm.get('msisdn')?.setErrors(null);
    }, 500);
  }

  private validateIdNumber(idNumber: string, idType: string): void {
    this.isValidatingId = true;
    // Simulating API call with successful validation
    setTimeout(() => {
      this.isValidatingId = false;
      // Always return valid
      this.identificationForm.get('idNumber')?.setErrors(null);
    }, 500);
  }

  private showError(message: string): void {
    this.snackbar.error(message);
  }

  private showSuccess(message: string): void {
    this.snackbar.success(message);
  }

  private initializeForms(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      company: [''],
      msisdn: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      alternativePhone: ['', Validators.pattern('^[0-9]{8}$')],
      emailAddress: ['', [Validators.email]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['', Validators.required],
      nextOfKin: [''],
      nextOfKinPhone: ['', Validators.pattern('^[0-9]{8}$')]
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
        // Add validators for permit fields for non-citizens
        this.permitForm.get('residencePermitNo')?.setValidators(Validators.required);
        this.permitForm.get('residencePermitDateOfExpiry')?.setValidators(Validators.required);
        this.permitForm.get('residencePermitDateOfIssue')?.setValidators(Validators.required);
        this.permitForm.get('workPermitNo')?.setValidators(Validators.required);
        this.permitForm.get('workPermitDateOfExpiry')?.setValidators(Validators.required);
        this.permitForm.get('workPermitDateOfIssue')?.setValidators(Validators.required);
      } else {
        // Remove validators for permit fields for citizens
        this.permitForm.get('residencePermitNo')?.clearValidators();
        this.permitForm.get('residencePermitDateOfExpiry')?.clearValidators();
        this.permitForm.get('residencePermitDateOfIssue')?.clearValidators();
        this.permitForm.get('workPermitNo')?.clearValidators();
        this.permitForm.get('workPermitDateOfExpiry')?.clearValidators();
        this.permitForm.get('workPermitDateOfIssue')?.clearValidators();
      }
      // Update validity
      Object.keys(this.permitForm.controls).forEach(key => {
        this.permitForm.get(key)?.updateValueAndValidity();
      });
    });
  }

  private updateStepsBasedOnNationality(): void {
    if (this.isNonCitizen && this.steps.length === 3) {
      // Add permits step for non-citizens
      this.steps.push({
        id: 4,
        label: 'Permits',
        description: 'Work and residence permits',
        status: 'pending'
      });
    } else if (!this.isNonCitizen && this.steps.length === 4) {
      // Remove permits step for citizens
      this.steps.pop();
    }
  }

  onPersonalInfoSubmit(): void {
    if (this.personalInfoForm.valid) {
      // Force validation to complete immediately
      this.isValidatingMsisdn = false;
      this.steps[0].status = 'complete';
      this.steps[1].status = 'active';
      // Move to next step
      if (this.stepper) {
        this.stepper.next();
      }
    }
  }

  onAddressSubmit(): void {
    if (this.addressForm.valid) {
      this.steps[1].status = 'complete';
      this.steps[2].status = 'active';
      // Move to next step
      if (this.stepper) {
        this.stepper.next();
      }
    }
  }

  onIdentificationSubmit(): void {
    if (this.identificationForm.valid) {
      this.steps[2].status = 'complete';
      if (this.isNonCitizen) {
        this.steps[3].status = 'active';
        if (this.stepper) {
          this.stepper.next();
        }
      } else {
        // For citizens, complete registration directly
        this.onFinalSubmit();
      }
    }
  }

  onPermitSubmit(): void {
    if (this.permitForm.valid) {
      this.steps[3].status = 'complete';
      this.onFinalSubmit();
    }
  }

  private formatDateToISOString(date: Date | null): string {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  }

  onFinalSubmit(): void {
    if (this.personalInfoForm.valid &&
        this.addressForm.valid &&
        this.identificationForm.valid &&
        (!this.isNonCitizen || this.permitForm.valid)) {

      this.isLoading = true;

      const formData: Subscriber = {
        // Personal Information
        firstName: this.personalInfoForm.get('firstName')?.value,
        lastName: this.personalInfoForm.get('lastName')?.value,
        company: this.personalInfoForm.get('company')?.value || undefined,
        msisdn: this.personalInfoForm.get('msisdn')?.value,
        alternativePhone: this.personalInfoForm.get('alternativePhone')?.value || undefined,
        emailAddress: this.personalInfoForm.get('emailAddress')?.value || undefined,
        gender: this.personalInfoForm.get('gender')?.value,
        dateOfBirth: this.formatDateToISOString(this.personalInfoForm.get('dateOfBirth')?.value),
        nationality: this.personalInfoForm.get('nationality')?.value,
        nextOfKin: this.personalInfoForm.get('nextOfKin')?.value || undefined,
        nextOfKinPhone: this.personalInfoForm.get('nextOfKinPhone')?.value || undefined,

        // Address Information
        plotNumber: this.addressForm.get('plotNumber')?.value,
        street: this.addressForm.get('street')?.value || undefined,
        cityTownVillage: this.addressForm.get('cityTownVillage')?.value,
        city: this.addressForm.get('city')?.value,
        billAddress4: this.addressForm.get('billAddress4')?.value || undefined,
        zipCode: this.addressForm.get('zipCode')?.value || undefined,

        // Identification Information
        idType: this.identificationForm.get('idType')?.value,
        idNumber: this.identificationForm.get('idNumber')?.value,
        idIssueDate: this.formatDateToISOString(this.identificationForm.get('idIssueDate')?.value),
        idExpiryDate: this.formatDateToISOString(this.identificationForm.get('idExpiryDate')?.value),
      };

      // Only add permit information for non-citizens
      if (this.isNonCitizen) {
        Object.assign(formData, {
          residencePermitNo: this.permitForm.get('residencePermitNo')?.value,
          residencePermitDateOfIssue: this.formatDateToISOString(this.permitForm.get('residencePermitDateOfIssue')?.value),
          residencePermitDateOfExpiry: this.formatDateToISOString(this.permitForm.get('residencePermitDateOfExpiry')?.value),
          workPermitNo: this.permitForm.get('workPermitNo')?.value,
          workPermitDateOfIssue: this.formatDateToISOString(this.permitForm.get('workPermitDateOfIssue')?.value),
          workPermitDateOfExpiry: this.formatDateToISOString(this.permitForm.get('workPermitDateOfExpiry')?.value)
        });
      }

      // Remove undefined values to keep the request body clean
      Object.keys(formData).forEach(key => {
        if (formData[key as keyof Subscriber] === undefined) {
          delete formData[key as keyof Subscriber];
        }
      });

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

  goBack(): void {
    this.router.navigate(['/agent']);
  }
}
