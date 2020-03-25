import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from '../models/roles';
import { Global } from '../utils/global';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

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

  getRoles():Observable<Roles[]> {
    return this.http.get<Roles>(Global.SRV+Global.URL_API+'/roles').pipe(map(this.mapRoles))
  }

  mapRoles(res:any){
    return (res) ? res.map((role)=>new Roles(role)) : res.map((role)=>new Roles(role));
  }

  getRole(id): Observable<Roles>{
    return this.http.get<Roles>(Global.SRV+Global.URL_API+'/roles/'+id)
  }
}
