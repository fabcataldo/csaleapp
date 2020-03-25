import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { Global } from '../utils/global';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

/*
  Generated class for the ProductsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProductsServiceProvider Provider');
  }

  getProducts():Observable<Products[]> {
    return this.http.get<Products>(Global.SRV+Global.URL_API+'/products').pipe(map(this.mapProducts))
  }
  mapProducts(res:any){
    return (res) ? res.map((product)=>new Products(product)) : res.map((product)=>new Products(product));
  }

  getProduct(id):Observable<Products>{
    return this.http.get<Products>(Global.SRV+Global.URL_API+'/products/'+id)
  }
}
