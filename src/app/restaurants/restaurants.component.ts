import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service';
import { ErrorHandlerService } from '../services/error-handler.service';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
})
export class RestaurantsComponent implements OnInit {

  model: any = {};
  restaurants: any = [];
  location: string = '';

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private messageService: MessageService,
    private errorHandlerService : ErrorHandlerService
    ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    let url = environment.apiUrl + '/getLocation';
    this.http.get<any>(url).subscribe(res => this.onLocationRecieved(res),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

  onLocationRecieved(res) {
    this.location = res.location;
    this.onSearchByLocationClicked();
  }

  onSearchByLocationResponse(res) {
    this.restaurants = res;
    if (this.restaurants.length == 0) {
      this.messageService.showMessage("No restaurants located at '" + this.location + "'.", "info");
    }
    else{
      this.messageService.hideMessage();
    }
  }

  onSearchByLocationClicked() {
    let url = environment.apiUrl + '/restaurants';
    let params = new HttpParams().set("location", this.location);
    this.http.get(url, { params: params }).subscribe(res => this.onSearchByLocationResponse(res),
      error => this.errorHandlerService.handleError(error)); { };
  }

}
