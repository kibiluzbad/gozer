import { Component, OnInit } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';

import { Instance, InstanceService } from '../dashboard/instances.service';
import { AuthService } from '../dashboard/auth.service';

@Component({
  selector: 'instance-form',
  templateUrl: 'app/instance/instance.component.html',
  styleUrls: ['app/instance/instance.component.css']
})
export class InstanceComponent implements OnInit {
  private _id:string;
  public instance:Instance;

  constructor(
              private _instanceService:InstanceService,
              private _authService:AuthService,
              private _routeParams:RouteParams) {
  }

  ngOnInit() {
    this._id = this._routeParams.get('id');
    this._authService.getToken().subscribe((token:string) => {
      console.log(token);
      this._instanceService.get(this._id, token).subscribe(value => this.instance = value);
    });
  }

  back() {
    window.history.back();
  }

}
