import { Component } from '@angular/core';
import { FileDropModule } from 'ngx-file-drop/lib/ngx-drop';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li><a routerLink = "/">Home</a></li>
      <li><a routerLink = "/login">About</a></li>
    </ul>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Good Evening';
}
