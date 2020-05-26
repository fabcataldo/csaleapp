import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Places } from '../models/places';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PaymentMethods } from '../models/payment_methods';
import { Global } from '../utils/global';

/*
  Generated class for the PlacesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentMethodsServiceProvider {

  constructor(public http: HttpClient) {
  }

  getPaymentMethods(): Observable<PaymentMethods[]> {
    return this.http.get(Global.SRV+Global.URL_API+'/paymentMethods').pipe(map(this.mapPaymentMethods))
  }

  mapPaymentMethods(res:any){
    return (res) ? res.map((paymentMethod)=>new PaymentMethods(paymentMethod)) : res.map((paymentMethod)=>new PaymentMethods(paymentMethod));
  }

  getPaymentMethod(id): Observable<PaymentMethods>{
    return this.http.get<PaymentMethods>(Global.SRV+Global.URL_API+'/paymentMethods/'+id);
  }

  postPaymentMethod(paymentMethod): Observable<PaymentMethods> {
    return this.http.post<PaymentMethods>(Global.SRV+Global.URL_API+'/paymentMethods', paymentMethod)
  }

  postMercadopagoPayment(payment): Observable<Object>{
    console.log(payment);
    return this.http.post<PaymentMethods>(Global.SRV+Global.URL_API+'/mercadopagopayment', payment)
  }

}
