import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  model : any = {}

  constructor(
    private http : HttpClient,
    private router: Router,
    private cookie: CookieService,
    private messageService : MessageService,
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
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
    password: this.model.password}).subscribe(res => this.onSuccessfulLogin(res),
    error => this.handleError(error)); {
  };
}


  onSuccessfulLogin(res){
    this.messageService.hideMessage();
    this.cookie.set('token', res.token),
    this.router.navigate(['home']);
  }

  handleError(error){
    console.log(error);
    this.messageService.showMessage('Invalid username or password!','danger');
  }

}
