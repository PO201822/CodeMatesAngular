import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  restaurants: any;
  restaurantCount = 0;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private userService: UserService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    let url = environment.apiUrl + '/admin/listAllRestaurants';
    this.http.get<any>(url)
      .subscribe(res => this.setRestaurants(res),
        error => this.errorHandlerService.handleError(error)); {
    };
  }

  setRestaurants(res) {
    this.restaurants = res;
    this.restaurantCount = res.length + 1;
  }

  removeRestaurant(id) {
    let url = environment.apiUrl + '/admin/removeRestaurant';
    let params = new HttpParams().set('id',id);
    this.http.delete(url, {params:params}).subscribe(res => this.getAllRestaurants(),
      error => this.errorHandlerService.handleError(error)); { };
  }

  // onDeleteItemClicked(productId) {
  //   let url = environment.apiUrl + '/deleteItem';
  //   let params = new HttpParams().set("productId", productId);
  //   this.http.delete(url, { params: params }).subscribe(res => this.getMyCart(),
  //     error => this.errorHandlerService.handleError(error)); { };
  // }

  createRestaurant() {
    if (!this.userService.isInputValid([this.name, this.location])) {
      this.messageService.showMessage("Every input field is required!", "danger");
      return;
    }

    let url = environment.apiUrl + '/admin/addRestaurant';
    this.http.post<any>(url, {
      name: this.name,
      picture: this.picture,
      location: this.location,
      description: this.description
    }).subscribe(res => this.getAllRestaurants(),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

}

