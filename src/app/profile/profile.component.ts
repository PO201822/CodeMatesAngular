import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';


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
    private cookie: CookieService,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.setProfileFields();
  }

  setProfileFields(){
    this.userService.getUser().subscribe((res: any) => this.onResponseReceived(res),
      (error: any) => this.handleError(error)); {
    };
  }

  handleError(error: any): void {
    this.messageService.showMessage("Profile data can'b be loaded!", "danger");
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

    let url = environment.apiUrl + '/profile';
    this.http.put<any>(url, {
      name: this.username,
      password: this.password,
      email: this.email,
      location: this.location,
      address: this.address
    }).subscribe(res => this.onProfileUpdateResponse(res),
      error => this.handleUpdateError()); {
    };

  }
  onProfileUpdateResponse(res: any): void {
    this.messageService.showMessage("Profile updated successfuly.", "success");
  }

  handleUpdateError() {
    this.messageService.showMessage("Invalid email address! New email address must be unique!", "danger");
  }

  onCancelClicked(){
    this.setProfileFields();
    this.messageService.showMessage("Changes were reverted.","info");
  }

}
