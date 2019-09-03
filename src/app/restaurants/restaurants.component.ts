import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
})
export class RestaurantsComponent implements OnInit {

  model: any = {};
  restaurants: any = [];
  location: string = '';

  constructor(private http: HttpClient,
    private cookie: CookieService,
    private messageService: MessageService) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getCurrentLocation();
  }


  getCurrentLocation() {
    let url = environment.apiUrl + '/profile';
    this.http.post<any>(url, {
      token: this.cookie.get('token')
    }).subscribe(res => this.onLocationRecieved(res),
      error => this.handleError(error)); {
    };
  }

  onLocationRecieved(res) {
    this.location = res.location;
  }

  handleError(error: any): void {
    console.log("No such location")
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
      error => this.handleError(error)); { };
  }

}
