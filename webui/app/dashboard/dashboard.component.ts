import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { MdProgressBar } from '@angular2-material/progress-bar/progress-bar';
import { MdProgressCircle } from '@angular2-material/progress-circle/progress-circle';

import { Instance, InstanceService } from '../instance/instances.service';
import { InstanceUpdate } from '../instance/instanceUpdate.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls: ['app/dashboard/dashboard.component.css'],
  directives: [MdProgressBar,MdProgressCircle]
})
export class DashboardComponent implements OnInit {

  instances:Instance[];
  public determinateValue:number = 30;

  constructor(private _router:Router,
              private _instanceService:InstanceService,
              private _updateService:InstanceUpdate) {
  }

  ngOnInit() {
    this._updateService.subscribe((value:Instance) => this.processInstance(value));
    this._instanceService.query().subscribe(values => this.instances = values);
  }

  processInstance(instance:Instance) {
    let item:Instance = null;
    if (!this.instances) return;
    this.instances.forEach(function (i) {
      if (i.id === instance.id)
        item = i;
    });

    if (item) {
      item.cpu = instance.cpu;
      item.disk_usage = instance.disk_usage;
      item.processes = instance.processes;
    } else {
      this.instances.push(instance);
    }
  }

  gotoDetail(instance:Instance) {
    let link = ['Instances', {id: instance.id}];
    this._router.navigate(link);
  }
}
