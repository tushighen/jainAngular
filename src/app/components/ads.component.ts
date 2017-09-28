import {Component} from '@angular/core';
import {AdsService} from '../services/ads.service';
import {Router, ActivatedRoute, Route} from '@angular/router';

@Component({
  selector: 'ads',
  templateUrl: '../templates/add.component.html',
  providers: [AdsService]
})

export class AdsComponent {

  constructor(private adsService: AdsService,
              private router: Router){
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
