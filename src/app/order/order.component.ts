import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  user_id : number;
  product_id : number;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe((res: any) => this.onResponseReceived(res),
    (error: any) => this.handleError(error));
  }

  handleError(error: any): void {
    console.log(error);
  } 

  onResponseReceived(res) {
    this.user_id = res.id;
  }

}
