import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

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
    private messageService : MessageService,
    private userService : UserService
  ) { }

  isCookieSet() {
    return this.cookie.get('token').length == 0;
  }

  getRole(){
    return this.userService.getUserRole();
  }
}
