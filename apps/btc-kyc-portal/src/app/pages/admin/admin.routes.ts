import { Route } from '@angular/router';

export const adminRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./admin-home/admin-home.component').then(m => m.AdminHomeComponent)
  }
]; 