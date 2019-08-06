import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private router: Router


  constructor() { }

  ngOnInit() {
  }

  onBackToRegisterClicked(){
    this.router.navigate(['login']);
  }



}
