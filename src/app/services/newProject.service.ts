import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NewProjectService {

  constructor(private http: Http) {
    console.log('AdsService Initialized...');
  }

  getAllAds() {
    return this.http.get('http://localhost:8080/api/ads').map(res => res.json());
  }

  newProject(project: Object) {
    var json = JSON.stringify(project);
    console.log(json);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/ads', json, {
      headers: headers
    }).map(res => res.json());
  }

  convertImage(fileToUpload: any) {
    return fileToUpload.toBase64String();
  }
}
