import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from '../utils/global';

/*
  Generated class for the AuthInterceptorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthInterceptorServiceProvider implements HttpInterceptor{
  private token: string;
  private passwordResetToken: string;

  constructor(public http: HttpClient) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let request = req;  
      let newHeaders = request.headers;
      this.token = JSON.parse(localStorage.getItem('token'));
      this.passwordResetToken = JSON.parse(localStorage.getItem('passwordResetToken'));

      if(this.passwordResetToken){
        newHeaders = newHeaders.append('authorization', `${ this.passwordResetToken }`);  
      }
      else{
        newHeaders = newHeaders.append('authorization', `${ this.token }`);
      }
      
      request = req.clone({
        headers: newHeaders
      })
      Global.USER_TOKEN = this.token;
      return next.handle(request);
    
  }

  getToken(){

  }

}
