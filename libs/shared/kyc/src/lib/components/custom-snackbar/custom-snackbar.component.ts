import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface SnackBarData {
  title: string;
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-start gap-3 min-w-[320px] p-4 bg-white rounded-lg shadow-lg">
      <!-- Success Icon -->
      <div *ngIf="data.type === 'success'" class="flex-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-6 h-6 text-green-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <!-- Error Icon -->
      <div *ngIf="data.type === 'error'" class="flex-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-6 h-6 text-red-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      
      <!-- Content -->
      <div class="flex-1">
        <h3 class="font-medium text-gray-900">{{data.title}}</h3>
        <p class="text-sm text-gray-600 mt-1">{{data.message}}</p>
      </div>
    </div>
  `,
  styles: []
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {}
} 