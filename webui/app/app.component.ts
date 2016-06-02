import { Component, provide } from '@angular/core';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import 'rxjs/Rx'; // load the full rxjs

import { DashboardComponent } from './dashboard/dashboard';
import { InstanceService } from './dashboard/instances.service';
import { InstanceUpdate } from './dashboard/instanceUpdate.service';
import { AuthService } from './dashboard/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS,
      InstanceService,
      AuthService,
      InstanceUpdate
    ]
})
@RouteConfig([
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
    { path: '/instances', name: 'Instances', component: DashboardComponent},
])
export class AppComponent {
  public menuItems = [
   { caption: 'Dashboard', link: ['Dashboard'] },
   { caption: 'Instances', link: ['Instances'] },
 ];
}
