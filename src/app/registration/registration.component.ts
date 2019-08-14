import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  model: any = {}


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitRegistrationClicked() {
    let url = environment.apiUrl + '/register';
    this.http.post<any>(url, {
      name: this.model.name,
      email: this.model.email,
      password: this.model.password,
      location: this.model.location,
      address: this.model.address
    }).subscribe(res => this.onSuccessRegistration(),
      error => this.handleError(error)); {
    };
  }

  onSuccessRegistration() {
    this.router.navigate(['']);
  }

  handleError(error) {
    console.log("handleError");

  }

  onBackToLoginClicked() {
    this.router.navigate(['']);
  }
}
