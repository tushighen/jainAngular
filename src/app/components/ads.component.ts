import {Component, ViewChild} from '@angular/core';
import {AdsService} from '../services/ads.service';
import {Router, ActivatedRoute, Route} from '@angular/router';
import {UploadService} from "../services/upload.service";
import {PushPadService} from "../services/pushPad.service";

@Component({
  selector: 'app-root',
  templateUrl: '../templates/add.component.html',
  providers: [AdsService, UploadService, PushPadService]
})

export class AdsComponent {

  constructor(private adsService: AdsService,
              private uploadService: UploadService,
              private pushPadService: PushPadService,
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
  private body: Body;
  private notification: Notification;

  add(title: String, text: String, imageLink: String) {
    this.ads = {
      title: title,
      text: text,
      imageLink: imageLink
    };

    this.body = {
      body: text,
      title: title,
      target_url: 'https://www.facebook.com',
      icon_url: '',
      image_url: '',
      ttl: 600,
      require_interaction: true,
      custom_data: '',
      starred: false
    };

    this.notification = {
      notification: this.body
    };

    console.log(this.ads);
    console.log(this.notification);
    // console.log(this.body);
    this.adsService.insertAds(this.ads).subscribe(msg => {
      console.log(msg);
    });
    this.pushPadService.sendNotif(this.notification).subscribe(msg => {
      console.log(msg);
    });
    this.pushPadService.getAllAds();
  }
}

interface Ads {
  title: String;
  text: String;
  imageLink: String;
}

interface Body {
  body: String;
  title: String;
  target_url: String;
  icon_url: String;
  image_url: String;
  ttl: number;
  require_interaction: boolean;
  custom_data: String;
  starred: boolean;
}

interface Notification {
  notification: Body;
}
