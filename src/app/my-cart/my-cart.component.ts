import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
})
export class MyCartComponent implements OnInit {

  dto : any;
  cart: any;


  constructor(private http : HttpClient,
    private cookie: CookieService) { }

  ngOnInit() {
      let url = environment.apiUrl + '/myCart';
      let params = new HttpParams().set("token", this.cookie.get('token'));
      this.http.get(url, { params : params }).subscribe(res => this.onMyCartResponse(res),
    error => this.handleError(error)); { };
  
  }
  onMyCartResponse(res: Object): void {
    this.dto = res;
  }

  handleError(error: any): void {
    console.log('nem lyo');
  }

  onCheckoutCartClicked(currentCart){
    let url = environment.apiUrl + '/checkout';
    this.http.put<any>(url, {
      token : this.cookie.get("token")}).subscribe(res => this.onSuccessfullcheckout(),
      error => this.handleError(error)); {
    };

  }

  onSuccessfullcheckout(){
    this.ngOnInit();
  }

}
