import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html'
})
export class RestaurantMenuComponent implements OnInit {

  arr : any[] = [];
  
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      let url = environment.apiUrl + '/restaurant/' + parameters.id;
      this.http.get(url).subscribe(res => this.onLoadMenuResponse(res),
    error => this.handleError(error)); { };
    });
  }

  onOrderClicked(id){
    let url = environment.apiUrl + '/addToCart';
    this.http.post<any>(url, {
      product_id: id,
    }).subscribe(res => this.onCartItemAdded(res),
      error => this.handleError(error)); {
    };
    //this.router.navigate(['order']);
  }

  onCartItemAdded(res) {
    console.log('success');
  }

  handleError(error: any): void {
    console.log("not working");
  }

  onLoadMenuResponse(res){
    this.arr = res;
    console.log(JSON.stringify(res));
  }

}


