import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Places } from '../models/places';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

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

  getPlaces(): Observable<Places[]> {
    return this.http
      .get('http://192.168.0.78:3000/api/places')
      .pipe(map(this.mapPlaces))
  }

  mapPlaces(res:any){
    return (res) ? res.map((place)=>new Places(place)) : res.map((place)=>new Places(place));
  }

  getPlace(id): Observable<Places>{
    return this.http
      .get<Places>('http://192.168.0.16:3000/api/places/'+id)
  }

  getTicketsPlace(id, validDateTicketFrom){
    return new Promise(resolve => {
      this.http.get<Places>('http://192.168.0.16:3000/api/places/tickets'+id+'/'+validDateTicketFrom)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
      }
    )
  }
}
