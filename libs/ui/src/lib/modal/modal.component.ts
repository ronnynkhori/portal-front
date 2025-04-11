import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex">
      <div class="relative bg-white w-full max-w-md m-auto rounded-lg shadow-lg">
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-medium">{{ title }}</h3>
          <button 
            (click)="close.emit()" 
            class="text-gray-400 hover:text-gray-500"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-4">
          <ng-content></ng-content>
        </div>
        
        <div *ngIf="showFooter" class="flex justify-end p-4 border-t">
          <div class="flex space-x-2">
            <ui-button 
              *ngIf="showCancelButton" 
              variant="secondary"
              (click)="close.emit()"
            >
              {{ cancelText }}
            </ui-button>
            
            <ui-button 
              *ngIf="showConfirmButton"
              [variant]="confirmButtonVariant"
              (click)="confirm.emit()"
            >
              {{ confirmText }}
            </ui-button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() showFooter = true;
  @Input() showCancelButton = true;
  @Input() showConfirmButton = true;
  @Input() cancelText = 'Cancel';
  @Input() confirmText = 'Confirm';
  @Input() confirmButtonVariant: 'primary' | 'success' | 'danger' = 'primary';
  
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
} 