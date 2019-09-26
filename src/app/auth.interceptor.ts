import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
      private cookie: CookieService, 
      private router : Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'text/html, application/json',
          'Authorization': `Bearer ${this.cookie.get('token')}`,
        }
      }));
    }
  }
