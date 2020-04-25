import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { Global } from '../utils/global';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Cards } from '../models/cards';

/*
  Generated class for the ProductsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardsServiceProvider {

  constructor(public http: HttpClient) {

  }

  getCards():Observable<Cards[]> {
    return this.http.get<Cards>(Global.SRV+Global.URL_API+'/cards').pipe(map(this.mapCards))
  }
  mapCards(res:any){
    return (res) ? res.map((card)=>new Cards(card)) : res.map((card)=>new Cards(card));
  }

  getCard(id):Observable<Cards>{
    return this.http.get<Cards>(Global.SRV+Global.URL_API+'/cards/'+id)
  }

  postCard(card): Observable<Cards> {
    return this.http.post<Cards>(Global.SRV+Global.URL_API+'/cards', JSON.stringify(card))
  }

}
