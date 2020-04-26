import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import {Observable} from 'rxjs/Observable';
import { Global } from '../utils/global';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
  }

  getUser(id): Observable<Users>{
    return this.http.get<Users>(Global.SRV+Global.URL_API+'/users/'+id)
  }

  deleteUser(id): Observable<Users>{
    return this.http.delete<Users>(Global.SRV+Global.URL_API+'/users/'+id)
  }

  postUser(user): Observable<Users> {
    return this.http.post<Users>(Global.SRV+Global.URL_API+'/users', user)
  }

  putUser(id, user): Observable<any>{
    return this.http.put<Users>(Global.SRV+Global.URL_API+'/users/'+id, user)
  }

  loginUser(user): Observable<any>{
    return this.http.post<Users>(Global.SRV+Global.URL_API+'/login', user)
  }
}
