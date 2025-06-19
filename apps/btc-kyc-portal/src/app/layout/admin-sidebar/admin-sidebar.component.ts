import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="w-64 bg-green-800 text-white shadow-lg h-full">
      <div class="p-4 border-b border-green-700">
        <div class="flex items-center justify-start">
          <div>
            <h1 class="text-xl font-bold">Admin Portal</h1>
            <p class="text-xs text-green-300">BTC Self-Service</p>
          </div>
        </div>
      </div>
      
      <!-- Admin Info -->
      <div class="p-4 border-b border-green-700">
        <div class="flex items-center">
          <div class="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
            {{ adminInitials }}
          </div>
          <div>
            <div class="font-medium text-white">{{ adminName }}</div>
            <div class="text-xs text-green-300">Admin ID: {{ adminId }}</div>
            <div class="text-xs text-green-300 flex items-center">
              <span class="inline-block h-2 w-2 rounded-full bg-green-400 mr-1"></span>
              Online
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="mt-5">
        <div class="px-4 py-2 text-xs text-green-400 uppercase tracking-wider">
          Dashboard
        </div>
        <a routerLink="/admin/dashboard" routerLinkActive="bg-green-900" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
          <span class="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </span>
          Overview
        </a>
        <a routerLink="/admin/users" routerLinkActive="bg-green-900" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
          <span class="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </span>
          Manage Users
        </a>
        <a routerLink="/admin/agents" routerLinkActive="bg-green-900" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
          <span class="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-check"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          </span>
          Manage Agents
        </a>
        <div class="px-4 py-2 mt-4 text-xs text-green-400 uppercase tracking-wider">
          Reports
        </div>
        <a routerLink="/admin/kyc" routerLinkActive="bg-green-900" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
          <span class="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </span>
          KYC Reports
        </a>
        <a routerLink="/admin/reports" routerLinkActive="bg-green-900" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
          <span class="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          </span>
          Analytics
        </a>
        <div class="px-4 py-2 mt-4 text-xs text-green-400 uppercase tracking-wider">
          Settings
        </div>
        <a routerLink="/admin/settings" routerLinkActive="bg-green-900" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
          <span class="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </span>
          System Settings
        </a>
        <a routerLink="/login" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors mt-8">
          <span class="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </span>
          Logout
        </a>
      </nav>
    </aside>
  `
})
export class AdminSidebarComponent {
  @Input() adminName = '';
  @Input() adminId = '';
  @Input() adminInitials = '';
} 