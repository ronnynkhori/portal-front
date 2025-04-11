import { Route } from '@angular/router';

export const agentRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./agent-home/agent-home.component').then(m => m.AgentHomeComponent)
  }
]; 