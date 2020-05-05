import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingCardPaymentPage } from '../shopping-card-payment/shopping-card-payment';
import { AvailablePaymentMethods } from '../../models/available_payment_methods';
import { AvailablePaymentMethodsServiceProvider } from '../../providers/available-payment-methods';
import { CartServiceProvider } from '../../providers/cart-service';

/**
 * Generated class for the ShoppingCheckoutMercadopagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-mercadopago-payment',
  templateUrl: 'shopping-mercadopago-payment.html',
})
export class ShoppingMercadopagoPaymentPage {
  availablePaymentMethods: AvailablePaymentMethods[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private availablePaymentMethodsSrv: AvailablePaymentMethodsServiceProvider,
    private CartSrv: CartServiceProvider) {
      this.getAvailablePaymentMethods();
  }

  ionViewDidLoad() {
  }

  async getAvailablePaymentMethods(){
    await this.availablePaymentMethodsSrv.getAvailablePaymentMethods().subscribe(data=>{
      this.availablePaymentMethods = data;
    })
  }

  goToCardPaymentPage(payment: any){
    this.navCtrl.push(ShoppingCardPaymentPage, {
      paymentMethod: this.availablePaymentMethods.find(item => item.name == 'mercado pago'),
      cardPayment: payment ? payment : null,
      isMercadopago: true
    });
  }

}
