import {Component, ViewChild} from '@angular/core';
import {AdsService} from '../services/ads.service';
import {Router, ActivatedRoute, Route} from '@angular/router';
import {UploadService} from "../services/upload.service";
import {PushPadService} from "../services/pushPad.service";
import {NewProjectService} from "../services/newProject.service";

@Component({
  selector: 'app-root',
  templateUrl: '../templates/add.component.html',
  providers: [AdsService, UploadService, PushPadService, NewProjectService]
})

export class AdsComponent {

  private base64textString: String = '';

  constructor(private adsService: AdsService,
              private uploadService: UploadService,
              private pushPadService: PushPadService,
              private newProjectService: NewProjectService,
              private router: Router) {
  }

  @ViewChild('fileInput') fileInput;
  @ViewChild('icon') icon;

  private ads: Ads;
  private body: Body;
  private notification: Notification;
  private project: Project;

  addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.uploadService.uploadImage(fileToUpload).subscribe(res => {
        console.log(res);
      });
    }
  }

  newProject(): void {
    let fi = this.icon.nativeElement;
    if (fi.files && fi.files[0]) {
      let icon = fi.files[0];
      var reader = new FileReader();
      // console.log(icon.getName());
      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(icon);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }

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

interface Project {
  sender_id: number;
  name: String;
  website: String;
  icon_data: String;
}
