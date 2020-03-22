import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthInterceptorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthInterceptorServiceProvider implements HttpInterceptor{
  private token: string

  constructor(public http: HttpClient) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let request = req;  
      let newHeaders = request.headers;
      this.token = JSON.parse(localStorage.getItem('token'));
        newHeaders = newHeaders.append('authorization', `${ this.token }`);
        
        request = req.clone({
          headers: newHeaders
        })
      console.log(request);
      return next.handle(request);
    
  }

  getToken(){

  }

}
