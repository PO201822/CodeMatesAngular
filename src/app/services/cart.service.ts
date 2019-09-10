import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  calculateCartItemQuantity(quantity, mathOperator){
    let result = quantity;
    if(mathOperator == '+'){
      result++;
    }
    else{
      result--;
    }
    return result;
  }

  calculateTotalPrice(cartItems){
    let totalPrice=0;
    cartItems.forEach(element => {
      totalPrice+= element.product.price * element.quantity;
    });
    return totalPrice;
  }

}
