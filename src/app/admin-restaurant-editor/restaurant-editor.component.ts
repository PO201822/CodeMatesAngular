import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-restaurant-editor',
  templateUrl: './restaurant-editor.component.html'
})
export class RestaurantEditorComponent implements OnInit {

  restaurant;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private userService: UserService
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getRestaurant();
  }

  getRestaurant() {

    this.activatedRoute.params.subscribe((parameters) => {
      let url = environment.apiUrl + '/admin/restaurant/' + parameters.id;
      this.http.get(url).subscribe(res => this.setRestaurant(res),
        error => this.errorHandlerService.handleError(error)); { };
    });
  }

  setRestaurant(res) {
    this.restaurant = res;
  }

  updateRestaurant() {
    if (!this.userService.isInputValid([this.restaurant.name,
        this.restaurant.location,
        this.restaurant.description,
        this.restaurant.picture]))
      {
      this.messageService.showMessage("Every input field is required!", "danger");
      return;
    }

    let url = environment.apiUrl + '/admin/updateRestaurant';
    this.http.put<any>(url, {
      id : this.restaurant.id,
      name: this.restaurant.name,
      location: this.restaurant.location,
      description: this.restaurant.description,
      picture: this.restaurant.picture

    }).subscribe(res => this.onUpdateRestaurantResponse(),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

  onUpdateRestaurantResponse(){
    this.messageService.showMessage("Restaurant updated successfuly.", "success");
    this.getRestaurant();
  }

}
