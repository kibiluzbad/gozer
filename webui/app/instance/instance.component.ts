import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Instance, InstanceService } from '../dashboard/instances.service';
import { AuthService } from '../dashboard/auth.service';

@Component({
  selector: 'instance-form',
  templateUrl: 'app/instance/instance.component.html',
  styleUrls: ['app/instance/instance.component.css']
})
export class InstanceComponent implements OnInit {

  public instance:Instance;

  constructor(private _instanceService:InstanceService,
              private _authService:AuthService,
              private _routeParams:RouteParams){}

  ngOnInit(){
    let id = this._routeParams.get('id');
    this._authService.getToken().subscribe((token:string) => {
      console.log(token);
      this._instanceService.get(id, token).subscribe(value => this.instance = value);
    });
  }

}
