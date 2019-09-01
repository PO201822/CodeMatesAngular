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

  arr : any[] = [];
  
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

  onOrderClicked(id, name, inputEl){
    const orderedQuantity = inputEl.value;
    this.showMessage = true;

    this. message = orderedQuantity + ' of ' + name +'(s) added to cart.';
    this.renderer.setProperty(inputEl,'value','1');

    let url = environment.apiUrl + '/addToCart';
    this.http.post<any>(url, {
      productId: id,
      token : this.cookie.get('token'),
      quantity : orderedQuantity
    }).subscribe(res => this.onCartItemAdded(res),
      error => this.handleError(error)); {
    };
    //this.router.navigate(['order']);
  }

  onCartItemAdded(res) {
  }

  handleError(error: any): void {
    console.log("not working");
  }

  onLoadMenuResponse(res){
    this.arr = res;
  }

}


