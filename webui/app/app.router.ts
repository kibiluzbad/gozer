import { provideRouter, RouterConfig } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { InstanceComponent  } from './instance/instance';

export const routes: RouterConfig = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'instance/:id', component: InstanceComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
