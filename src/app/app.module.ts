import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
  { path: '', component: LoginFormComponent }, // Default for localhost:8080 (Login)
  { path: 'home', component: HomeComponent }, 
  { path: 'registration', component: RegistrationComponent }, 
  { path: 'profile', component: ProfileComponent }, 
  { path: '**', component: PageNotFoundComponent } // Default for unknown routing (404 Page not found)
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    PageNotFoundComponent,
    NavigationBarComponent,
    HomeComponent,
    RegistrationComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
