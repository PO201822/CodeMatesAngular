import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { ErrorHandlerService } from '../services/error-handler.service';


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
    private userService: UserService,
    private messageService: MessageService,
    private errorHandlerService : ErrorHandlerService
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getProfile();
  }

  getProfile(){
    let url = environment.apiUrl + '/getProfile';
    this.http.get<any>(url).subscribe((res: any) => this.onResponseReceived(res),
      (error: any) => this.errorHandlerService.handleError(error)); {
    };
  }

  onResponseReceived(res) {
    this.username = res.name;
    this.password = res.password;
    this.email = res.email;
    this.location = res.location;
    this.address = res.address;
  }

  onUpdateClicked() {
    if (!this.userService.isInputValid([this.address, this.password, this.email, this.location])) {
      this.messageService.showMessage("Every input field is required!", "danger");
      return;
    }

    let url = environment.apiUrl + '/updateProfile';
    this.http.put<any>(url, {
      name: this.username,
      password: this.password,
      email: this.email,
      location: this.location,
      address: this.address
    }).subscribe(res => this.messageService.showMessage("Profile updated successfuly.", "success"),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

  onCancelClicked(){
    this.getProfile();
    this.messageService.showMessage("Changes were reverted.","info");
  }

}
