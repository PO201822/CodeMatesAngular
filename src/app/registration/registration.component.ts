import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  model : any = {}


  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onBackToRegisterClicked(){
    this.router.navigate(['']);
  }



}
