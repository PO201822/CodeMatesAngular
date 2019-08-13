import { BrowserModule } from '@angular/platform-browser';

import { CookieService } from 'ngx-cookie-service';
import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@NgModule({
  declarations: [ Component ],
  imports: [ BrowserModule ],
  providers: [ CookieService ],
  bootstrap: [ AppComponent ] 
})

export class AppComponent {
  title = 'base-angular';
}
