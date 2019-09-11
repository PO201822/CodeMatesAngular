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
    let resp =
    this.http.post<any>(url, {
      token: this.cookie.get('token')
    });
    return resp;
  }

  isInputValid(arr) {
    for (let element of arr) {
      if (element == '') {
        return false;
      }
    }
    return true;
  }
  getUserRole(){
    let url = environment.apiUrl + '/getrole';
    this.http.get(url).subscribe(res => this.onGetRoleResponse(res),
      error => this.handleError(error)); { };
  }
  onGetRoleResponse(res: Object): void {
    throw new Error("Method not implemented.");
  }
  handleError(error: any): void {
    throw new Error("Method not implemented.");
  }
}
