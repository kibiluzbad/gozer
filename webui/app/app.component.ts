import { Component, provide } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import 'rxjs/Rx'; // load the full rxjs
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import {AuthHttp, AuthConfig } from './auth/angular2-oauth';

import { DashboardComponent } from './dashboard/dashboard';
import { InstanceComponent } from './instance/instance';
import { InstanceService } from './instance/instances.service';
import { InstanceUpdate } from './instance/instanceUpdate.service';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES],
    providers: [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS,
      provide(AuthHttp, {
        useFactory: ( http:any) => {
          return new AuthHttp(new AuthConfig({
            tokenGetter: () => new AuthService(http).getToken(),
            globalHeaders: [{'Content-Type':'application/json'}],
            noJwtError: true,
            noTokenScheme: false
          }), http);
        },
        deps: [Http]
      }),
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
   { caption: 'Dashboard', link: ['Dashboard'] }
 ];
}
