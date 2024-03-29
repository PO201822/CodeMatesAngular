import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import { CartService } from '../services/cart.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
})
export class MyCartComponent implements OnInit {

  cartItems: any = null;
  totalPrice: number = 0;
  public payPalConfig?: IPayPalConfig;
  paypalItems : any[] = [];


  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cartService: CartService,
    private errorHandlerService: ErrorHandlerService,
    private zone: NgZone,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getMyCart();
    Promise.resolve(null).then(() => this.messageService.hideMessage());
  }

  setPayPalItems(){
    this.paypalItems=[];
    for(var key in this.cartItems){
      let cartItem = this.cartItems[key];
      this.paypalItems.push({
        name: cartItem.product.name,
        quantity: cartItem.quantity,
        category: 'DIGITAL_GOODS',
        unit_amount: {
          currency_code: 'HUF',
          value: cartItem.price,
        }
       })
    }
    this.initConfig();
  }

  getMyCart() {
    let url = environment.apiUrl + '/myCart';
    this.http.get(url).subscribe(res => this.onMyCartResponse(res),
      error => this.errorHandlerService.handleError(error)); { };
  }

  onMyCartResponse(res) {
    this.spinner.hide();
    this.cartItems = res;
    if (this.cartItems == null) {
      this.messageService.showMessage("Your cart is empty!", "info");
    }
    else {
      this.totalPrice = this.cartService.calculateTotalPrice(this.cartItems);
      this.setPayPalItems();
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

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AZb5NI5Fx1NxkxLZi1AiNj6srcBQSCk1CKWv7A7j0jxxBEWwau4mmS5ny_ELpruvh3-GlFtfmdo_G4PN',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'HUF',
              value: String(this.totalPrice),
              breakdown: {
                item_total: {
                  currency_code: 'HUF',
                  value: String(this.totalPrice),
                }
              }
            },
            items: this.paypalItems
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
        this.spinner.show();
      },
      onClientAuthorization: (data) => {
        this.zone.run(() => {
          this.spinner.hide();
          this.onCheckoutCartClicked();
        });
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

}
