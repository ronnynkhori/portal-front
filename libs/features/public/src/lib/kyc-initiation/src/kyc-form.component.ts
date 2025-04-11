import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'libs/ui/src/lib/button/button.component';
import { FormFieldComponent } from 'libs/ui/src/lib/form-field/form-field.component';
import { KycService } from 'libs/data-access/kyc/src/lib/kyc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'feature-kyc-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, FormFieldComponent],
  template: `
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6">KYC Verification</h2>
      
      <form [formGroup]="kycForm" (ngSubmit)="onSubmit()">
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4">Personal Information</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ui-form-field label="First Name" id="firstName" [required]="true">
              <input 
                formControlName="firstName"
                id="firstName" 
                type="text" 
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </ui-form-field>
            
            <ui-form-field label="Last Name" id="lastName" [required]="true">
              <input 
                formControlName="lastName"
                id="lastName" 
                type="text" 
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </ui-form-field>
            
            <ui-form-field label="National ID" id="nationalId" [required]="true">
              <input 
                formControlName="nationalIdNumber"
                id="nationalId" 
                type="text" 
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </ui-form-field>
            
            <ui-form-field label="Date of Birth" id="dob" [required]="true">
              <input 
                formControlName="dateOfBirth"
                id="dob" 
                type="date" 
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </ui-form-field>
            
            <ui-form-field label="Phone Number" id="phone" [required]="true">
              <input 
                formControlName="phoneNumber"
                id="phone" 
                type="tel" 
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </ui-form-field>
            
            <ui-form-field label="Email" id="email">
              <input 
                formControlName="email"
                id="email" 
                type="email" 
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </ui-form-field>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4">Address</h3>
          
          <ui-form-field label="Address" id="address" [required]="true">
            <textarea 
              formControlName="address"
              id="address" 
              rows="3" 
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </ui-form-field>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4">Document Upload</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ui-form-field label="National ID (Front)" id="idFront" [required]="true">
              <input 
                formControlName="nationalIdFront"
                id="idFront" 
                type="file" 
                accept="image/*"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </ui-form-field>
            
            <ui-form-field label="National ID (Back)" id="idBack" [required]="true">
              <input 
                formControlName="nationalIdBack"
                id="idBack" 
                type="file" 
                accept="image/*"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </ui-form-field>
            
            <ui-form-field label="Proof of Address" id="addressProof" [required]="true">
              <input 
                formControlName="addressProof"
                id="addressProof" 
                type="file" 
                accept="image/*,.pdf"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </ui-form-field>
            
            <ui-form-field label="Selfie" id="selfie" [required]="true">
              <input 
                formControlName="selfie"
                id="selfie" 
                type="file" 
                accept="image/*"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </ui-form-field>
          </div>
        </div>
        
        <div *ngIf="errorMessage" class="p-4 mb-4 bg-red-100 text-red-700 rounded">
          {{ errorMessage }}
        </div>
        
        <div class="flex justify-end space-x-4">
          <ui-button variant="secondary" type="button" (click)="navigateBack()">Cancel</ui-button>
          <ui-button type="submit" [disabled]="kycForm.invalid || isSubmitting">
            <span *ngIf="isSubmitting">Submitting...</span>
            <span *ngIf="!isSubmitting">Submit</span>
          </ui-button>
        </div>
      </form>
    </div>
  `
})
export class KycFormComponent {
  kycForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder, 
    private kycService: KycService,
    private router: Router
  ) {
    this.kycForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationalIdNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      nationalIdFront: [null, Validators.required],
      nationalIdBack: [null, Validators.required],
      addressProof: [null, Validators.required],
      selfie: [null, Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.kycForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.kycForm.controls).forEach(key => {
        const control = this.kycForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = '';
    
    // In a real application, you would upload the files first
    // and get URLs, then submit those URLs with the application
    
    // For now, we'll simulate file uploads with mock URLs
    const mockImageUrls = {
      nationalIdImageUrl: 'assets/mock/id-front-' + Date.now() + '.jpg',
      proofOfAddressImageUrl: 'assets/mock/address-' + Date.now() + '.jpg',
      selfieImageUrl: 'assets/mock/selfie-' + Date.now() + '.jpg'
    };
    
    // Prepare application data
    const applicationData = {
      userId: '101', // This would normally come from the authenticated user
      nationalIdNumber: this.kycForm.value.nationalIdNumber,
      ...mockImageUrls
    };
    
    this.kycService.submitKycApplication(applicationData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        
        // Navigate to a success page or show success message
        this.router.navigate(['/public'], { 
          queryParams: { 
            kyc: 'submitted', 
            id: response.id 
          } 
        });
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'Failed to submit KYC application. Please try again.';
      }
    });
  }
  
  navigateBack(): void {
    this.router.navigate(['/public']);
  }
} 