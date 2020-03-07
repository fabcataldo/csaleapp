import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }

  getUsers(token) {
    return new Promise ( resolve => {
      this.http.get<Users>('http://192.168.0.28:3000/api/users', {
        headers: new HttpHeaders().set('Authorization', token)
      })
      .subscribe( data=>{
        resolve(data);
      }, err=>{
        console.log(err);
      });
    })
  }

  getUser(id, token){
    return new Promise(resolve => {
      this.http.get<Users>('http://192.168.0.16:3000/api/users/'+id, {
        headers: new HttpHeaders().set('Authorization', token)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
      }
    )
  }

  deleteUser(id, token){
    return new Promise(resolve => {
      this.http.delete('https://192.168.0.16:3000/api/users/'+id, {
        headers: new HttpHeaders().set('Authorization', token)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
      }
    )
  }

  postUser(user) {
    user.client = true;
    return new Promise(resolve => {
      this.http.post('http://192.168.0.30:3000/api/users', user, {})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
      }
    )
  }

  putUser(comment, id, token){
    return new Promise(resolve => {
      this.http.put<Users>('http://192.168.0.16:3000/api/users/'+id, comment, {
        headers: new HttpHeaders().set('Authorization', token)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
      }
    )
  }

  loginUser(user){
    //en user debo enviar el email y el password
    return new Promise(resolve => {
      this.http.post('http://192.168.0.30:3000/api/login', user, {})
        .subscribe(res => {
          //devuelve los datos del usuario logeado y el token
          resolve(res);
        }, (err) => {
          console.log(err);
        });
      }
    )
  }
}
