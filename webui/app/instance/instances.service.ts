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
}

@Injectable()
export class InstanceService {

  subscription: any = null;

  constructor(private _authHttp: AuthHttp) {

  }

  query() {
    return this._authHttp.get(instancesUrl)
      .map((response: Response) => <Instance[]>response.json())
      .do(data => console.log(data))
      .catch(this.handleException);
  }

  get(id: string) {

    return this._authHttp.get(`${instanceUrl}/${id}`)
      .map((response:Response) => <Instance>response.json())
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
