import { Route } from '@angular/router';
import { CompleteKycComponent } from '@btc/kyc';
import { SimRegistrationComponent } from '@btc/kyc';


export const publicRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./public-home/public-home.component').then(m => m.PublicHomeComponent)
  },
  {
    path: 'complete-kyc',
    component: CompleteKycComponent
  },
  {
    path: 'sim-registration',
    component: SimRegistrationComponent
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