import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  username: string = 'username';
  password: string = 'password';
  email: string = 'email';
  location: string = 'location';
  address: string = 'address';

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    let url = environment.apiUrl + '/profile';
    this.http.post<any>(url, {
      token: this.cookie.get('token')
    }).subscribe(res => this.onResponseReceived(res),
      error => this.handleError(error)); {
    };
  }

  handleError(error: any): void {
    console.log(error);

  }

  onResponseReceived(res) {
    this.username = JSON.stringify(res.name);
    this.password = JSON.stringify(res.password);
    this.email = JSON.stringify(res.email);
    this.location = JSON.stringify(res.location);
    this.address = JSON.stringify(res.address);

  }

}
