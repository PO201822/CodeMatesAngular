import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent implements OnInit {


  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private messageService : MessageService
    ) { }

  ngOnInit() {
  }

  onLogoutClicked() {
    this.cookie.deleteAll();
    this.messageService.hideMessage();
  }

  handleError(error) {
  }

  onSuccessfulProfile() {

  }
}
