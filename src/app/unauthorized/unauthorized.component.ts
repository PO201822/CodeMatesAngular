import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
})
export class UnauthorizedComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  backToLogin(){
    this.router.navigate([""]);
  }

}
