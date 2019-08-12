import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  model: any = {}

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {

  }
  onRegisterClicked() {
    this.router.navigate(['registration']);
  }

  onSubmit() {
    let url = environment.apiUrl + '/auth/signin';
    this.http.post<any>(url, {
      name: this.model.username,
      password: this.model.password
    }).subscribe(res => this.onSuccessfulLogin(),
      error => this.handleError(error)); {
    };
  }

  onSuccessfulLogin() {
    this.router.navigate(['home']);

  }

  handleError(error) {


  }

}
