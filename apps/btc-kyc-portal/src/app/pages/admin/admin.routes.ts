import { Route } from '@angular/router';

export const adminRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../../layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'analytics', loadComponent: () => import('./analytics/analytics.component').then(m => m.AnalyticsComponent) },
      { path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
      { path: 'agents', loadComponent: () => import('./agents/agents.component').then(m => m.AgentsComponent) },
      { path: 'kyc', loadComponent: () => import('./kyc/kyc.component').then(m => m.KycComponent) },
      { path: 'reports', loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent) },
      { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
    ]
  }
]; 