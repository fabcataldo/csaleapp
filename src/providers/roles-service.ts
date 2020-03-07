import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from '../models/roles';

/*
  Generated class for the RolesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RolesServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RolesServiceProvider Provider');
  }

  getRoles(token) {
    return new Promise ( resolve => {
      this.http.get<Roles>('https://192.168.0.16:3000/api/roles', {
        headers: new HttpHeaders().set('Authorization', token)
      })
      .subscribe( data=>{
        resolve(data);
      }, err=>{
        console.log(err);
      });
    })
  }

  getRole(id, token){
    return new Promise(resolve => {
      this.http.get<Roles>('https://192.168.0.16:3000/api/roles/'+id, {
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
