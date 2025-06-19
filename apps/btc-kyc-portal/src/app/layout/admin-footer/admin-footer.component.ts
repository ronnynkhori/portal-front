import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-white border-t border-gray-200">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-600">
            © 2024 BTC Self-Service Portal. All rights reserved.
          </div>
          <div class="text-sm text-gray-600">
            Version 1.0.0
          </div>
        </div>
      </div>
    </footer>
  `
})
export class AdminFooterComponent {} 