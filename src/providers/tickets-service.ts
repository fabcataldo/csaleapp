import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tickets } from '../models/tickets';
import { Global } from '../utils/global';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

/*
  Generated class for the TicketsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TicketsServiceProvider {

  constructor(public http: HttpClient) {
  }

  getTickets(): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(Global.SRV+Global.URL_API+'/tickets').pipe(map(this.mapTickets))
  }
    
  mapTickets(res:any){
    return (res) ? res.map((ticket)=>new Tickets(ticket)) : res.map((ticket)=>new Tickets(ticket));
  }

  getTicket(id): Observable<Tickets>{
    return this.http.get<Tickets>(Global.SRV+Global.URL_API+'/tickets/'+id)
  }
  
  postTicket(ticket): Observable<Tickets> {
    return this.http.post<Tickets>(Global.SRV+Global.URL_API+'/tickets', ticket)
  }

}
