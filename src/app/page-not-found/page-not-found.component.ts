import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  backToHome(){
    this.router.navigate(['']);
  }

}
