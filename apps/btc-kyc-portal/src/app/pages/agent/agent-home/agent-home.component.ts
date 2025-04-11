import { Component, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as feather from 'feather-icons';
// eslint-disable-next-line
import { AuthService } from 'libs/data-access/auth/src/lib/auth.service';

@Component({
  selector: 'app-agent-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen bg-gray-50">
      <!-- Side Panel -->
      <div class="w-64 bg-green-800 text-white shadow-lg">
        <div class="p-4 border-b border-green-700">
          <div class="flex items-center justify-center">
           
            <div>
              <h1 class="text-xl font-bold">Agent Portal</h1>
              <p class="text-xs text-green-300">BTC Self-Service</p>
            </div>
          </div>
        </div>
        
        <!-- Logged-in agent info -->
        <div class="p-4 border-b border-green-700">
          <div class="flex items-center">
            <div class="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
              {{ agentInitials }}
            </div>
            <div>
              <div class="font-medium text-white">{{ agentName }}</div>
              <div class="text-xs text-green-300">Agent ID: {{ agentId }}</div>
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
          
          <a routerLink="/agent/dashboard" class="flex items-center px-4 py-3 text-white bg-green-900">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </span>
            Overview
          </a>
          
          <a routerLink="/agent/registration" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            </span>
            Customer Registration
          </a>
          
          <a routerLink="/agent/kyc" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </span>
            Process KYC
          </a>
          
          <a routerLink="/agent/transfer" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            </span>
            Number Transfers
          </a>
          
          <div class="px-4 py-2 mt-4 text-xs text-green-400 uppercase tracking-wider">
            Reports
          </div>
          
          <a routerLink="/agent/reports" class="flex items-center px-4 py-3 text-white hover:bg-green-700 transition-colors">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </span>
            Performance Report
          </a>
          
          <a routerLink="/login" class="flex items-center px-4 py-3 text-white bg-green-700 transition-colors mt-8">
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
              <div class="text-sm text-gray-600">Welcome back, {{ agentName }}</div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Stats Cards -->
              <div class="bg-white rounded-lg shadow p-5 border-l-4 border-green-600">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-green-100 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus text-green-600"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                  </div>
                  <div class="ml-5">
                    <h3 class="text-gray-500 text-sm">Total Registrations</h3>
                    <div class="flex items-center">
                      <h4 class="text-2xl font-semibold text-gray-800">248</h4>
                      <span class="text-green-600 text-sm font-semibold ml-2">+12%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-5 border-l-4 border-blue-600">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-blue-100 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield text-blue-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <div class="ml-5">
                    <h3 class="text-gray-500 text-sm">KYC Completed</h3>
                    <div class="flex items-center">
                      <h4 class="text-2xl font-semibold text-gray-800">192</h4>
                      <span class="text-blue-600 text-sm font-semibold ml-2">+8%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg shadow p-5 border-l-4 border-yellow-600">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-yellow-100 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw text-yellow-600"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                  </div>
                  <div class="ml-5">
                    <h3 class="text-gray-500 text-sm">Number Transfers</h3>
                    <div class="flex items-center">
                      <h4 class="text-2xl font-semibold text-gray-800">37</h4>
                      <span class="text-yellow-600 text-sm font-semibold ml-2">+5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Agent Performance Metrics -->
          <div class="mb-8">
            <h2 class="text-gray-700 text-lg font-semibold mb-4">Your Performance</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <!-- Performance Score -->
              <div class="bg-white rounded-lg shadow p-5 flex flex-col items-center justify-center">
                <div class="relative w-36 h-36 mb-4">
                  <!-- Circular progress indicator (background) -->
                  <div class="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                  
                  <!-- Circular progress indicator (foreground) - 95% -->
                  <div class="absolute inset-0 rounded-full border-8 border-transparent border-t-green-500 border-r-green-500 border-b-green-500" style="transform: rotate(-18deg)"></div>
                  
                  <!-- Center content -->
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-3xl font-bold text-gray-800">95</span>
                    <span class="text-sm text-gray-500">out of 100</span>
                  </div>
                </div>
                
                <h3 class="text-gray-700 font-semibold">Performance Score</h3>
                <p class="text-sm text-gray-500 text-center mt-1">Top 5% of all agents</p>
                
                <div class="mt-4 flex space-x-2">
                  <div class="flex flex-col items-center">
                    <div class="text-lg font-semibold text-gray-800">98%</div>
                    <div class="text-xs text-gray-500">Accuracy</div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="text-lg font-semibold text-gray-800">92%</div>
                    <div class="text-xs text-gray-500">Speed</div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="text-lg font-semibold text-gray-800">97%</div>
                    <div class="text-xs text-gray-500">Compliance</div>
                  </div>
                </div>
              </div>
              
              <!-- Weekly Stats -->
              <div class="bg-white rounded-lg shadow p-5">
                <h3 class="text-gray-700 font-semibold mb-4">Weekly Tasks Completion</h3>
                
                <!-- Simple CSS bar chart -->
                <div class="space-y-3">
                  <div>
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Monday</span>
                      <span>12 tasks</span>
                    </div>
                    <div class="h-3 bg-gray-200 rounded-full">
                      <div class="h-3 bg-green-500 rounded-full" style="width: 100%"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Tuesday</span>
                      <span>15 tasks</span>
                    </div>
                    <div class="h-3 bg-gray-200 rounded-full">
                      <div class="h-3 bg-green-500 rounded-full" style="width: 100%"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Wednesday</span>
                      <span>10 tasks</span>
                    </div>
                    <div class="h-3 bg-gray-200 rounded-full">
                      <div class="h-3 bg-green-500 rounded-full" style="width: 100%"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Thursday</span>
                      <span>14 tasks</span>
                    </div>
                    <div class="h-3 bg-gray-200 rounded-full">
                      <div class="h-3 bg-green-500 rounded-full" style="width: 100%"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Friday</span>
                      <span>11 tasks</span>
                    </div>
                    <div class="h-3 bg-gray-200 rounded-full">
                      <div class="h-3 bg-green-500 rounded-full" style="width: 85%"></div>
                    </div>
                  </div>
                </div>
                
                <div class="mt-4 flex justify-between">
                  <div>
                    <span class="text-xl font-semibold text-gray-800">62</span>
                    <span class="text-sm text-gray-500 ml-1">Total Tasks</span>
                  </div>
                  <div>
                    <span class="text-xl font-semibold text-green-600">97%</span>
                    <span class="text-sm text-gray-500 ml-1">Completed</span>
                  </div>
                </div>
              </div>
              
              <!-- Today's Stats -->
              <div class="bg-white rounded-lg shadow p-5">
                <h3 class="text-gray-700 font-semibold mb-4">Today's Progress</h3>
                
                <div class="mb-4">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600">Daily Goal</span>
                    <span class="text-gray-800 font-medium">8 / 10 tasks</span>
                  </div>
                  <div class="w-full h-2.5 bg-gray-200 rounded-full">
                    <div class="h-2.5 bg-blue-600 rounded-full" style="width: 80%"></div>
                  </div>
                </div>
                
                <!-- KYC Stats -->
                <div class="space-y-4">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-check"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                    </div>
                    <div class="flex-grow">
                      <h4 class="text-gray-700 font-medium">Registration</h4>
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-500">4 customers</span>
                        <span class="text-green-600">Complete</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <div class="flex-grow">
                      <h4 class="text-gray-700 font-medium">KYC Verification</h4>
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-500">3 customers</span>
                        <span class="text-blue-600">In progress</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                    </div>
                    <div class="flex-grow">
                      <h4 class="text-gray-700 font-medium">Number Transfer</h4>
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-500">1 customer</span>
                        <span class="text-yellow-600">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Customer Actions -->
            <div class="col-span-2">
              <div class="bg-white rounded-lg shadow">
                <div class="px-5 py-4 border-b border-gray-100">
                  <h3 class="text-lg font-semibold text-gray-700">Customer Actions</h3>
                </div>
                <div class="p-5 space-y-5">
                  <a routerLink="/agent/registration" class="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div class="bg-green-100 rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus text-green-600"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-lg text-gray-800">Register New Customer</h4>
                      <p class="text-gray-600">Create a new customer account with SIM registration</p>
                    </div>
                  </a>
                  
                  <a routerLink="/agent/kyc" class="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div class="bg-blue-100 rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield text-blue-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-lg text-gray-800">Process KYC</h4>
                      <p class="text-gray-600">Verify customer identity and collect KYC documents</p>
                    </div>
                  </a>
                  
                  <a routerLink="/agent/transfer" class="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div class="bg-yellow-100 rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw text-yellow-600"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-lg text-gray-800">Transfer Number</h4>
                      <p class="text-gray-600">Process phone number transfer requests</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Recent Customers -->
            <div class="col-span-2">
              <div class="bg-white rounded-lg shadow">
                <div class="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-700">Recent Customers</h3>
                  <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div class="p-5">
                  <div class="space-y-4">
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div class="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold mr-3">
                        JD
                      </div>
                      <div class="flex-grow">
                        <p class="font-medium text-gray-800">John Doe</p>
                        <p class="text-sm text-gray-600">Registration completed</p>
                      </div>
                      <div class="text-xs text-gray-500">2 hours ago</div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div class="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold mr-3">
                        MS
                      </div>
                      <div class="flex-grow">
                        <p class="font-medium text-gray-800">Mary Smith</p>
                        <p class="text-sm text-gray-600">KYC verification pending</p>
                      </div>
                      <div class="text-xs text-gray-500">3 hours ago</div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div class="h-10 w-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold mr-3">
                        RJ
                      </div>
                      <div class="flex-grow">
                        <p class="font-medium text-gray-800">Robert Johnson</p>
                        <p class="text-sm text-gray-600">Number transfer successful</p>
                      </div>
                      <div class="text-xs text-gray-500">Yesterday</div>
                    </div>
                  </div>
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
export class AgentHomeComponent implements OnInit, AfterViewInit {
  // Agent info properties
  agentName = 'Sarah Johnson';
  agentId = 'AG-2023-458';
  agentInitials = 'SJ';
  
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
      //   this.agentName = user.name;
      //   this.agentId = user.id;
      //   this.agentInitials = this.getInitials(user.name);
      // });
      
      // Mock data for demonstration
      this.agentName = 'Sarah Johnson';
      this.agentId = 'AG-2023-458';
      this.agentInitials = this.getInitials(this.agentName);
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