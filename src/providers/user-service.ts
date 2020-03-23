import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import {Observable} from 'rxjs/Observable';

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
    return this.http.get<Users>('http://192.168.0.78:3000/api/users/'+id)
  }

  deleteUser(id): Observable<Users>{
    return this.http.delete<Users>('https://192.168.0.78:3000/api/users/'+id)
  }

  postUser(user): Observable<Users> {
    return this.http.post<Users>('http://192.168.0.78:3000/api/users', user)
  }

  putUser(comment, id): Observable<Users>{
    return this.http.put<Users>('http://192.168.0.78:3000/api/users/'+id, comment)
  }

  loginUser(user): Observable<Users>{
    return this.http.post<Users>('http://192.168.0.78:3000/api/login', user)
  }
}
