import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-admin-restaurant-addition',
  templateUrl: './admin-restaurant-addition.component.html'
})

export class AdminRestaurantAdditionComponent implements OnInit {
  name: string = 'name';
  picture: string = 'picture';
  location: string = 'location';
  description: string = 'description';

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private userService: UserService,
    private messageService: MessageService,
    private errorHandlerService : ErrorHandlerService
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
  }

  onUpdateClicked() {
    if (!this.userService.isInputValid([this.description, this.name, this.picture, this.location])) {
      this.messageService.showMessage("Every input field is required!", "danger");
      return;
    }

    let url = environment.apiUrl + '/admin/addRestaurant';
    this.http.post<any>(url, {
      name: this.name,
      picture: this.picture,
      location: this.location,
      description: this.description
    }).subscribe(res => this.messageService.showMessage("Restaurant successfuly added.", "success"),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

}

