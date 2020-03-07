import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Places } from '../models/places';

/*
  Generated class for the PlacesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PlacesServiceProvider Provider');
  }

  getPlaces(token) {
    return new Promise ( resolve => {
      this.http.get<Places>('https://192.168.0.16:3000/api/places', {
        headers: new HttpHeaders().set('Authorization', token)
      })
      .subscribe( data=>{
        resolve(data);
      }, err=>{
        console.log(err);
      });
    })
  }

  getPlace(id, token){
    return new Promise(resolve => {
      this.http.get<Places>('https://192.168.0.16:3000/api/places/'+id, {
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

  getTicketsPlace(id, token, validDateTicketFrom){
    return new Promise(resolve => {
      this.http.get<Places>('https://192.168.0.16:3000/api/places/tickets'+id+'/'+validDateTicketFrom, {
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
