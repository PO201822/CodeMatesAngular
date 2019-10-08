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
import { CourierJobsComponent } from './courier-jobs/courier-jobs.component';
import { CourierOwnOrdersComponent } from './courier-current-jobs/courier-own-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CompletedJobsComponent } from './courier-completed-jobs/completed-jobs.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from "ngx-spinner";
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider  } from 'angularx-social-login';



const appRoutes: Routes = [
  { path: '', component: LoginFormComponent }, // Default for localhost:8080 (Login)
  { path: 'home', component: HomeComponent }, 
  { path: 'registration', component: RegistrationComponent }, 
  { path: 'profile', component: ProfileComponent }, 
  { path: 'restaurants', component: RestaurantsComponent }, 
  { path: 'restaurant/:id', component: RestaurantMenuComponent },
  { path: 'orders', component: OrderComponent},
  { path: 'myCart', component: MyCartComponent}, 
  { path: 'courier/jobs', component: CourierJobsComponent},
  { path: 'courier/own', component: CourierOwnOrdersComponent},
  { path: 'courier/complete', component: CompletedJobsComponent},
  { path: 'courier/complete', component: CompletedJobsComponent},
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: '**', component: PageNotFoundComponent }, // Default for unknown routing (404 Page not found)

];

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('517604766414-uhdttkklln55k821ov4jamt73pv8u83i.apps.googleusercontent.com')
  },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('561602290896109')
  // },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
  // }
]);

export function provideConfig() {
  return config;
}

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
    CourierJobsComponent,
    CourierOwnOrdersComponent,
    UnauthorizedComponent,
    CompletedJobsComponent,  
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPayPalModule,
    NgxSpinnerModule,
    SocialLoginModule
  ],
  providers: [
    CookieService, 
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
