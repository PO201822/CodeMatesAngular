import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'base-angular';

  constructor(
    private cookie: CookieService
  ) { }

  isCookieSet() {
    return this.cookie.get('token').length == 0;
  }
}
