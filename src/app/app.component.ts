import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './services/message.service';
import { ErrorHandlerService } from './services/error-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MessageService, ErrorHandlerService]
})

export class AppComponent {

  title = 'base-angular';

  constructor(
    private cookie: CookieService,
    private messageService : MessageService,
    private errorHandlerService : ErrorHandlerService,
  ) { }

  isCookieSet() {
    return this.cookie.get('token').length == 0;
  }

}