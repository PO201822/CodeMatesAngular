import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent implements OnInit {

  private role : any;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private messageService : MessageService,
    private errorHandlerService : ErrorHandlerService
    ) { }

  ngOnInit() {
    this.getUserRole();
  }

  onLogoutClicked() {
    this.cookie.deleteAll();
    this.messageService.hideMessage();
  }

  getUserRole(){
    let url = environment.apiUrl + '/getRole';
    this.http.get(url).subscribe(res => this.setRole(res),
      error => this.errorHandlerService.handleError(error)); { };
  }

  setRole(res) {
    this.role = res.role;
  }

}

