import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthHttp } from '../auth/angular2-oauth';
import { CONFIG } from '../config/dev';

let instancesUrl = CONFIG.baseUrls.api + '/instances';
let instanceUrl = CONFIG.baseUrls.api + '/instance';

export interface Instance {
  id: string;
  machine_name: string;
  cpu: number;
  disk_usage: number;
  processes: string[];
  parsedId: string;
}

@Injectable()
export class InstanceService {

  subscription: any = null;

  constructor(private _authHttp: AuthHttp) {

  }

  query() {
    return this._authHttp.get(instancesUrl)
      .map((response: Response) => this.parseInstances(<Instance[]>response.json()))
      .do(data => console.log(data))
      .catch(this.handleException);
  }

  private parseInstances(instances: Instance[]) {
    instances.forEach((i: Instance) => i.parsedId = this.parseId(i.id));
    return instances;
  }

  private parseId(id: string) {
    let from = -1 !== id.indexOf(':') ? /:/g : /\|/g;
    let to = -1 !== id.indexOf(':') ? '|' : ':';

    return id.replace(from, to);
  }

  get(id: string) {
    let parsed = this.parseId(id);
    console.log(parsed);
    return this._authHttp.get(`${instanceUrl}/${parsed}`)
      .map((response: Response) => <Instance>response.json())
      .do(data => {
        console.log(data);
      })
      .catch(this.handleException);
  }

  handleException(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
