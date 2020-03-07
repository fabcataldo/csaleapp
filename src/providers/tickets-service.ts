import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tickets } from '../models/tickets';

/*
  Generated class for the TicketsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TicketsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TicketsServiceProvider Provider');
  }

  getTickets(token) {
    return new Promise ( resolve => {
      this.http.get<Tickets>('https://192.168.0.16:3000/api/tickets', {
        headers: new HttpHeaders().set('Authorization', token)
      })
      .subscribe( data=>{
        resolve(data);
      }, err=>{
        console.log(err);
      });
    })
  }

  getTicket(id, token){
    return new Promise(resolve => {
      this.http.get<Tickets>('https://192.168.0.16:3000/api/tickets/'+id, {
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
  
  postTicket(ticket, token) {
    return new Promise(resolve => {
      this.http.post('https://192.168.0.16:3000/api/tickets', JSON.stringify(ticket), {
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
