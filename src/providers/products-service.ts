import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products';

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

  getProducts(token) {
    return new Promise ( resolve => {
      this.http.get<Products>('https://192.168.0.16:3000/api/products', {
        headers: new HttpHeaders().set('Authorization', token)
      })
      .subscribe( data=>{
        resolve(data);
      }, err=>{
        console.log(err);
      });
    })
  }

  getProduct(id, token){
    return new Promise(resolve => {
      this.http.get<Products>('https://192.168.0.16:3000/api/products/'+id, {
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
