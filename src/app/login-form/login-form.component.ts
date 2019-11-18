import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  model : any = {}
  user: SocialUser;


  constructor(
    private http : HttpClient,
    private router: Router,
    private cookie: CookieService,
    private messageService : MessageService,
    private errorHandlerService : ErrorHandlerService,
    private spinner : NgxSpinnerService,
    private authService : AuthService,
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    if(this.cookie.get('token').length != 0){
      this.router.navigate(['home']);
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });    
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => this.sendGoogleUserInfo(res));
  }

  sendGoogleUserInfo(user){
    this.spinner.show();
    let url = environment.apiUrl + '/auth/googlesignin';
    this.http.post<any>(url, {
      email : user.email,
      id : user.id
  }).subscribe(res => this.onSuccessfullLoginResponse(res),
      error => this.errorHandlerService.handleError(error)); {
    };

  }

  onSuccessfullLoginResponse(res){
    this.spinner.show();
    let url = environment.apiUrl + '/auth/signin';
    this.http.post<any>(url, {
      name: res.name,
      password: res.password}).subscribe(res => this.onSuccessfulLogin(res),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

  onRegisterClicked(){
    this.router.navigate(['registration']);
  }

  onSubmit() {
    this.spinner.show();
    let url = environment.apiUrl + '/auth/signin';
    this.http.post<any>(url, {
      name: this.model.username,
      password: this.model.password}).subscribe(res => this.onSuccessfulLogin(res),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

  onSuccessfulLogin(res){
    this.messageService.hideMessage();
    this.cookie.set('token', res.token);
    this.spinner.hide();
    this.router.navigate(['home']);
  }

}
