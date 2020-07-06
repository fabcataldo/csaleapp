import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Places } from '../models/places';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PaymentMethods } from '../models/payment_methods';
import { AvailablePaymentMethods } from '../models/available_payment_methods';
import { Global } from '../utils/global';

/*
  Generated class for the PlacesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AvailablePaymentMethodsServiceProvider {

  constructor(public http: HttpClient) {
  }

  getAvailablePaymentMethods(): Observable<AvailablePaymentMethods[]> {
    return this.http.get(Global.SRV+Global.URL_API+'/availablePaymentMethods').pipe(map(this.mapAvailablePaymentMethods))
  }

  mapAvailablePaymentMethods(res:any){
    return (res) ? res.map((availablePaymentMethod)=>new AvailablePaymentMethods(availablePaymentMethod)) : res.map((availablePaymentMethod)=>new AvailablePaymentMethods(availablePaymentMethod));
  }

  getAvailablePaymentMethod(id): Observable<AvailablePaymentMethods>{
    return this.http.get<AvailablePaymentMethods>(Global.SRV+Global.URL_API+'/availablePaymentMethods/'+id);
  }
}
