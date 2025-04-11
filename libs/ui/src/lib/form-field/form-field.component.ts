import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-4">
      <label 
        *ngIf="label" 
        [for]="id" 
        class="block text-gray-700 font-medium mb-2"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      
      <ng-content></ng-content>
      
      <div *ngIf="errorMessage" class="text-red-500 text-sm mt-1">
        {{ errorMessage }}
      </div>
      
      <div *ngIf="hint" class="text-gray-500 text-sm mt-1">
        {{ hint }}
      </div>
    </div>
  `
})
export class FormFieldComponent {
  @Input() label?: string;
  @Input() id = '';
  @Input() required = false;
  @Input() errorMessage?: string;
  @Input() hint?: string;
} 