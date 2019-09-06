import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


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
    private router: Router,
    private cookie : CookieService,
    private renderer :Renderer2
  ) { }


  ngOnInit() {
    this.showMessage = false;
    this.activatedRoute.params.subscribe((parameters) => {
      let url = environment.apiUrl + '/restaurant/' + parameters.id;
      this.http.get(url).subscribe(res => this.onLoadMenuResponse(res),
    error => this.handleError(error)); { };
    });
  }

  onAddToCartClicked(id, name, inputEl){
    this.orderedQuantity = inputEl.value;
    this.orderedName = name;
    
    this.renderer.setProperty(inputEl,'value','1');

    let url = environment.apiUrl + '/addToCart';
    this.http.post<any>(url, {
      productId: id,
      token : this.cookie.get('token'),
      quantity : this.orderedQuantity
    }).subscribe(res => this.onAddToCartResponse(),
      error => this.handleError(error)); {
    };
    //this.router.navigate(['order']);
  }

  onAddToCartResponse() {
    this.showMessage = true;
    this. message = this.orderedQuantity + ' of ' + this.orderedName +'(s) added to cart.';
  }

  handleError(error: any): void {
    console.log("not working");
  }

  onLoadMenuResponse(res){
    console.log(res);
    this.restaurant = res.restaurant;
    this.menuItems = res.products;
  }

}


