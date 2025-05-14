import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

interface Step {
  id: number;
  label: string;
  description: string;
  status: 'complete' | 'active' | 'pending';
}

@Component({
  selector: 'app-sim-transfer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './sim-transfer.component.html',
  styleUrls: ['./sim-transfer.component.css']
})
export class SimTransferComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  // Form Groups
  simDetailsForm!: FormGroup;
  transferDetailsForm!: FormGroup;

  // State Management
  isSubmitting = false;
  isVerifying = false;

  steps: Step[] = [
    {
      id: 1,
      label: 'SIM Details',
      description: 'Current SIM card information',
      status: 'active'
    },
    {
      id: 2,
      label: 'Transfer Details',
      description: 'New owner information',
      status: 'pending'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {}

  private initializeForms(): void {
    // Initialize SIM Details Form
    this.simDetailsForm = this.fb.group({
      simNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Assuming 10-digit SIM numbers
      currentOwnerName: ['', Validators.required],
      currentOwnerID: ['', [Validators.required, Validators.pattern('^[0-9]{6,}$')]], // ID number validation
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]] // 8-digit phone numbers
    });

    // Initialize Transfer Details Form
    this.transferDetailsForm = this.fb.group({
      newOwnerName: ['', Validators.required],
      newOwnerID: ['', [Validators.required, Validators.pattern('^[0-9]{6,}$')]], // ID number validation
      newPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // 8-digit phone numbers
      transferReason: ['', Validators.required]
    });
  }

  async verifySIMDetails(): Promise<void> {
    if (this.simDetailsForm.valid) {
      try {
        this.isVerifying = true;
        // Simulate API verification
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.steps[0].status = 'complete';
        this.steps[1].status = 'active';
        if (this.stepper) {
          this.stepper.next();
        }
      } catch (error) {
        console.error('Error verifying SIM details:', error);
      } finally {
        this.isVerifying = false;
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.simDetailsForm.valid && this.transferDetailsForm.valid) {
      try {
        this.isSubmitting = true;
        const formData = {
          ...this.simDetailsForm.value,
          ...this.transferDetailsForm.value
        };
        
        // Simulate API submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.steps[1].status = 'complete';
        this.snackbarService.success('SIM transfer request submitted successfully');
      } catch (error) {
        console.error('Error submitting transfer data:', error);
        this.snackbarService.error('Failed to submit SIM transfer request');
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
} 