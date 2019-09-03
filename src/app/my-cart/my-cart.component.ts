import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
})
export class MyCartComponent implements OnInit {

  cart: any = null;


  constructor(private http: HttpClient,
    private cookie: CookieService,
    private messageService: MessageService) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getMyCart();
  }

  getMyCart() {
    let url = environment.apiUrl + '/myCart';
    let params = new HttpParams().set("token", this.cookie.get('token'));
    this.http.get(url, { params: params }).subscribe(res => this.onMyCartResponse(res),
      error => this.handleError(error)); { };
  }

  onMyCartResponse(res) {
    this.cart = res;
    if (this.cart == null){
      this.messageService.showMessage("Your cart is empty!","info");
    }
  }

  handleError(error: any): void {
    console.log('nem lyo');
  }

  onCheckoutCartClicked(currentCart) {
    let url = environment.apiUrl + '/checkout';
    this.http.put<any>(url, {
      token: this.cookie.get("token")
    }).subscribe(res => this.onSuccessfullcheckout(),
      error => this.handleError(error)); {
    };

  }

  onSuccessfullcheckout() {
    this.cart = null;
    this.messageService.showMessage("Thank you for your order! " +
      "You have nothing left to do, be patient until the delivery is complete.",
      "success");
  }

}
