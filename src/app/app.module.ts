import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { CookieService } from 'ngx-cookie-service';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { OrderComponent } from './order/order.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { MessageComponent } from './message/message.component';
import { AuthInterceptor } from './auth.interceptor';

const appRoutes: Routes = [
  { path: '', component: LoginFormComponent }, // Default for localhost:8080 (Login)
  { path: 'home', component: HomeComponent }, 
  { path: 'registration', component: RegistrationComponent }, 
  { path: 'profile', component: ProfileComponent }, 
  { path: 'restaurants', component: RestaurantsComponent }, 
  { path: 'restaurant/:id', component: RestaurantMenuComponent },
  { path : 'order', component: OrderComponent},
  { path : 'myCart', component: MyCartComponent}, 
  { path: '**', component: PageNotFoundComponent }, // Default for unknown routing (404 Page not found)

];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    PageNotFoundComponent,
    NavigationBarComponent,
    HomeComponent,
    RegistrationComponent,
    ProfileComponent,
    RestaurantsComponent,
    RestaurantMenuComponent,
    OrderComponent,
    MyCartComponent,
    MessageComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService, 
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
