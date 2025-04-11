import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agent-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-gradient-to-r from-purple-800 to-purple-600 shadow-md">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <a routerLink="/agent" class="flex items-center">
              <img src="https://kyc.btc.bw/sim/assets/logo/coat.png" alt="BTC Logo" class="h-10 w-auto">
              <h1 class="ml-3 text-2xl font-bold text-white">BTC Agent Portal</h1>
            </a>
          </div>
          <nav class="hidden md:block">
            <ul class="flex space-x-8">
              <li>
                <a routerLink="/agent/dashboard" class="text-white hover:text-purple-200 font-medium text-base transition-colors duration-200">Dashboard</a>
              </li>
              <li>
                <a routerLink="/agent/kyc" class="text-white hover:text-purple-200 font-medium text-base transition-colors duration-200">KYC</a>
              </li>
              <li>
                <a routerLink="/agent/registration" class="text-white hover:text-purple-200 font-medium text-base transition-colors duration-200">Registration</a>
              </li>
              <li>
                <a routerLink="/agent/transfer" class="text-white hover:text-purple-200 font-medium text-base transition-colors duration-200">Number Transfer</a>
              </li>
              <li>
                <button (click)="logout()" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition-colors duration-200">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button type="button" class="text-white hover:text-purple-200">
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
export class AgentHeaderComponent {
  logout() {
    // Implement logout logic here
    // Redirect to login page
  }
} 