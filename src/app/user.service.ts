import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  getUser() : any {
    let url = environment.apiUrl + '/profile';
    this.http.post<any>(url, {
      token: this.cookie.get('token')
    });
  }

}
