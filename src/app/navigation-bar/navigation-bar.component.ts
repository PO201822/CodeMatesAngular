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

  onLogoutClicked() {
    this.cookie.deleteAll();
  }

  handleError(error) {
  }

  onSuccessfulProfile() {

  }
}
