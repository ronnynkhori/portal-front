import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [ngClass]="[
        'inline-flex items-center justify-center rounded font-medium focus:outline-none',
        getVariantClasses(),
        getSizeClasses(),
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90',
        'transition-colors duration-200 ease-in-out'
      ]"
      [disabled]="disabled"
      [type]="type"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  getVariantClasses(): string {
    const classes = {
      primary: 'bg-green-600 text-white',
      secondary: 'bg-gray-600 text-white',
      success: 'bg-green-600 text-white',
      danger: 'bg-red-600 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-blue-400 text-white'
    };
    return classes[this.variant];
  }

  getSizeClasses(): string {
    const classes = {
      sm: 'text-sm py-1 px-3',
      md: 'text-base py-2 px-4',
      lg: 'text-lg py-3 px-6'
    };
    return classes[this.size];
  }
} 