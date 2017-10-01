import {Component, ViewChild} from '@angular/core';
import {AdsService} from '../services/ads.service';
import {Router, ActivatedRoute, Route} from '@angular/router';
import {UploadService} from "../services/upload.service";

@Component({
  selector: 'app-root',
  templateUrl: '../templates/add.component.html',
  providers: [AdsService, UploadService]
})

export class AdsComponent {

  constructor(private adsService: AdsService,
              private uploadService: UploadService,
              private router: Router) {
  }

  @ViewChild('fileInput') fileInput;

  addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.uploadService.uploadImage(fileToUpload).subscribe(res => {
        console.log(res);
      });
    }
  }

  private ads: Ads;

  add(title: String, text: String, imageLink: String) {
    this.ads = {
      title: title,
      text: text,
      imageLink: imageLink
    };
    console.log(this.ads);
    this.adsService.insertAds(this.ads).subscribe(msg => {
      console.log(msg);
    });
  }
}

interface Ads {
  title: String;
  text: String;
  imageLink: String;
}
