import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Privileges } from '../models/privileges';

/*
  Generated class for the PrivilegesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrivilegesServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PrivilegesServiceProvider Provider');
  }

  getPrivileges(token) {
    return new Promise ( resolve => {
      this.http.get<Privileges>('http://192.168.0.16:3000/api/privileges', {
        headers: new HttpHeaders().set('Authorization', token)
      })
      .subscribe( data=>{
        resolve(data);
      }, err=>{
        console.log(err);
      });
    })
  }

  getPrivilege(id, token){
    return new Promise(resolve => {
      this.http.get<Privileges>('http://192.168.0.16:3000/api/privileges/'+id, {
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
}
