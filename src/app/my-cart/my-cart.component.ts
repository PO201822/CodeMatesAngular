import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import { CartService } from '../services/cart.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
})
export class MyCartComponent implements OnInit {

  cartItems: any = null;
  totalPrice: number = 0;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cartService: CartService,
    private errorHandlerService : ErrorHandlerService
    ) { }

  ngOnInit() {
    Promise.resolve(null).then(() => this.messageService.hideMessage());
    this.getMyCart();
  }

  getMyCart() {
    let url = environment.apiUrl + '/myCart';
    this.http.get(url).subscribe(res => this.onMyCartResponse(res),
      error => this.errorHandlerService.handleError(error)); { };
  }

  onMyCartResponse(res) {
    this.cartItems = res;
    if (this.cartItems == null) {
      this.messageService.showMessage("Your cart is empty!", "info");
    }
    else {
      this.totalPrice = this.cartService.calculateTotalPrice(this.cartItems);
    }
  }

  onCheckoutCartClicked() {
    let url = environment.apiUrl + '/checkout';
    this.http.put<any>(url, null).subscribe(res => this.onSuccessfullcheckout(),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

  onSuccessfullcheckout() {
    this.cartItems = null;
    this.messageService.showMessage("Thank you for your order! " +
      "You have nothing left to do, be patient until the delivery is complete.",
      "success");
  }

  onDeleteItemClicked(productId) {
    let url = environment.apiUrl + '/deleteItem';
    let params = new HttpParams().set("productId", productId);
    this.http.delete(url, { params: params }).subscribe(res => this.getMyCart(),
      error => this.errorHandlerService.handleError(error)); { };
  }

  updateQuantity(cartItemId, mathOperator, quantityInput) {
    this.messageService.hideMessage();

    let quantity = this.cartService.calculateCartItemQuantity(quantityInput, mathOperator);
    if (quantity > 10 || quantity < 1) {
      this.messageService.showMessage("Quantity must be between 1 and 10!", "danger");
      return;
    }

    let url = environment.apiUrl + '/updateCartItemQuantity';
    this.http.put<any>(url, {
      cartItemId: cartItemId,
      quantity: quantity
    }).subscribe(res => this.getMyCart(),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

}
