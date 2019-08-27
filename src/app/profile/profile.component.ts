import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  id : number;
  username: string = 'username';
  password: string = 'password';
  email: string = 'email';
  location: string = 'location';
  address: string = 'address';
  roles : any;
  cut : number = 0;
  premium :boolean = false;
  profit : number = 0;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(res => this.onResponseReceived(res),
    error => this.handleError(error)); {
  };
  }

  handleError(error: any): void {
    console.log(error);
  } 

  onResponseReceived(res) {
    this.id = res.id;
    this.username = res.name;
    this.password = res.password;
    this.email = res.email;
    this.location = res.location;
    this.address = res.address;
    this.roles = res.roles;
  }

  onUpdateClicked() {
    let url = environment.apiUrl + '/profile';
    this.http.put<any>(url, {
      id: this.id,
      name : this.username,
      password : this.password,
      email : this.email,
      location : this.location,
      address : this.address,
      roles : this.roles,
      cut : this.cut,
      premium : this.premium,
      profit : this.profit
    }).subscribe(res => this.onProfileUpdateResponse(res),
      error => this.handleError(error)); {
    };
  
  }
  onProfileUpdateResponse(res: any): void {
    console.log('okcs');
  }

}
