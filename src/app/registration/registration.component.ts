import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { ErrorHandlerService } from '../services/error-handler.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  name: string = '';
  password: string = '';
  email: string = '';
  location: string = '';
  address: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService,
    private errorHandlerService : ErrorHandlerService
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
  }

  onSubmitRegistrationClicked() {
    if (!this.userService.isInputValid([this.name, this.password, this.email, this.location, this.address])) {
      this.messageService.showMessage("Every input field is required!", "danger");
      return;
    }

    let url = environment.apiUrl + '/register';
    this.http.post<any>(url, {
      name: this.name,
      email: this.email,
      password: this.password,
      location: this.location,
      address: this.address
    }).subscribe(res => this.router.navigate(['']),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

  onBackToLoginClicked() {
    this.router.navigate(['']);
  }
  
}
