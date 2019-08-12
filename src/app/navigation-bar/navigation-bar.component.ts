import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onProfileClicked() {
    let url = environment.apiUrl + '/auth/signin';
    this.http.get<any>(url, {
      name: this.model.username
    }).subscribe(res => this.onSuccessfulProfile(),
      error => this.handleError(error)); {
    };
  }

  onLogoutClicked() {

  }

  handleError(error) {

  }

  onSuccessfulProfile() {

  }
}
