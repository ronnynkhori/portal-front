import { Routes } from '@angular/router';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { SimTransferComponent, ReportsComponent, RegistrationsComponent } from '@btc/shared/kyc';

export const agentRoutes: Routes = [
  {
    path: '',
    component: AgentHomeComponent
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
]; 