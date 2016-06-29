import { Component, provide } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import 'rxjs/Rx'; // load the full rxjs

import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';

import { AuthHttp, AuthConfig } from './auth/angular2-oauth';

import { InstanceService,
         InstanceUpdate } from './instance/instance';

import { AuthService } from './auth/auth';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES],
    providers: [
      HTTP_PROVIDERS,
      provide(AuthHttp, {
        useFactory: ( http: any, authService: any ) => {
          return new AuthHttp(new AuthConfig({
            tokenGetter: () => authService.getToken(),
            globalHeaders: [{'Content-Type': 'application/json'}],
            noJwtError: true,
            noTokenScheme: false
          }), http);
        },
        deps: [Http, AuthService]
      }),
      InstanceService,
      AuthService,
      InstanceUpdate
    ]
})
export class AppComponent {
  public menuItems = [
   { caption: 'Dashboard', link: ['/dashboard'] }
 ];
}
