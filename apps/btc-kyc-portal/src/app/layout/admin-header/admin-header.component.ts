import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-gradient-to-r from-blue-800 to-blue-600 shadow-md">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <a routerLink="/admin" class="flex items-center">
              <img src="https://kyc.btc.bw/sim/assets/logo/coat.png" alt="BTC Logo" class="h-10 w-auto">
              <h1 class="ml-3 text-2xl font-bold text-white">BTC Admin Portal</h1>
            </a>
          </div>
          <nav class="hidden md:block">
            <ul class="flex space-x-8">
              <li>
                <a routerLink="/admin/dashboard" class="text-white hover:text-blue-200 font-medium text-base transition-colors duration-200">Dashboard</a>
              </li>
              <li>
                <a routerLink="/admin/agents" class="text-white hover:text-blue-200 font-medium text-base transition-colors duration-200">Manage Agents</a>
              </li>
              <li>
                <a routerLink="/admin/kyc" class="text-white hover:text-blue-200 font-medium text-base transition-colors duration-200">KYC Management</a>
              </li>
              <li>
                <a routerLink="/admin/reports" class="text-white hover:text-blue-200 font-medium text-base transition-colors duration-200">Reports</a>
              </li>
              <li>
                <button (click)="logout()" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button type="button" class="text-white hover:text-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class AdminHeaderComponent {
  logout() {
    // Implement logout logic here
    // Redirect to login page
  }
} 