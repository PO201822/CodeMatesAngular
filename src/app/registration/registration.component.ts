import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  model: any = {}


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitRegistrationClicked() {
    this.router.navigate(['']); // POST REQUEST HERE
  }

  onBackToLoginClicked() {
    this.router.navigate(['']);
  }
}
