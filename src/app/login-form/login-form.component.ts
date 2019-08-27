import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  model : any = {}
  private isValidLogin : boolean = true;

  constructor(
    private http : HttpClient,
    private router: Router,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    if(this.cookie.get('token').length != 0){
      this.router.navigate(['home']);
    } 
    
}

onRegisterClicked(){
  this.router.navigate(['registration']);
}

onSubmit() {
  let url = environment.apiUrl + '/auth/signin';
  this.http.post<any>(url, {
    name: this.model.username,
    password: this.model.password
  }).subscribe(res => this.onSuccessfulLogin(res),
    error => this.handleError(error)); {
  };
}


  onSuccessfulLogin(res){
    this.isValidLogin = true;
    this.cookie.set('token', JSON.stringify(res.token)),
    this.router.navigate(['home']);
  }

  handleError(error){
    this.isValidLogin = false;
  }

}
