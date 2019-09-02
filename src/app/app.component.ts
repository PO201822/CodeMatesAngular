import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MessageService]
})

export class AppComponent {

  title = 'base-angular';

  constructor(
    private cookie: CookieService,
    private messageService : MessageService
  ) { }

  isCookieSet() {
    return this.cookie.get('token').length == 0;
  }
}
