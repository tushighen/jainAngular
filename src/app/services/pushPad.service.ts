import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PushPadService {

  constructor(private http: Http) {
    console.log('AdsService Initialized...');
  }

  getAllAds() {
    return this.http.get('https://pushpad.xyz/notifications/11875992').map(res => res.json());
  }

  sendNotif(notif: Object) {
    var json = JSON.stringify(notif);
    var token = 'bc400781ac9ee93d3e8f05f3ec721885';
    console.log(json);
    var headers = new Headers();
    headers.append('Authorization', 'Token token="' + token + '"');
    headers.append('Content-Type', 'application/json;charset=utf-8');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    console.log(token);
    return this.http.post('https://pushpad.xyz/projects/4505/notifications', json, {
      headers: headers
    }).map(res => res.json());
  }
}
