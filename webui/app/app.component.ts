import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import 'rxjs/Rx'; // load the full rxjs
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar'

import { DashboardComponent } from './dashboard/dashboard';
import { InstanceComponent } from './instance/instance';
import { InstanceService } from './dashboard/instances.service';
import { InstanceUpdate } from './dashboard/instanceUpdate.service';
import { AuthService } from './dashboard/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES],
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
    { path: '/instance/:id', name: 'Instances', component: InstanceComponent},
])
export class AppComponent {
  public menuItems = [
   { caption: 'Dashboard', link: ['Dashboard'] },
   { caption: 'Instances', link: ['Instances'] },
 ];
}
