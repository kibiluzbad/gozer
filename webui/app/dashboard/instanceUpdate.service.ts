import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { CONFIG } from '../config/dev';
import { Instance } from './instances.service';

let url = CONFIG.baseUrls.ws;

@Injectable()
export class InstanceUpdate extends Subject<Instance>{
  private _ws:any;


  constructor() {
    super();
    let me:any = this;
    this._ws = new WebSocket(url);
    this._ws.onopen=this.open;
    this._ws.onclose=this.close;
    this._ws.onmessage=(m:any) => {
      var json = JSON.parse(m.data);
      var value = json.new_val;

      me.emit(value);
    };
  }

  open() {
    console.log('Online')
    //TODO: Emit open
  }

  close() {
    console.log('Offline')
    //TODO: Emit close
  }

  emit(message:Instance){
    console.log('Message emitted');
    super.next(message);
  }
}
