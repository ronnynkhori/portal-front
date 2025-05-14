import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AgentLayoutComponent } from './layout/agent-layout/agent-layout.component';
import { Component } from '@angular/core';
import { CompleteKycComponent, RegistrationsComponent, ReportsComponent, SimRegistrationComponent, SimTransferComponent } from '@btc/kyc';

// Temporary placeholder component until real ones are created
@Component({
  standalone: true,
  template: '<div class="p-6"><h2 class="text-xl">Coming Soon</h2><p>This section is under development</p></div>'
})
class PlaceholderComponent {}

export const appRoutes: Route[] = [
  // Public customer portal - main route
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'public',
        pathMatch: 'full'
      },
      {
        path: 'public',
        loadChildren: () => import('./pages/public/public.routes').then(m => m.publicRoutes)
      },
      // Other routes commented out for now
      /*
      {
        path: 'kyc-status',
        loadComponent: () => import('./pages/public/kyc-status/kyc-status.component').then(m => m.KycStatusComponent)
      },
      {
        path: 'new-registration',
        loadComponent: () => import('./pages/public/new-registration/new-registration.component').then(m => m.NewRegistrationComponent)
      },
      {
        path: 'add-number',
        loadComponent: () => import('./pages/public/add-number/add-number.component').then(m => m.AddNumberComponent)
      },
      {
        path: 'number-transfer',
        loadComponent: () => import('./pages/public/number-transfer/number-transfer.component').then(m => m.NumberTransferComponent)
      }
      */
    ]
  },
  
  // Admin portal section
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    // If login component doesn't exist yet, use:
    // component: PlaceholderComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      // Use our new AdminHomeComponent for the dashboard
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/admin-home/admin-home.component').then(m => m.AdminHomeComponent)
      },
      {
        path: 'agents',
        component: PlaceholderComponent
      },
      {
        path: 'kyc',
        component: PlaceholderComponent
      },
      {
        path: 'reports',
        component: PlaceholderComponent
      }
    ]
  },
  
  // Agent portal section
  {
    path: 'agent',
    component: AgentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/agent/agent-home/agent-home.component').then(m => m.AgentHomeComponent)
      },
      {
        path: 'kyc',
        component: CompleteKycComponent
      },
      {
        path: 'sim-registration',
        component: SimRegistrationComponent
      },
 
      {
        path: 'sim-transfer',
        component: SimTransferComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'registrations',
        component: RegistrationsComponent
      }
    ]
  },
  
  // Fallback route
  {
    path: '**',
    redirectTo: ''
  }
];
