import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Places } from '../models/places';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Global } from '../utils/global';

/*
  Generated class for the PlacesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesServiceProvider {

  constructor(public http: HttpClient) {
  }

  getPlaces(): Observable<Places[]> {
    return this.http.get(Global.SRV+Global.URL_API+'/places').pipe(map(this.mapPlaces))
  }

  mapPlaces(res:any){
    return (res) ? res.map((place)=>new Places(place)) : res.map((place)=>new Places(place));
  }

  getPlace(id): Observable<Places>{
    return this.http.get<Places>(Global.SRV+Global.URL_API+'/places/'+id)
  }

  getFreeSpace(id): Observable<any>{
    return this.http.get<any>(Global.SRV+Global.URL_API+'/places/freeSpace/'+id)
  }

  putPlace(id, place): Observable<Places>{
    return this.http.put<Places>(Global.SRV+Global.URL_API+'/places/'+id, place);
  }
}
