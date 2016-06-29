import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Instance, InstanceService } from './instances.service';

@Component({
  selector: 'instance-form',
  templateUrl: 'app/instance/instance.component.html',
  styleUrls: ['app/instance/instance.component.css']
})
export class InstanceComponent implements OnInit {
  private _id: string;
  public instance: Instance;
  private sub: any;

  constructor(private _instanceService: InstanceService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
     this._id = decodeURI(params['id']);

     this._instanceService.get(this._id).subscribe(value => this.instance = value);
   });
  }

  back() {
    window.history.back();
  }

}
