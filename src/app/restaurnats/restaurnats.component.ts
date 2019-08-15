import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-restaurnats',
  templateUrl: './restaurnats.component.html',
})
export class RestaurnatsComponent implements OnInit {

  model : any = {};
  restaurantModel : any = [];

  location : string = 'Miskolc';

  constructor(private http : HttpClient,
    private cookie: CookieService) { }

  ngOnInit() {
    this.getCurrentLocation();
  }


  getCurrentLocation(){
    let url = environment.apiUrl + '/profile';
    this.http.post<any>(url, {
      token: this.cookie.get('token')
    }).subscribe(res => this.onLocationRecieved(res),
      error => this.handleError(error)); {
    };
  }

  onLocationRecieved(res){
    this.location = JSON.stringify(this.location);
    console.log(this.location);
  }

  handleError(error: any): void {
    console.log("No such location")
  }

  onRestaurantsBySetLocationResponse(res){
    this.restaurantModel = res;
  }

  onUseSetLocationClicked() {
    let url = environment.apiUrl + '/restaurants';
    let params = new HttpParams().set("location", this.location);
    this.http.get(url, { params : params }).subscribe(res => this.onRestaurantsBySetLocationResponse(res),
  error => this.handleError(error)); { };
  }

}
