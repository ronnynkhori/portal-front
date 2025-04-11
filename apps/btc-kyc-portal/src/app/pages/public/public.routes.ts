import { Route } from '@angular/router';


export const publicRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./public-home/public-home.component').then(m => m.PublicHomeComponent)
  },
  {
    path: 'complete-kyc',
    loadComponent: () => import('./complete-kyc/complete-kyc.component').then(m => m.CompleteKycComponent)
  },
  {
    path: 'sim-registration',
    loadComponent: () => import('./public-home/public-home.component').then(m => m.PublicHomeComponent)
    // Will be replaced with actual component when developed
  },
  {
    path: 'number-transfer',
    loadComponent: () => import('./public-home/public-home.component').then(m => m.PublicHomeComponent)
    // Will be replaced with actual component when developed
  },
  {
    path: 'kyc-status',
    loadComponent: () => import('./public-home/public-home.component').then(m => m.PublicHomeComponent)
    // Will be replaced with actual component when developed
  },
  {
    path: 'add-number',
    loadComponent: () => import('./public-home/public-home.component').then(m => m.PublicHomeComponent)
    // Will be replaced with actual component when developed
  }
]; 