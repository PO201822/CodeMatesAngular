import { Component, OnInit, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';


@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html'
})
export class RestaurantMenuComponent implements OnInit {
  message: string = 'Cart Updated.';
  showMessage: boolean;
  orderedQuantity: string;
  orderedName: string;
  restaurant : any = {};

  menuItems : any[] = [];
  
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private renderer :Renderer2,
    private errorHandlerService : ErrorHandlerService
  ) { }

  ngOnInit() {
    this.showMessage = false;
    this.activatedRoute.params.subscribe((parameters) => {
      let url = environment.apiUrl + '/restaurant/' + parameters.id;
      this.http.get(url).subscribe(res => this.onLoadMenuResponse(res),
    error => this.errorHandlerService.handleError(error)); { };
    });
  }

  onAddToCartClicked(id, name, inputEl){
    this.orderedQuantity = inputEl.value;
    this.orderedName = name;
    
    this.renderer.setProperty(inputEl,'value','1');

    let url = environment.apiUrl + '/addToCart';
    this.http.post<any>(url, {
      productId: id,
      quantity : this.orderedQuantity
    }).subscribe(res => this.onAddToCartResponse(),
      error => this.errorHandlerService.handleError(error)); {
    };
  }

  onAddToCartResponse() {
    this.showMessage = true;
    this. message = this.orderedQuantity + ' of ' + this.orderedName +'(s) added to cart.';
  }

  onLoadMenuResponse(res){
    console.log(res);
    this.restaurant = res.restaurant;
    this.menuItems = res.products;
  }

}


