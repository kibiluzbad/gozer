import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Instance, InstanceService } from './instances.service';

@Component({
  selector: 'instance-form',
  templateUrl: 'app/instance/instance.component.html',
  styleUrls: ['app/instance/instance.component.css']
})
export class InstanceComponent implements OnInit {
  private _id: string;
  public instance: Instance;

  constructor(private _instanceService: InstanceService,
              private _routeParams: RouteParams) {
  }

  ngOnInit() {
    this._id = this._routeParams.get('id');
    this._instanceService.get(this._id).subscribe(value => this.instance = value);
  }

  back() {
    window.history.back();
  }

}
