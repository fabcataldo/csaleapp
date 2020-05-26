import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tickets } from '../models/tickets';
import { Global } from '../utils/global';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PurchasedProducts } from '../models/purchased_products';

/*
  Generated class for the TicketsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PurchasedProductsServiceProvider {

  constructor(public http: HttpClient) {
  }

  getPurchasedProducts(): Observable<PurchasedProducts[]> {
    return this.http.get<Tickets[]>(Global.SRV+Global.URL_API+'/purchasedProducts').pipe(map(this.mapPurchasedProducts))
  }
    
  mapPurchasedProducts(res:any){
    return (res) ? res.map((purchasedProducts)=>new PurchasedProducts(purchasedProducts)) : res.map((purchasedProducts)=>new PurchasedProducts(purchasedProducts));
  }

  getOne(id): Observable<PurchasedProducts>{
    return this.http.get<PurchasedProducts>(Global.SRV+Global.URL_API+'/purchasedProducts/'+id)
  }
  
  postPurchasedProducts(purchasedProducts): Observable<PurchasedProducts> {
    return this.http.post<PurchasedProducts>(Global.SRV+Global.URL_API+'/purchasedProducts', purchasedProducts)
  }

}
