import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {

  constructor(private http: Http) {
    console.log('AdsService Initialized...');
  }

  uploadImage(fileToUpload: any) {
    let input = new FormData();
    input.append('file', fileToUpload);
    return this.http.post('http://localhost:8080/api/upload', input)
      .map(res => res.text());
  }
}
