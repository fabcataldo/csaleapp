import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Cart } from '../../models/cart';
import { CartServiceProvider } from '../../providers/cart-service';
import { ShoppingCardPaymentPage } from '../shopping-card-payment/shopping-card-payment';
import { AvailablePaymentMethodsServiceProvider } from '../../providers/available-payment-methods';
import { AvailablePaymentMethods } from '../../models/available_payment_methods';
import { Accessories } from '../../utils/accessories';
import { NotificationsProvider } from '../../providers/notifications-service';
import { ShoppingConfirmPage } from '../shopping-confirm/shopping-confirm';
import { PaymentMethodsServiceProvider } from '../../providers/payment-methods';
import { PaymentMethods } from '../../models/payment_methods';

/**
 * Generated class for the ShoppingCheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-checkout',
  templateUrl: 'shopping-checkout.html',
})
export class ShoppingCheckoutPage {
  cart: Cart;
  remainingAmount: number;
  availablePaymentMethods: AvailablePaymentMethods[];
  canPay: boolean=false;

  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private CartSrv: CartServiceProvider, private availablePaymentMethodsSrv: AvailablePaymentMethodsServiceProvider,
    private NotificationsCtrl: NotificationsProvider, private cartSrv: CartServiceProvider,
    private PaymentMethodSrv: PaymentMethodsServiceProvider) {
      this.getAvailablePaymentMethods();
      this.setCart();
      this.setRemainingAmount();
      this.setCanPay();
  }

  ionViewDidLoad() {

  }

  setCart(){
    this.cart = this.CartSrv.getCart();
  }

  setCanPay(){
    this.canPay = this.remainingAmount > 0 && this.remainingAmount <= this.cart.ticket.total ? true : false;
  }

  setRemainingAmount(){
    this.remainingAmount = this.CartSrv.getRemainingAmount();
  }

  async getAvailablePaymentMethods(){
    await this.availablePaymentMethodsSrv.getAvailablePaymentMethods().subscribe(data=>{
      this.availablePaymentMethods = data;
    }),
    (err)=>{
      this.NotificationsCtrl.presentErrorNotification("No se pudieron obtener los métodos de pago disponibles.\nError técnico: "+err);
    }
  }

  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonHandler;
  }

  backButtonHandler(){
    this.navCtrl.popTo('ShoppingPage');
  }

  payWithCash(){
    let newPaymentMethod = new PaymentMethods( 
      { 
        id: null,
        payment_method: this.availablePaymentMethods.find(item => item.name.includes('efectivo')),
        card: null,
        amount_paid: this.remainingAmount
      }
    )
    let mercadopagoData = {
      description: 'pago de compra en CSaleApp; monto: , '+this.remainingAmount,
      payment_method_id: 'rapipago',
      transaction_amount: this.remainingAmount
    }
    this.PaymentMethodSrv.postMercadopagoPayment(mercadopagoData).subscribe(result=>{
      console.log('PAGO EN MERCADO PAGO REALZIADO, PAGO APROBADO Y ACREDITADO')
      console.log(result);
    }),
    (err)=>{
      this.NotificationsCtrl.presentErrorNotification("Pago en Mercado Pago fallido.\nError técnico: "+err);
      console.log(err);
    }
    this.cartSrv.savePaymentMethod(newPaymentMethod, 'efectivo');
    this.cartSrv.setCart(this.cart);
    this.navCtrl.push(ShoppingConfirmPage);
  }

  goToPaymentPage(paymentMethodName){
    if(paymentMethodName)
      this.payWithCash();
    else
      this.navCtrl.push(ShoppingCardPaymentPage, {
        paymentMethod: this.availablePaymentMethods.find(item => item.name.includes('tarjeta'))
      });
  }

  removePayment(paymentMethod){
    let type = (paymentMethod.payment_method.name === 'efectivo') 
      ? 'cash' : (paymentMethod.payment_method.name === 'tarjeta') ? 'card' : 'mercadopago'; 
    this.CartSrv.removePaymentMethod(paymentMethod, type);
    this.cart = this.CartSrv.getCart();
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.setRemainingAmount();
    this.setCanPay();
  }

  toCapitalize(str){
    return Accessories.capitalizeFirstChar(str);
  }

  goToTicketDetailPage(){
    this.CartSrv.setCart(this.cart);
    this.navCtrl.push(ShoppingConfirmPage)
  }
}
