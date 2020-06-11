import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Cart } from '../../models/cart';
import { CartServiceProvider } from '../../providers/cart-service';
import { PaymentMethods } from '../../models/payment_methods';
import { AvailablePaymentMethods } from '../../models/available_payment_methods';
import { ShoppingConfirmPage } from '../shopping-confirm/shopping-confirm';
import { PaymentMethodsServiceProvider } from '../../providers/payment-methods';
import { NotificationsProvider } from '../../providers/notifications-service';

/**
 * Generated class for the ShoppingCashPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cash-payment',
  templateUrl: 'shopping-cash-payment.html',
})
export class ShoppingCashPaymentPage {
  cart: Cart;
  //amount: number;
  remainingAmount: number;
  cash: AvailablePaymentMethods;
  canPay: boolean = true;
  payment: PaymentMethods;

  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private cartSrv: CartServiceProvider, private PaymentMethodSrv: PaymentMethodsServiceProvider,
    private NotificationsCtrl: NotificationsProvider) {
    this.cart = this.cartSrv.getCart();
    this.cash = this.navParams.get('paymentMethod');
    this.payment = this.navParams.get('cashPayment');
  }

  ionViewDidLoad() {
    this.remainingAmount = this.cartSrv.getRemainingAmount();
  }

  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonHandler;
  }

  backButtonHandler(){
    this.navCtrl.popTo('ShoppingPage');
  }
 

  goToCheckoutPage(){
    let newPaymentMethod = new PaymentMethods( 
      { 
        id: null,
        payment_method: this.cash,
        card: null,
        amount_paid: this.remainingAmount
      }
    )
    let mercadopagoData = {
      description: 'pago de compra CSaleApp; monto: , '+this.remainingAmount,
      payment_method_id: 'rapipago',
      transaction_amount: this.remainingAmount
    }
    this.PaymentMethodSrv.postMercadopagoPayment(mercadopagoData).subscribe(result=>{
      console.log('PAGO EN MERCADO PAGO REALZIADO, PAGO CON TAREJTA APROVADO Y ACREDITADO')
      console.log(result);
    }),
    (err)=>{
      this.NotificationsCtrl.presentErrorNotification("Pago en Mercado Pago fallido.\nError técnico: "+err);
      console.log(err);
    }
    this.cartSrv.savePaymentMethod(newPaymentMethod, 'cash');
    this.cartSrv.setCart(this.cart);
    this.navCtrl.push(ShoppingConfirmPage);
  }
}
