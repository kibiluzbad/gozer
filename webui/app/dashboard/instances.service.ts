import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CONFIG } from '../config/dev';

let instancesUrl = CONFIG.baseUrls.api + '/instances';
let instanceUrl = CONFIG.baseUrls.api + '/instance/:id';

export interface Instance {
  id: string;
  machine_name: string;
  cpu: number;
  disk_usage: number;
  processes: string[];
}

@Injectable()
export class InstanceService {

  subscription:any = null;

  constructor(private _http: Http) {}

  query(token: string){
    return this._http.get(instancesUrl, new RequestOptions({headers: new Headers({'Authorization':'Bearer ' + token})}))
      .map((response: Response) => <Instance[]>response.json())
      .do(data => console.log(data))
      .catch(this.handleException);

  }

  handleException(error: any){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
