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

  private role : any;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private messageService : MessageService
    ) { }

  ngOnInit() {
    this.getUserRole();
  }


  onLogoutClicked() {
    this.cookie.deleteAll();
    this.messageService.hideMessage();
  }


  getUserRole(){
    let url = environment.apiUrl + '/getrole';
    this.http.post(url, null).subscribe(res => this.onGetRoleResponse(res),
      error => this.handleError(error)); { };
  }
  onGetRoleResponse(res : any) {
    this.role = res.role;
  }
  handleError(error : any) {
    console.log(error);
  }
}

