import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CONFIG } from '../config/dev';

let tokenUrl = CONFIG.baseUrls.token + '/token';
let clientId = CONFIG.baseUrls.clientId;
let clientSecret = CONFIG.baseUrls.clientSecret;

@Injectable()
export class AuthService {

  constructor(private _http: Http) {

  }

  getToken(){

    let body = JSON.stringify({'client_id': clientId, 'client_secret': clientSecret});
    console.log(this);
    return this._http.post(tokenUrl,body)
      .map(res => res.json().access_token)
      .catch(this.handleException)
  }

  handleException(error: any){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
