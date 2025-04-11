import { Component, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as feather from 'feather-icons';
// eslint-disable-next-line
import { AuthService } from 'libs/data-access/auth/src/lib/auth.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen bg-gray-50">
      <!-- Side Panel -->
      <div class="w-64 bg-green-800 text-white shadow-lg">
        <div class="p-4 border-b border-green-700">
          <div class="flex items-center justify-start">
            <div>
              <h1 class="text-xl font-bold">Admin Portal</h1>
              <p class="text-xs text-green-300">BTC Self-Service</p>
            </div>
          </div>
        </div>
        
        <!-- Logged-in admin info -->
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
        
        <nav class="mt-5">
          <div class="px-4 py-2 text-xs text-green-400 uppercase tracking-wider">
            Dashboard
          </div>
          
          <a routerLink="/admin/dashboard" class="flex items-center px-4 py-3 text-white bg-green-900">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </span>
            Overview
          </a>
          
          <a routerLink="/admin/users" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </span>
            Manage Users
          </a>
          
          <a routerLink="/admin/agents" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-check"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
            </span>
            Manage Agents
          </a>
          
          <div class="px-4 py-2 mt-4 text-xs text-green-400 uppercase tracking-wider">
            Reports
          </div>
          
          <a routerLink="/admin/kyc" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </span>
            KYC Reports
          </a>
          
          <a routerLink="/admin/reports" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </span>
            Analytics
          </a>
          
          <div class="px-4 py-2 mt-4 text-xs text-green-400 uppercase tracking-wider">
            Settings
          </div>
          
          <a routerLink="/admin/settings" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
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
      </div>
      
      <!-- Main Content -->
      <div class="flex-1 overflow-auto">
        <!-- Page Content -->
        <div class="p-6">
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-gray-700 text-lg font-semibold">Overview</h2>
              <div class="text-sm text-gray-600">Welcome back, {{ adminName }}</div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Stats Cards -->
              <div class="bg-white rounded-lg shadow p-5 border-l-4 border-green-600">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-green-100 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users text-green-600"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <div class="ml-5">
                    <h3 class="text-gray-500 text-sm">Total Users</h3>
                    <div class="flex items-center">
                      <h4 class="text-2xl font-semibold text-gray-800">1,453</h4>
                      <span class="text-green-600 text-sm font-semibold ml-2">+15%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-5 border-l-4 border-blue-600">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-blue-100 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-check text-blue-600"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                  </div>
                  <div class="ml-5">
                    <h3 class="text-gray-500 text-sm">Active Agents</h3>
                    <div class="flex items-center">
                      <h4 class="text-2xl font-semibold text-gray-800">24</h4>
                      <span class="text-blue-600 text-sm font-semibold ml-2">+2</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-5 border-l-4 border-yellow-600">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-yellow-100 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock text-yellow-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <div class="ml-5">
                    <h3 class="text-gray-500 text-sm">Pending KYC</h3>
                    <div class="flex items-center">
                      <h4 class="text-2xl font-semibold text-gray-800">87</h4>
                      <span class="text-red-600 text-sm font-semibold ml-2">+12</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-5 border-l-4 border-purple-600">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-purple-100 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign text-purple-600"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </div>
                  <div class="ml-5">
                    <h3 class="text-gray-500 text-sm">Monthly Revenue</h3>
                    <div class="flex items-center">
                      <h4 class="text-2xl font-semibold text-gray-800">$23,485</h4>
                      <span class="text-green-600 text-sm font-semibold ml-2">+8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-3">
            <!-- Recent Activity -->
            <div class="col-span-2">
              <div class="bg-white rounded-lg shadow">
                <div class="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-700">Recent Activity</h3>
                  <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div class="p-5">
                  <div class="border-l-2 border-green-600 pl-4 py-2 mb-4">
                    <div class="flex justify-between items-center">
                      <p class="text-gray-800 font-medium">New user registered</p>
                      <span class="text-xs text-gray-500">5 mins ago</span>
                    </div>
                    <p class="text-gray-600 text-sm">John Doe completed KYC verification</p>
                  </div>
                  
                  <div class="border-l-2 border-blue-600 pl-4 py-2 mb-4">
                    <div class="flex justify-between items-center">
                      <p class="text-gray-800 font-medium">Agent status updated</p>
                      <span class="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p class="text-gray-600 text-sm">Agent Mary Smith is now active</p>
                  </div>
                  
                  <div class="border-l-2 border-yellow-600 pl-4 py-2 mb-4">
                    <div class="flex justify-between items-center">
                      <p class="text-gray-800 font-medium">KYC verification pending</p>
                      <span class="text-xs text-gray-500">3 hours ago</span>
                    </div>
                    <p class="text-gray-600 text-sm">Mike Johnson submitted documents for review</p>
                  </div>
                  
                  <div class="border-l-2 border-purple-600 pl-4 py-2">
                    <div class="flex justify-between items-center">
                      <p class="text-gray-800 font-medium">System update completed</p>
                      <span class="text-xs text-gray-500">Yesterday</span>
                    </div>
                    <p class="text-gray-600 text-sm">Mobile number verification module updated</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Quick Actions -->
            <div>
              <div class="bg-white rounded-lg shadow">
                <div class="px-5 py-4 border-b border-gray-100">
                  <h3 class="text-lg font-semibold text-gray-700">Quick Actions</h3>
                </div>
                <div class="p-5 space-y-4">
                  <a href="#" class="block bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                    <div class="flex items-center">
                      <div class="bg-green-100 rounded-full p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus text-green-600"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                      </div>
                      <div>
                        <h4 class="text-gray-800 font-medium">Add New Agent</h4>
                        <p class="text-gray-600 text-sm">Create new agent account</p>
                      </div>
                    </div>
                  </a>
                  
                  <a href="#" class="block bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                    <div class="flex items-center">
                      <div class="bg-blue-100 rounded-full p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2 text-blue-600"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                      </div>
                      <div>
                        <h4 class="text-gray-800 font-medium">Generate Report</h4>
                        <p class="text-gray-600 text-sm">Create monthly KYC report</p>
                      </div>
                    </div>
                  </a>
                  
                  <a href="#" class="block bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                    <div class="flex items-center">
                      <div class="bg-yellow-100 rounded-full p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell text-yellow-600"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                      </div>
                      <div>
                        <h4 class="text-gray-800 font-medium">Send Notification</h4>
                        <p class="text-gray-600 text-sm">Send SMS/Email to users</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Key Metrics Section -->
          <div class="mb-8">
            <h2 class="text-gray-700 text-lg font-semibold mb-4">Key Metrics</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- KYC Completion Rate -->
              <div class="bg-white rounded-lg shadow p-5">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-gray-700 font-semibold">KYC Completion Rate</h3>
                  <div class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    78% Completion
                  </div>
                </div>
                
                <div class="flex items-center mb-1">
                  <span class="text-gray-600 text-sm mr-2 w-24">Complete:</span>
                  <div class="flex-grow bg-gray-200 rounded-full h-2.5">
                    <div class="bg-green-600 h-2.5 rounded-full" style="width: 78%"></div>
                  </div>
                  <span class="text-gray-800 ml-2 text-sm">783</span>
                </div>
                
                <div class="flex items-center mb-1">
                  <span class="text-gray-600 text-sm mr-2 w-24">Pending:</span>
                  <div class="flex-grow bg-gray-200 rounded-full h-2.5">
                    <div class="bg-yellow-500 h-2.5 rounded-full" style="width: 15%"></div>
                  </div>
                  <span class="text-gray-800 ml-2 text-sm">148</span>
                </div>
                
                <div class="flex items-center mb-1">
                  <span class="text-gray-600 text-sm mr-2 w-24">Rejected:</span>
                  <div class="flex-grow bg-gray-200 rounded-full h-2.5">
                    <div class="bg-red-500 h-2.5 rounded-full" style="width: 7%"></div>
                  </div>
                  <span class="text-gray-800 ml-2 text-sm">72</span>
                </div>
                
                <div class="mt-3 text-xs text-gray-500">
                  Last 30 days · Total 1,003 KYC submissions
                </div>
              </div>
              
              <!-- Regional Distribution -->
              <div class="bg-white rounded-lg shadow p-5">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-gray-700 font-semibold">Regional Distribution</h3>
                  <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                    5 Regions
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between mb-1">
                      <span class="text-gray-700 font-medium">Gaborone</span>
                      <span class="text-gray-600">42%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div class="bg-blue-600 h-2.5 rounded-full" style="width: 42%"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div class="flex justify-between mb-1">
                      <span class="text-gray-700 font-medium">Francistown</span>
                      <span class="text-gray-600">23%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div class="bg-green-600 h-2.5 rounded-full" style="width: 23%"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div class="flex justify-between mb-1">
                      <span class="text-gray-700 font-medium">Maun</span>
                      <span class="text-gray-600">15%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div class="bg-yellow-500 h-2.5 rounded-full" style="width: 15%"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div class="flex justify-between mb-1">
                      <span class="text-gray-700 font-medium">Palapye</span>
                      <span class="text-gray-600">12%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div class="bg-purple-500 h-2.5 rounded-full" style="width: 12%"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div class="flex justify-between mb-1">
                      <span class="text-gray-700 font-medium">Other Regions</span>
                      <span class="text-gray-600">8%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div class="bg-gray-500 h-2.5 rounded-full" style="width: 8%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Monthly Performance -->
          <div class="mb-8">
            <h2 class="text-gray-700 text-lg font-semibold mb-4">Monthly Performance</h2>
            
            <div class="bg-white rounded-lg shadow p-5">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-gray-700 font-semibold">Registrations & KYC Completion</h3>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center">
                    <span class="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                    <span class="text-xs text-gray-600">New Users</span>
                  </div>
                  <div class="flex items-center">
                    <span class="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                    <span class="text-xs text-gray-600">KYC Complete</span>
                  </div>
                </div>
              </div>
              
              <!-- Simple CSS-based bar chart -->
              <div class="flex items-end h-48 space-x-2">
                <div class="flex flex-col items-center flex-1">
                  <div class="flex flex-col w-full items-center space-y-1">
                    <div class="bg-blue-500 w-full rounded-t" style="height: 30%"></div>
                    <div class="bg-green-500 w-full rounded-t" style="height: 20%"></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">Jan</div>
                </div>
                
                <div class="flex flex-col items-center flex-1">
                  <div class="flex flex-col w-full items-center space-y-1">
                    <div class="bg-blue-500 w-full rounded-t" style="height: 45%"></div>
                    <div class="bg-green-500 w-full rounded-t" style="height: 30%"></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">Feb</div>
                </div>
                
                <div class="flex flex-col items-center flex-1">
                  <div class="flex flex-col w-full items-center space-y-1">
                    <div class="bg-blue-500 w-full rounded-t" style="height: 60%"></div>
                    <div class="bg-green-500 w-full rounded-t" style="height: 40%"></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">Mar</div>
                </div>
                
                <div class="flex flex-col items-center flex-1">
                  <div class="flex flex-col w-full items-center space-y-1">
                    <div class="bg-blue-500 w-full rounded-t" style="height: 40%"></div>
                    <div class="bg-green-500 w-full rounded-t" style="height: 35%"></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">Apr</div>
                </div>
                
                <div class="flex flex-col items-center flex-1">
                  <div class="flex flex-col w-full items-center space-y-1">
                    <div class="bg-blue-500 w-full rounded-t" style="height: 55%"></div>
                    <div class="bg-green-500 w-full rounded-t" style="height: 50%"></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">May</div>
                </div>
                
                <div class="flex flex-col items-center flex-1">
                  <div class="flex flex-col w-full items-center space-y-1">
                    <div class="bg-blue-500 w-full rounded-t" style="height: 70%"></div>
                    <div class="bg-green-500 w-full rounded-t" style="height: 55%"></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">Jun</div>
                </div>
                
                <div class="flex flex-col items-center flex-1">
                  <div class="flex flex-col w-full items-center space-y-1">
                    <div class="bg-blue-500 w-full rounded-t" style="height: 80%"></div>
                    <div class="bg-green-500 w-full rounded-t" style="height: 60%"></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">Jul</div>
                </div>
                
                <div class="flex flex-col items-center flex-1">
                  <div class="flex flex-col w-full items-center space-y-1">
                    <div class="bg-blue-500 w-full rounded-t" style="height: 90%"></div>
                    <div class="bg-green-500 w-full rounded-t" style="height: 70%"></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">Aug</div>
                </div>
              </div>
              
              <div class="flex justify-between mt-4">
                <div>
                  <div class="text-gray-700 font-semibold">1,453</div>
                  <div class="text-xs text-gray-500">Total Users</div>
                </div>
                <div>
                  <div class="text-gray-700 font-semibold">783</div>
                  <div class="text-xs text-gray-500">KYC Complete</div>
                </div>
                <div>
                  <div class="text-gray-700 font-semibold">54%</div>
                  <div class="text-xs text-gray-500">Completion Rate</div>
                </div>
                <div>
                  <div class="text-green-600 font-semibold">+37%</div>
                  <div class="text-xs text-gray-500">Growth vs Last Period</div>
                </div>
              </div>
            </div>
          </div>
          
       
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Scroll styling */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #22c55e;
      border-radius: 3px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #15803d;
    }
  `]
})
export class AdminHomeComponent implements OnInit, AfterViewInit {
  // Admin info properties
  adminName = 'Thomas Anderson';
  adminId = 'ADM-2023-001';
  adminInitials = 'TA';
  
  constructor(
    private ngZone: NgZone,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get current user data - in a real app this would fetch from AuthService
    this.getCurrentUser();
    
    // Initial attempt to replace icons
    setTimeout(() => {
      this.initializeIcons();
    }, 0);
  }

  ngAfterViewInit(): void {
    // Ensure icons are replaced after view is fully rendered
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.initializeIcons();
      }, 100);
    });
  }

  initializeIcons(): void {
    try {
      feather.replace();
    } catch (error) {
      console.error('Error initializing feather icons:', error);
    }
  }
  
  getCurrentUser(): void {
    // In a real implementation, this would get the current user from the AuthService
    // For now, we're using mock data
    try {
      // This would be replaced with actual auth service call
      // this.authService.getCurrentUser().subscribe(user => {
      //   this.adminName = user.name;
      //   this.adminId = user.id;
      //   this.adminInitials = this.getInitials(user.name);
      // });
      
      // Mock data for demonstration
      this.adminName = 'Thomas Anderson';
      this.adminId = 'ADM-2023-001';
      this.adminInitials = this.getInitials(this.adminName);
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  }
  
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }
} 