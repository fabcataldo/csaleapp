import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Cart } from '../../models/cart';
import { CartServiceProvider } from '../../providers/cart-service';
import { ShoppingCardPaymentPage } from '../shopping-card-payment/shopping-card-payment';
import { AvailablePaymentMethodsServiceProvider } from '../../providers/available-payment-methods-service';
import { AvailablePaymentMethods } from '../../models/available_payment_methods';
import { Accessories } from '../../utils/accessories';
import { NotificationsProvider } from '../../providers/notifications-service';
import { ShoppingConfirmPage } from '../shopping-confirm/shopping-confirm';
import { PaymentMethodsServiceProvider } from '../../providers/payment-methods-service';
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
  isMercadopagoPaymentOk: boolean=true;

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
    },
    (err)=>{
      this.NotificationsCtrl.presentErrorNotification("No se pudieron obtener los métodos de pago disponibles.\nError técnico: "+err);
    })
  }

  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonHandler;
  }

  backButtonHandler(){
    this.navCtrl.popTo('ShoppingPage');
  }

  async payWithCash(){
    let newPaymentMethod = new PaymentMethods( 
      { 
        id: null,
        payment_method: this.availablePaymentMethods.find(item => item.name.includes('efectivo')),
        card: null,
        amount_paid: this.cart.ticket.total
      }
    )
    let mercadopagoData = {
      description: 'pago de compra en CSaleApp; monto: '+newPaymentMethod.amount_paid,
      payment_method_id: 'rapipago',
      transaction_amount: newPaymentMethod.amount_paid
    }
    await this.PaymentMethodSrv.postMercadopagoPayment(mercadopagoData).subscribe(result=>{
      console.log('PAGO EN MERCADO PAGO REALZIADO, PAGO APROBADO Y ACREDITADO')
      console.log(result);
    },
    (err)=>{
      this.NotificationsCtrl.presentErrorNotification("Pago en Mercado Pago fallido.\nError técnico: "+err);
      this.isMercadopagoPaymentOk=false;
    })
    this.cartSrv.savePaymentMethod(newPaymentMethod);
    this.cartSrv.setCart(this.cart);
    this.navCtrl.push(ShoppingConfirmPage);
  }

  goToPaymentPage(paymentMethodName){
    if(paymentMethodName){
        this.payWithCash();
    }
    else{
        this.navCtrl.push(ShoppingCardPaymentPage, {
          paymentMethod: this.availablePaymentMethods.find(item => item.name.includes('tarjeta'))
        });        
    }
  }

  goToConfirmPage(){
    this.navCtrl.push(ShoppingConfirmPage);
  }

  toCapitalize(str){
    return Accessories.capitalizeFirstChar(str);
  }
}
