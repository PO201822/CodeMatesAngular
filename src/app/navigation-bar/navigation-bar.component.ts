import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent implements OnInit {


  constructor(
    private http: HttpClient,
    private cookie: CookieService
    ) { }

  ngOnInit() {
  }

  onProfileClicked() {
    let url = environment.apiUrl + '/profile';
    this.http.post<any>(url, {
      token: this.cookie.get('token')
    }).subscribe(res => this.onResponseReceived(res),
      error => this.handleError(error)); {
    };
  }

  onResponseReceived(res) {
    console.log(this.cookie.get('token'));
  }

  onLogoutClicked() {
  }

  handleError(error) {
  }

  onSuccessfulProfile() {

  }
}
