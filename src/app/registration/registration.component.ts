import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SourceListMap } from 'source-list-map';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  model: any = {}
  private showError : boolean = false;
  private errorMessage : string;

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
    this.showError = false;
    this.router.navigate(['']);
  }

  handleError(error) {
    this.showError = true;
    this.errorMessage = "Error"; // TODO
  }

  onBackToLoginClicked() {
    this.router.navigate(['']);
  }
}
