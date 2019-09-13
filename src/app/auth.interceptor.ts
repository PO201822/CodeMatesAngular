import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private cookie: CookieService, private router : Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          'Authorization': `Bearer ${this.cookie.get('token')}`,
        }
      })).pipe(
        tap(
          event => this.handleResponse(req, event),
          error => this.handleError(req, error)
        )
      );
    }

    handleResponse(req: HttpRequest<any>, event) {
      console.log('Handling response for ', req.url, event);
      if (event instanceof HttpResponse) {
        console.log('Request for ', req.url,
            ' Response Status ', event.status,
            ' With body ', event.body);
      }
    }
  
    handleError(req: HttpRequest<any>, error) {
      if(error.status == 403){
        console.error('Unauthorized request');
        this.router.navigate(["/unauthorized"]);
      }
    }
  }
